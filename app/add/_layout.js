import { Stack } from "expo-router";
import { Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function AddPostLayout() {
  const router = useRouter();
  return (
    <Stack screenOptions={{ headerShown: false, presentation: "modal" }}>
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
          // headerLeft: () => (
          //   <Pressable onPress={() => router.back()}>
          //     <Text style={styles.backText}>back</Text>
          //   </Pressable>
          // ),
        }}
      />
      <Stack.Screen
        name="pickflower"
        options={{
          title: "customize flower",
        }}
      />
      <Stack.Screen
        name="preview"
        options={{
          title: "preview post",
        }}
      />
    </Stack>
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
