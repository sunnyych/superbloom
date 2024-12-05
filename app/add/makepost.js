import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Switch,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import db from "@/databse/db"; // Supabase client
import { useRouter } from "expo-router";
import { usePrompt } from "@/utils/PromptContext";
import { usePost } from "@/utils/PostContext";
import * as ImagePicker from "expo-image-picker";
import Feather from "@expo/vector-icons/Feather";

export default function NewPost() {
  const router = useRouter();

  const { selectedPrompt, setSelectedPrompt } = usePrompt();
  const { text, setText, media, setMedia, isPublic, setIsPublic } = usePost();

  // Hardcoded values
  const hardcodedMemoryPerson = "Mary Chen"; // Hardcoded person

  const prompts = [
    "What is your favorite memory of Mary?",
    "What did Mary like to do?",
    "Do you have any favorite stories of times you spent with Mary at school?",
    "What is your earliest memory of Mary?",
    "How would you describe Mary's personality?",
  ];

  const pickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "We need access to your photos to allow image uploads."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // Fallback to MediaTypeOptions.Images
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const uploadedImageUri = result.assets[0].uri; // Access the image URI
        setMedia(uploadedImageUri); // Save the image URI
        console.log("Uploaded Image URI:", uploadedImageUri); // Debugging
      } else if (result.canceled) {
        console.log("Image selection canceled.");
      } else {
        console.error(
          "No assets returned or unexpected result structure:",
          result
        );
      }
    } catch (error) {
      console.error("Error launching image picker:", error);
      Alert.alert("Error", "Something went wrong while picking the image.");
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  console.log("selected prompt is " + selectedPrompt);

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => router.push("tabs/home")}
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>plant a memory</Text>
        <Text style={styles.subtitle}>write and reflect</Text>

        {selectedPrompt >= 0 && (
          <View style={styles.promptContainer}>
            <Image
              style={styles.promptTape}
              source={require("@/assets/tape.png")}
            ></Image>
            <View style={styles.promptCard}>
              <Text style={styles.promptText}>{prompts[selectedPrompt]}</Text>
            </View>
          </View>
        )}

        <View style={styles.mainContainer}>
          <View style={styles.memoryPersonContainer}>
            <Text style={styles.memoryPersonLabel}>Memory Person:</Text>
            <Text style={styles.memoryPersonValue}>
              {hardcodedMemoryPerson}
            </Text>
          </View>
          <TextInput
            style={[styles.input, { height: 100 }]}
            placeholder="Describe the memory"
            value={text}
            onChangeText={setText}
            multiline={true}
          />

          <View>
            {media && (
              <TouchableOpacity
                onPress={() => setMedia(null)}
                style={styles.clearButton}
              >
                <Feather name="trash-2" size={24} color="black" />
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
              {media ? (
                <Image
                  source={{ uri: media }}
                  style={styles.uploadedImage}
                  onError={(error) =>
                    console.error(
                      "Image loading error:",
                      error.nativeEvent.error
                    )
                  }
                />
              ) : (
                <Feather name="image" size={150} color="#ccc" />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.toggleContainer}>
            <Text style={styles.toggleLabel}>Public:</Text>
            <Switch
              value={isPublic}
              onValueChange={setIsPublic}
              thumbColor={isPublic ? "#9d82ff" : "#ccc"}
              trackColor={{ false: "#ccc", true: "#e6e0ff" }}
            />
          </View>
        </View>

        <View style={styles.navigationButtons}>
          <TouchableOpacity
            style={[styles.navButton, styles.backButton]}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.navButton,
              text ? styles.nextButton : styles.disabledNextButton,
            ]}
            onPress={() => router.push("/add/pickflower")}
            disabled={!text}
          >
            <Text
              style={
                text ? styles.nextButtonText : styles.disabledNextButtonText
              }
            >
              next
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FCF8FE",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 40,
    fontFamily: "SourceSerifPro_700Bold",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#7f7f7f",
    marginBottom: 20,
    fontFamily: "SourceSerifPro_700Bold_Italic",
  },
  memoryPersonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  memoryPersonLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 8,
  },
  memoryPersonValue: {
    fontSize: 18,
    color: "#555",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "white",
    fontFamily: "Rubik_400Regular",
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  toggleLabel: {
    fontSize: 18,
    marginRight: 8,
  },
  mainContainer: {
    padding: 30,
  },
  promptCard: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#BEBEBE",
    marginHorizontal: 15,
  },
  promptText: {
    fontSize: 16,
    color: "#000",
    textAlign: "center",
    fontFamily: "Rubik_400Regular",
  },
  promptTape: {
    margin: -15,
    width: 100,
    resizeMode: "contain",
    zIndex: 10,
  },
  promptContainer: {
    alignItems: "center",
    gap: -10,
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    marginTop: "auto",
  },
  navButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  backButton: {
    backgroundColor: "#EEE7FF",
  },
  backButtonText: {
    color: "#8B7CEC",
    fontSize: 16,
    fontFamily: "Rubik_500Medium",
  },
  nextButton: {
    backgroundColor: "#8B7CEC",
  },
  nextButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Rubik_500Medium",
  },
  disabledNextButton: {
    backgroundColor: "#EAE9ED",
  },
  disabledNextButtonText: {
    color: "#CCCCCC",
    fontSize: 16,
    fontFamily: "Rubik_500Medium",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#A393EB",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: 20,
    fontFamily: "Rubik_500Medium",
  },
  imageContainer: {
    marginBottom: 16,
    alignItems: "center",
  },
  uploadedImage: {
    width: 150,
    height: 150,
    marginTop: 0,
    borderRadius: 8,
  },
  clearButton: {
    position: "absolute",
    zIndex: 10,
    backgroundColor: "#F0F0F0", // Light background for visibility
    padding: 10,
    width: 50,
    height: 50,
    borderRadius: 50, // Circular button
    justifyContent: "left",
    alignItems: "center",
    elevation: 2, // Shadow for better visibility
  },
});
