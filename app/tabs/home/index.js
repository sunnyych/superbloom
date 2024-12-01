import { useBackground } from "./_layout";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Pressable,
  Image,
  Switch,
} from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { globalState } from "@/components/Global";

export default function OuterGarden() {
  const router = useRouter();
  const { translateX, translateY } = useBackground();

  const [selectedGardenId, setSelectedGardenId] = useState(
    globalState.selectedGardenId
  );
  const [isGarden, setIsGarden] = useState(true); // Toggle for garden/collage view

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

      {/* Buttons in lower right for toggling */}
      <View style={styles.content}>
        <View style={styles.buttonContainer}>
          <Pressable onPress={goToInner}>
            <Image
              style={styles.signIcon}
              source={require("@/assets/icons/public-sign.png")}
            />
          </Pressable>
          <View style={styles.toggleContainer}>
            <Switch
              value={isGarden}
              onValueChange={setIsGarden}
              thumbColor={isGarden ? "#9d82ff" : "#ccc"}
              trackColor={{ false: "#ccc", true: "#e6e0ff" }}
            />
          </View>
        </View>
      </View>

      {/* Garden profile pic and switching between gardens in upper right */}
      <View style={styles.switchGardensContainer}>
        <Text style={styles.subtextRemembering}>remembering</Text>
        <Text style={styles.subtextName}>Mary</Text>
        <View style={styles.profileContainer}>
          <Image
            style={styles.profilePic}
            source={require("@/assets/matcha.jpg")}
          ></Image>
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
    right: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  buttonContainer: {
    // backgroundColor: "#9d82ff",
    borderRadius: 8,
    overflow: "hidden",
    alignItems: "center",
    gap: 10,
  },
  profileContainer: {
    shadowColor: "#202020",
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 1,
  },
  profilePic: {
    height: 80,
    width: 80,
    borderRadius: 1000,
    borderColor: "#FFFFFF",
    borderWidth: 4,
    resizeMode: "cover",
    backgroundColor: "#FFFFFF",
  },
  switchGardensContainer: {
    alignItems: "center",
    padding: 15,
    marginTop: 50,
    position: "absolute",
    alignSelf: "flex-end",
  },
  subtextRemembering: {
    fontFamily: "SourceSerifPro_700Bold",
    color: "#3C3661",
  },
  subtextName: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    color: "#8B7CEC",
    paddingBottom: 10,
  },
});
