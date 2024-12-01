// similar to detail.js in A4

// on click back, navigate back to garden.js

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";

const Post = () => {
  const router = useRouter();
  const { text, media, time_stamp } = useLocalSearchParams(); // Extract passed params
  const [isLoading, setIsLoading] = useState(true);
  const postImages = {
    "star.jpg": require("../../../assets/posts/star.jpg"),
    "game.jpg": require("../../../assets/posts/game.jpg"),
    "cube.jpg": require("../../../assets/posts/cube.jpg"),
    "walks.jpg": require("../../../assets/posts/walks.jpg"),
    "cat2.jpg": require("../../../assets/posts/cat2.jpg"),
    "pancake.jpg": require("../../../assets/posts/pancake.jpg"),
    "jimmy2.jpg": require("../../../assets/posts/jimmy2.jpg"),
    "tea.jpg": require("../../../assets/posts/tea.jpg"),
    "stories.jpg": require("../../../assets/posts/stories.jpg"),
    "jimmy1.jpg": require("../../../assets/posts/jimmy1.jpg"),
    "baking.jpg": require("../../../assets/posts/baking.jpg"),
    "cat1.jpg": require("../../../assets/posts/cat1.jpg"),
    "santa_monica.jpg": require("../../../assets/posts/santa_monica.jpg"),
    "whiteboard.jpg": require("../../../assets/posts/whiteboard.jpg"),
    "book.jpg": require("../../../assets/posts/book.jpg"),
    "knitting.jpg": require("../../../assets/posts/knitting.jpg"),
    "coffee.jpg": require("../../../assets/posts/coffee.jpg"),
    "burger.jpg": require("../../../assets/posts/burger.jpg"),
    "soccer.jpg": require("../../../assets/posts/soccer.jpg"),
    "sunset.jpg": require("../../../assets/posts/sunset.jpg"),
    "matcha.jpg": require("../../../assets/posts/matcha.jpg"),
    "hike.jpg": require("../../../assets/posts/hike.jpg"),
    "song.jpg": require("../../../assets/posts/song.jpg"),
  };
  console.log("media", media);

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>back</Text>
      </TouchableOpacity>

      {/* Post Content */}
      <View style={styles.postContainer}>
        {/* Flower Icon */}
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>🌻</Text>
        </View>

        {/* Post Text */}
        <Text style={styles.postText}>{text}</Text>

        {/* Date */}
        <Text style={styles.date}>{time_stamp}</Text>

        {/* Image */}
        <Image source={postImages[media]} style={styles.image} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f4ff",
    padding: 16,
  },
  backButton: {
    position: "absolute",
    top: 16,
    left: 16,
    backgroundColor: "#dcd6ff",
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#7f7f7f",
  },
  postContainer: {
    marginTop: 60,
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 8,
  },
  icon: {
    fontSize: 24,
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
  image: {
    width: "100%",
    height: 200,
    borderRadius: 12,
  },
});

export default Post;
