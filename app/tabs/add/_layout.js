import { Stack } from "expo-router";
import { Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function FeedStackLayout() {
  const router = useRouter();
  return (
    <Stack screenOptions={{ headerShown: true, modal: true }}>
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
