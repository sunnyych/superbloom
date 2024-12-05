import { Stack } from "expo-router";
import { Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

import { PromptContext } from "@/utils/PromptContext";
import { FlowerContext } from "@/utils/FlowerContext";
import { PostContext } from "@/utils/PostContext";

import { colorPalette } from "@/utils/flowerUtils";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function AddPostLayout() {
  const router = useRouter();

  // for prompt context
  const [selectedPrompt, setSelectedPrompt] = useState(-1);

  // for flower context
  const [selectedType, setSelectedType] = useState(0);
  const [selectedColor, setSelectedColor] = useState(colorPalette[0]);

  // for post context
  const [text, setText] = useState("");
  const [media, setMedia] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  return (
    <PromptContext.Provider value={{ selectedPrompt, setSelectedPrompt }}>
      <PostContext.Provider
        value={{ text, setText, media, setMedia, isPublic, setIsPublic }}
      >
        <FlowerContext.Provider
          value={{
            selectedType,
            setSelectedType,
            selectedColor,
            setSelectedColor,
          }}
        >
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen
              name="chooseprompt"
              options={{
                title: "choose prompt",
                presentation: "modal",
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
                // presentation: "modal",
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
                // presentation: "modal",
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
                // presentation: "modal",
              }}
            />
          </Stack>
        </FlowerContext.Provider>
      </PostContext.Provider>
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
