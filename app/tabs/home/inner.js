import { useBackground } from "./_layout";
import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { globalState } from "@/components/Global";

export default function InnerGarden() {
  const router = useRouter();
  const { translateX, translateY } = useBackground();
  const [selectedGardenId, setSelectedGardenId] = useState(globalState.selectedGardenId);

  const handleGoBack = () => {
    translateX.value = -400; // Reset background position
    translateY.value = 0;
    router.back();
  };

  useEffect(() => {
    // Update local state whenever globalState changes
    setSelectedGardenId(globalState.selectedGardenId);
  }, [globalState.selectedGardenId]);

  return (
    <View style={styles.container}>
      {/* Display the selected garden ID in the top-right corner */}
      <Text style={styles.gardenIdText}>
        Garden ID: {selectedGardenId || "None"}
      </Text>

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
  gardenIdText: {
    position: "absolute",
    top: 40,
    right: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
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
