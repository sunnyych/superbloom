import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, Switch } from "react-native";
import db from "@/databse/db"; // Supabase client

export default function NewPost() {
  // States for user input
  const [text, setText] = useState("");
  const [media, setMedia] = useState("");
  const [isPublic, setIsPublic] = useState(true); // Toggle for public or private post

  // Hardcoded values
  const hardcodedUsername = "helen-smith";
  const hardcodedUserId = 1;
  const hardcodedGardenId = 1;
  const hardcodedMemoryPerson = "John Doe"; // Hardcoded person

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
        Alert.alert("Success", "Memory added successfully!");
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
    <View style={styles.container}>
      <Text style={styles.title}>Add a New Memory</Text>

      {/* Display Memory Person */}
      <View style={styles.memoryPersonContainer}>
        <Text style={styles.memoryPersonLabel}>Memory Person:</Text>
        <Text style={styles.memoryPersonValue}>{hardcodedMemoryPerson}</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Describe the memory"
        value={text}
        onChangeText={setText}
        multiline
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

      <Button title="Add Memory" onPress={addMemory} color="#007AFF" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  memoryPersonContainer: {
    flexDirection: "row",
    alignItems: "center",
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
});
