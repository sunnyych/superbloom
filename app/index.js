// // log-in page

// import { useEffect, useState } from "react";

// import { Redirect } from "expo-router";

// import Login from "@/components/Login";
// import db from "@/databse/db";
// import Loading from "@/components/Loading";

// // font import source: https://www.npmjs.com/package/@expo-google-fonts/source-serif-pro
// // if it doesn't work, run dis in terminal "npx expo install @expo-google-fonts/source-serif-pro expo-font expo-app-loading"
// // also this for rubik "npx expo install @expo-google-fonts/rubik expo-font expo-app-loading"
// import { useFonts } from "expo-font";
// import {
//   SourceSerifPro_400Regular,
//   SourceSerifPro_400Regular_Italic,
//   SourceSerifPro_600SemiBold,
//   SourceSerifPro_600SemiBold_Italic,
//   SourceSerifPro_700Bold,
//   SourceSerifPro_700Bold_Italic,
//   SourceSerifPro_900Black,
//   SourceSerifPro_900Black_Italic,
// } from "@expo-google-fonts/source-serif-pro";

// import {
//   Rubik_400Regular,
//   Rubik_500Medium,
//   Rubik_700Bold,
// } from "@expo-google-fonts/rubik";

// export default function App() {
//   const [session, setSession] = useState(null);
//   const [isLoading, setIsLoading] = useState(true); // Default to true for initial load

//   const [fontsLoaded] = useFonts({
//     SourceSerifPro_400Regular,
//     SourceSerifPro_400Regular_Italic,
//     SourceSerifPro_600SemiBold,
//     SourceSerifPro_600SemiBold_Italic,
//     SourceSerifPro_700Bold,
//     SourceSerifPro_700Bold_Italic,
//     SourceSerifPro_900Black,
//     SourceSerifPro_900Black_Italic,
//     Rubik_400Regular,
//     Rubik_500Medium,
//     Rubik_700Bold,
//   });

//   useEffect(() => {
//     setIsLoading(true);

//     db.auth.getSession().then(({ data: { session } }) => {
//       setSession(session);
//       setIsLoading(false);
//     });

//     const {
//       data: { subscription },
//     } = db.auth.onAuthStateChange((_event, session) => {
//       setSession(session);
//       setIsLoading(false);
//     });

//     return () => subscription.unsubscribe();
//   }, []);

//   if (session) {
//     // navigate to the tabs page
//     return <Redirect href="/tabs" />;
//   } else if (isLoading) {
//     return <Loading />;
//   } else {
//     return <Login />;
//   }
// }

import { Button, View, Text } from "react-native";
import { useRouter } from "expo-router"; // Import useRouter for navigation

export default function Index() {
  const router = useRouter(); // Hook for navigation

  // Function to handle the "Log In" button click
  const handleLogin = () => {
    router.push("/tabs"); // Navigate to the next page (e.g., /tabs)
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome to the App!</Text>
      <Button title="Log In" onPress={handleLogin} />
    </View>
  );
}
