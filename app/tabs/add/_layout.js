import { Stack } from "expo-router";

export default function FeedStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="index"
        options={{
          title: "Add New Post",
        }}
      />
    </Stack>
  );
}
