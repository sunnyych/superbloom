import { Stack, useRouter } from "expo-router";

export default function FeedStackLayout() {
  const router = useRouter();
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        // index.js is the outer garden
        name="index"
        options={{
          title: "Outer Garden",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
