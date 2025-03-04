// stack navigation:

// stack navigation: friends profile page (index.js), add friends, friends profile page, friends garden page

// there should be 2 pages here, connected through stack navigation: inner garden and outer garden

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity, Text, View } from "react-native";
import Theme from "@/assets/theme";
import { useState } from "react";
import { SuperbloomProvider } from "@/utils/SuperbloomContext";

export default function FeedStackLayout() {
  const router = useRouter();
  return (
    <SuperbloomProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          // index.js is the outer garden
          name="index"
        />
        <Stack.Screen name="collage" />
        <Stack.Screen
          // index.js is the outer garden
          name="garden"
        />
        <Stack.Screen
          // index.js is the outer garden
          name="import"
        />
        <Stack.Screen
          // index.js is the outer garden
          name="newbloom"
        />
        <Stack.Screen
          // index.js is the outer garden
          name="exsuperbloom"
        />
      </Stack>
    </SuperbloomProvider>
  );
}
