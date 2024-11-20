import { Stack, useRouter } from "expo-router";
import { TouchableOpacity, Text, View } from "react-native";
import Theme from "@/assets/theme";
import { useState } from "react";

export default function FeedStackLayout() {
  const router = useRouter();
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        // index.js is the outer garden
        name="index"
      />
    </Stack>
  );
}
