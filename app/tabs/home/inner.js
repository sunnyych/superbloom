import { useBackground } from "./_layout";
import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function InnerGarden() {
  const router = useRouter();
  const { translateX, translateY } = useBackground();

  const handleGoBack = () => {
    translateX.value = -400; // Reset background position
    translateY.value = 0;
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Private</Text>
        <View style={styles.buttonContainer}>
          <Button title="switch" onPress={handleGoBack} color="#fff" />
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
    backgroundColor: "#9d82ff", 
    borderRadius: 8, 
    overflow: "hidden", 
  },
});
