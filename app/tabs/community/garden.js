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
          .select("id, username, memory_person, text, flower_type, media") // Fetch post info
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

  const handleFlowerPress = (image, text, flowerType) => {
    // Navigate to the post page, passing post data
    router.push(
      `/tabs/community/post?text=${text}&image=${image}&flower_type=${flowerType}`
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
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back}>
        <Text style={styles.backButtonText}>back</Text>
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>{name}</Text>

      {/* Creator Badge */}
      <View style={styles.creatorBadge}>
        <Text style={styles.creatorText}>made by @{userName}</Text>
      </View>

      {/* Placeholder Avatar */}
      <View style={styles.avatarContainer}>
        <Image
          source={require("../../../assets/john_white.jpg")}
          style={styles.avatar}
        />
      </View>

      {/* Garden Area - Dynamically render flowers */}
      <View style={styles.gardenArea}>
        {posts.map((post) => (
          <TouchableOpacity
            key={post.id}
            style={styles.flower}
            onPress={() =>
              handleFlowerPress(post.id, post.text, post.flower_type)
            }
          >
            <Image
              source={flowerImages[post.flower_type] || flowerImages[0]} // Default to flower0 if flower_type is undefined
              style={styles.flowerImage}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Toggle at Bottom Right */}
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
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  flower: {
    width: 100,
    height: 100,
    margin: 10,
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
});

export default Garden;
