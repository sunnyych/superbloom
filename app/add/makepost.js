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
} from "react-native";
import db from "@/databse/db"; // Supabase client
import { useRouter } from "expo-router";
import { usePrompt } from "@/utils/PromptContext";

export default function NewPost() {
  // States for user input
  const [text, setText] = useState("");
  const [media, setMedia] = useState("");
  const [isPublic, setIsPublic] = useState(true); // Toggle for public or private post

  const router = useRouter();
  const { selectedPrompt, setSelectedPrompt } = usePrompt();

  // Hardcoded values
  const hardcodedUsername = "helen-smith";
  const hardcodedUserId = 1;
  const hardcodedGardenId = 1;
  const hardcodedMemoryPerson = "Mary Chen"; // Hardcoded person

  const prompts = [
    "What is your favorite memory of Mary?",
    "What did Mary like to do?",
    "Do you have any favorite stories of times you spent with Mary at school?",
    "What is your earliest memory of Mary?",
    "How would you describe Mary's personality?",
  ];

  const addMemory = async () => {
    if (!text) {
      Alert.alert("Error", "Please fill in the memory text.");
      return;
    }

    try {
      const { error } = await db.from("post").insert([
        {
          username: hardcodedUsername,
          user_id: hardcodedUserId,
          garden_id: hardcodedGardenId,
          memory_person: hardcodedMemoryPerson,
          text: text,
          media: media || null, // Optional media
          public: isPublic, // True or false based on the toggle
          time_stamp: new Date().toISOString(), // Current timestamp
          flower_color: "pink", // Hardcoded or dynamic
          flower_type: 1, // Hardcoded for now
        },
      ]);

      if (error) {
        console.error("Error adding memory:", error);
        Alert.alert("Error", "Failed to add memory.");
      } else {
        // Alert.alert("Success", "Memory added successfully!");
        // Clear the form after success
        setText("");
        setMedia("");
        setIsPublic(true);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      Alert.alert("Error", "An unexpected error occurred.");
    }
  };

  return (
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

      {/* Display chosen prompt */}
      {selectedPrompt && (
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

      {/* Display Memory Person */}
      <View style={styles.mainContainer}>
        <View style={styles.memoryPersonContainer}>
          <Text style={styles.memoryPersonLabel}>Memory Person:</Text>
          <Text style={styles.memoryPersonValue}>{hardcodedMemoryPerson}</Text>
        </View>
        <TextInput
          style={[styles.input, { height: 200 }]}
          placeholder="Describe the memory"
          value={text}
          onChangeText={setText}
          multiline={true}
        />
        <TextInput
          style={styles.input}
          placeholder="Media URL (optional)"
          value={media}
          onChangeText={setMedia}
        />
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
          style={[styles.navButton, styles.nextButton]}
          onPress={() => router.push("/add/pickflower")}
        >
          <Text style={styles.nextButtonText}>next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
});
