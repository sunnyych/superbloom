import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import db from "@/databse/db"; // Supabase client
import { useRouter, useLocalSearchParams } from "expo-router";
import { flowerTypes, colorPalette, renderFlower } from "@/utils/flowerUtils";
import { useFlower } from "@/utils/FlowerContext";
import { usePost } from "@/utils/PostContext";

// Hardcoded values
const hardcodedUsername = "helen-smith";
const hardcodedUserId = 1;
const hardcodedGardenId = 1;
const hardcodedMemoryPerson = "Mary Chen"; // Hardcoded person

const postImages = {
  "star.jpg": require("@/assets/posts/star.jpg"),
  "game.jpg": require("@/assets/posts/game.jpg"),
  "cube.jpg": require("@/assets/posts/cube.jpg"),
  "walks.jpg": require("@/assets/posts/walks.jpg"),
  "cat2.jpg": require("@/assets/posts/cat2.jpg"),
  "pancake.jpg": require("@/assets/posts/pancake.jpg"),
  "jimmy2.jpg": require("@/assets/posts/jimmy2.jpg"),
  "tea.jpg": require("@/assets/posts/tea.jpg"),
  "stories.jpg": require("@/assets/posts/stories.jpg"),
  "jimmy1.jpg": require("@/assets/posts/jimmy1.jpg"),
  "baking.jpg": require("@/assets/posts/baking.jpg"),
  "cat1.jpg": require("@/assets/posts/cat1.jpg"),
  "santa_monica.jpg": require("@/assets/posts/santa_monica.jpg"),
  "whiteboard.jpg": require("@/assets/posts/whiteboard.jpg"),
  "book.jpg": require("@/assets/posts/book.jpg"),
  "knitting.jpg": require("@/assets/posts/knitting.jpg"),
  "coffee.jpg": require("@/assets/posts/coffee.jpg"),
  "burger.jpg": require("@/assets/posts/burger.jpg"),
  "soccer.jpg": require("@/assets/posts/soccer.jpg"),
  "sunset.jpg": require("@/assets/posts/sunset.jpg"),
  "matcha.jpg": require("@/assets/posts/matcha.jpg"),
  "hike.jpg": require("@/assets/posts/hike.jpg"),
  "song.jpg": require("@/assets/posts/song.jpg"),
};

export default PostPreview = () => {
  const router = useRouter();

  const { text, setText, media, setMedia, isPublic, setIsPublic } = usePost();
  const { selectedType, setSelectedType, selectedColor, setSelectedColor } =
    useFlower();

  const item = {
    username: hardcodedUsername,
    user_id: hardcodedUserId,
    garden_id: hardcodedGardenId,
    memory_person: hardcodedMemoryPerson,
    text: text,
    media: media || null, // Optional media
    public: false, // True or false based on the toggle
    time_stamp: new Date().toISOString(), // Current timestamp
    flower_color: selectedColor,
    flower_type: selectedType,
  };

  const addMemory = async () => {
    try {
      const { error } = await db.from("post").insert([
        {
          username: hardcodedUsername,
          user_id: hardcodedUserId,
          garden_id: hardcodedGardenId,
          memory_person: hardcodedMemoryPerson,
          text: text,
          media: media || "", // Optional media
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
        router.push("tabs/home/");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      Alert.alert("Error", "An unexpected error occurred.");
    }
  };
  console.log("selectedColor is" + selectedColor);
  console.log("selectedType is" + selectedType);

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
      <Text style={styles.subtitle}>preview your post</Text>
      <View style={styles.container}>
        <View style={styles.post}>
          <View style={styles.previewContainer}>
            {renderFlower(
              flowerTypes[selectedType].BloomComponent,
              flowerTypes[selectedType].StemComponent,
              selectedColor,
              "#94CDA0",
              60 // size parameter
            )}
          </View>
          <Text style={styles.postText}>{text}</Text>
          <Text style={styles.date}>{item.time_stamp}</Text>
          <Image source={postImages[item.media]} style={styles.postImage} />
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
          onPress={addMemory}
        >
          <Text style={styles.nextButtonText}>plant</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCF8FE",
    padding: 16,
  },
  scrollContainer: {
    paddingBottom: 80, // Prevent overlap with the toggle
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: "#7f7f7f",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 28,
    color: "#9d82ff",
    fontWeight: "bold",
  },
  post: {
    marginBottom: 24,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    padding: 16,
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 8,
  },
  postText: {
    fontSize: 16,
    color: "#7f7f7f",
    lineHeight: 22,
    marginBottom: 12,
  },
  date: {
    fontSize: 14,
    color: "#b0b0b0",
    textAlign: "right",
    marginBottom: 16,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
  },
  toggleContainer: {
    position: "absolute",
    bottom: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  toggleIcon: {
    marginLeft: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#9d82ff",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: 18,
    color: "#ffffff",
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
    backgroundColor: "#1D1749",
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
  },
});
