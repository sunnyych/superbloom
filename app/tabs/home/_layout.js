// there should be 2 pages here, connected through stack navigation: inner garden and outer garden

import { Stack } from "expo-router";
import { createContext, useContext } from "react";
import { View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Background from "@/components/Background";

// Create Context for Shared Values
const BackgroundContext = createContext();

// Export a hook to access shared values
export const useBackground = () => useContext(BackgroundContext);

export default function FeedStackLayout() {
  // Shared values for diagonal background movement
  const translateX = useSharedValue(-400);
  const translateY = useSharedValue(0);
  return (
    <BackgroundContext.Provider value={{ translateX, translateY }}>
      <Background translateX={translateX} translateY={translateY} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "transparent" },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Outer Garden",
          }}
        />
        <Stack.Screen
          name="inner"
          options={{
            title: "Inner Garden",
          }}
        />
      </Stack>
    </BackgroundContext.Provider>
  );
}
