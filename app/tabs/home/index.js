import { useBackground } from "./_layout";
import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function OuterGarden() {
  const router = useRouter();
  const { translateX, translateY } = useBackground();

  const goToInner = () => {
    router.push("/tabs/home/inner");
    translateX.value = -200; // Reset background position
    translateY.value = -450;
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Public</Text>
        <View style={styles.buttonContainer}>
          <Button title="switch" onPress={goToInner} color="#fff" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  content: {
    position: "absolute",
    bottom: 20,
    left: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  buttonContainer: {
    backgroundColor: "#9d82ff", // Add custom button background color
    borderRadius: 8, // Rounded corners
    overflow: "hidden", // Ensures the button fits the rounded shape
  },
});
