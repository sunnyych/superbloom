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
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import db from "@/databse/db"; // Assuming you have your database module
import Toggle from "@/components/Toggle";

const Collage = () => {
  const router = useRouter();
  const { postIds } = useLocalSearchParams(); // Get post IDs from query params
  const [isToggled, setIsToggled] = useState(true);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState(null);
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

  // Toggle function to navigate back to the garden
  const handleToggle = () => {
    const newToggleState = !isToggled;
    setIsToggled(newToggleState);

    if (!newToggleState) {
      router.push("/tabs/home");
    }
  };

  // Fetch posts based on the postIds passed in the URL
  useEffect(() => {
    const fetchPosts = async () => {
      if (postIds) {
        const ids = postIds.split(","); // Convert the comma-separated string into an array of IDs
        try {
          const { data, error } = await db
            .from("post")
            .select("*")
            .in("id", ids); // Fetch posts based on the received IDs

          if (error) {
            console.error("Error fetching posts:", error.message);
            return;
          }
          setPosts(data || []);
          setName(data[0].memory_person);
          console.log("name", name);
        } catch (err) {
          console.error("Error fetching posts:", err);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchPosts();
  }, [postIds]);

  // Loading state
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#9d82ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>in memory of</Text>
          <Text style={styles.subtitle}>{name}</Text>
        </View>

        {posts.map((item) => (
          <View key={item.id} style={styles.post}>
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>🌷</Text>
            </View>
            <Text style={styles.postText}>{item.text}</Text>
            <Text style={styles.date}>{item.time_stamp}</Text>
            <Image source={postImages[item.media]} style={styles.postImage} />
          </View>
        ))}
      </ScrollView>

      <View style={styles.toggleContainer}>
        <Toggle onToggle={handleToggle} isEnabled={isToggled} />
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
  scrollContainer: {
    paddingBottom: 80,
  },
  header: {
    alignItems: "center",
    marginTop: 65,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    color: "#A896E8",
    fontFamily: "SourceSerifPro_700Bold",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 28,
    color: "#9d82ff",
    fontWeight: "bold",
    fontFamily: "Rubik_700Bold",
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
    left: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 120,
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
});

export default Collage;
