import { useBackground } from "./_layout";
import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { globalState } from "@/components/Global";

export default function OuterGarden() {
  const router = useRouter();
  const { translateX, translateY } = useBackground();

  const [selectedGardenId, setSelectedGardenId] = useState(globalState.selectedGardenId);

  const goToInner = () => {
    router.push("/tabs/home/inner");
    translateX.value = -200; // Reset background position
    translateY.value = -450;
  };

  useEffect(() => {
    // Reactively update the displayed garden ID when the globalState changes
    const interval = setInterval(() => {
      if (globalState.selectedGardenId !== selectedGardenId) {
        setSelectedGardenId(globalState.selectedGardenId);
      }
    }, 100);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [selectedGardenId]);

  return (
    <View style={styles.container}>
      {/* Display the selected garden ID in the top-right corner */}
      <Text style={styles.gardenIdText}>
        Garden ID: {selectedGardenId || "None"}
      </Text>

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
