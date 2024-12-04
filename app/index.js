// log-in page

import { useEffect, useState } from "react";

import { Redirect } from "expo-router";

import Login from "@/components/Login";
import db from "@/database/db";
import Loading from "@/components/Loading";

// font import source: https://www.npmjs.com/package/@expo-google-fonts/source-serif-pro
// if it doesn't work, run dis in terminal "npx expo install @expo-google-fonts/source-serif-pro expo-font expo-app-loading"
// also this for rubik "npx expo install @expo-google-fonts/rubik expo-font expo-app-loading"
import { useFonts } from "expo-font";
import {
  SourceSerifPro_400Regular,
  SourceSerifPro_400Regular_Italic,
  SourceSerifPro_600SemiBold,
  SourceSerifPro_600SemiBold_Italic,
  SourceSerifPro_700Bold,
  SourceSerifPro_700Bold_Italic,
  SourceSerifPro_900Black,
  SourceSerifPro_900Black_Italic,
} from "@expo-google-fonts/source-serif-pro";

import {
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_700Bold,
} from "@expo-google-fonts/rubik";

export default function App() {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Default to true for initial load

  const [fontsLoaded] = useFonts({
    SourceSerifPro_400Regular,
    SourceSerifPro_400Regular_Italic,
    SourceSerifPro_600SemiBold,
    SourceSerifPro_600SemiBold_Italic,
    SourceSerifPro_700Bold,
    SourceSerifPro_700Bold_Italic,
    SourceSerifPro_900Black,
    SourceSerifPro_900Black_Italic,
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_700Bold,
  });

  useEffect(() => {
    setIsLoading(true);

    db.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = db.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (session) {
    // navigate to the tabs page
    return <Redirect href="/tabs" />;
  } else if (isLoading) {
    return <Loading />;
  } else {
    return <Login />;
  }
}
