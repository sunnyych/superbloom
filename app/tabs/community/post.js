// similar to detail.js in A4

// on click back, navigate back to garden.js

import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const Post = () => {
  const router = useRouter();

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
        <Text style={styles.postText}>
          I still remember the time John drove me to In-N-Out after our CS
          midterm in college, and John got his favorite double double and
          strawberry shake.
        </Text>

        {/* Date */}
        <Text style={styles.date}>06.01.18</Text>

        {/* Image */}
        <Image
          source={require("../../../assets/burger.jpg")}
          style={styles.image}
        />
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
