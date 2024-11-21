// this should display the inner garden

// everything should look symmetrical to the outer garden

// on click gate, navigate back to the outer garden

// on click toggle, navigate to collage.js

import { useBackground } from "./_layout";
import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";
// import Background from "@/components/Background"; // Import the Background component

export default function InnerGarden() {
  const router = useRouter();
  const { translateX, translateY } = useBackground();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* <Background translateX={translateX} translateY={translateY} /> */}
      <Text>Inner Garden</Text>
      <Button
        title="Go Back"
        onPress={() => {
          translateX.value = -200; // Reset background position
          translateY.value = -450;
          router.back();
        }}
      />
    </View>
  );
}
