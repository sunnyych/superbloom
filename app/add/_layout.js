import { Stack } from "expo-router";
import { Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { PromptContext } from "@/utils/PromptContext";
import { useState } from "react";

export default function AddPostLayout() {
  const router = useRouter();
  const [selectedPrompt, setSelectedPrompt] = useState("");

  return (
    <PromptContext.Provider value={{ selectedPrompt, setSelectedPrompt }}>
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
