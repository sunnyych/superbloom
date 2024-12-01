// this is the garden page for the given user profile

// on click back, navigate to profile.js

// on click toggle, navigate to collage.js

// on click flower, navigate to post.js

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Switch,
  ActivityIndicator,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import db from "@/databse/db";

const Garden = () => {
  const router = useRouter();
  const [isToggled, setIsToggled] = useState(false);
  const [posts, setPosts] = useState([]);
  const [name, setName] = useState([]);
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { gardenName } = useLocalSearchParams();
  console.log("garden_name", gardenName);

  const flowerImages = {
    0: require("../../../assets/flower0.jpg"),
    1: require("../../../assets/flower1.jpg"),
    2: require("../../../assets/flower2.jpg"),
    3: require("../../../assets/flower3.jpg"),
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch posts for a specific garden_id from Supabase
        const { data, error } = await db
          .from("post")
          .select(
            "id, username, memory_person, text, flower_type, media, time_stamp"
          ) // Fetch post info
          .eq("memory_person", gardenName); // Filter by garden_id

        if (error) {
          console.error("Supabase error:", error.message);
          return;
        }
        setName(data[0].memory_person);
        setUser(data[0].username);
        setPosts(data || []); // Set posts to the state
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleToggle = () => {
    setIsToggled(!isToggled);
    if (!isToggled) {
      router.push(
        "/tabs/community/collage?post_id=${postId}&text=${text}&flower_type=${flowerType}"
      );
    }
  };

  const handleFlowerPress = (text, media, time_stamp) => {
    // Navigate to the post page, passing post data
    router.push(
      `/tabs/community/post?text=${text}&media=${media}&time_stamp=${time_stamp}`
    );
  };

  if (isLoading) {
    return (
      <ActivityIndicator
        size="large"
        color="#9d82ff"
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{name}</Text>

      <View style={styles.creatorBadge}>
        <Text style={styles.creatorText}>made by @{user}</Text>
      </View>

      <View style={styles.avatarContainer}>
        <Image
          source={require("../../../assets/john_white.jpg")}
          style={styles.avatar}
        />
      </View>

      <View style={styles.gardenArea}>
        {posts.map((post) => (
          <TouchableOpacity
            key={post.id}
            style={styles.flower}
            onPress={() =>
              handleFlowerPress(post.text, post.media, post.time_stamp)
            }
          >
            <Image
              source={flowerImages[post.flower_type] || flowerImages[0]}
              style={styles.flowerImage}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.toggleContainer}>
        <Switch
          trackColor={{ false: "#dcd6ff", true: "#9d82ff" }}
          thumbColor={isToggled ? "#9d82ff" : "#ffffff"}
          ios_backgroundColor="#dcd6ff"
          onValueChange={handleToggle}
          value={isToggled}
        />
        <TouchableOpacity style={styles.toggleIcon}>
          <Text style={styles.toggleIconText}>📰</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f4ff",
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
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 60,
    color: "#9d82ff",
  },
  gardenArea: {
    flex: 1,
    justifyContent: "flex-start", // Align the flowers to the top
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20, // Added some padding to the garden area
  },
  flower: {
    width: 80, // Reduced flower size
    height: 80, // Reduced flower size
    margin: 10,
    borderRadius: 12, // Optional: rounded corners for a smoother look
    overflow: "hidden", // Ensure the images don't overflow the container
  },
  flowerImage: {
    width: "100%",
    height: "100%",
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
  toggleIconText: {
    fontSize: 18,
    color: "#ffffff",
  },
  avatarContainer: {
    alignItems: "center", // Center the avatar horizontally
    marginTop: 20, // Add some margin to position it nicely below the creator badge
  },
  avatar: {
    width: 60, // Reduced the width to 60px
    height: 60, // Reduced the height to 60px
    borderRadius: 30, // Ensures the avatar stays circular (half of width/height)
    borderWidth: 2, // Optional: Add border to make the avatar more prominent
    borderColor: "#9d82ff", // Optional: Add a color to the border
  },
  creatorBadge: {
    backgroundColor: "#dcd6ff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignSelf: "center",
    marginTop: 8,
  },
});

export default Garden;
