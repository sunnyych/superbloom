import { Stack } from "expo-router";
import { Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

import { PromptContext } from "@/utils/PromptContext";
import { FlowerContext } from "@/utils/FlowerContext";
import { colorPalette } from "@/utils/flowerUtils";

export default function AddPostLayout() {
  const router = useRouter();
  const [selectedPrompt, setSelectedPrompt] = useState("");

  const [selectedType, setSelectedType] = useState(0);
  const [selectedColor, setSelectedColor] = useState(colorPalette[0]);

  return (
    <PromptContext.Provider value={{ selectedPrompt, setSelectedPrompt }}>
      <FlowerContext.Provider
        value={{
          selectedType,
          setSelectedType,
          selectedColor,
          setSelectedColor,
        }}
      >
        <Stack screenOptions={{ headerShown: true, presentation: "modal" }}>
          <Stack.Screen
            name="index"
            options={{
              title: "choose prompt",
            }}
          />
          <Stack.Screen
            name="makepost"
            options={{
              title: "make new post",
              headerLeft: () => (
                <Pressable onPress={() => router.back()}>
                  <Text style={styles.backText}>back</Text>
                </Pressable>
              ),
            }}
          />
          <Stack.Screen
            name="pickflower"
            options={{
              title: "customize flower",
              headerLeft: () => (
                <Pressable onPress={() => router.back()}>
                  <Text style={styles.backText}>back</Text>
                </Pressable>
              ),
            }}
          />
          <Stack.Screen
            name="preview"
            options={{
              title: "preview post",
              headerLeft: () => (
                <Pressable onPress={() => router.back()}>
                  <Text style={styles.backText}>back</Text>
                </Pressable>
              ),
            }}
          />
        </Stack>
      </FlowerContext.Provider>
    </PromptContext.Provider>
  );
}

const styles = StyleSheet.create({
  backText: {
    color: "blue",
    marginRight: 16,
  },
  submitText: {
    color: "blue",
    marginRight: 16,
  },
});
