import { useBackground } from "./_layout";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import db from "@/databse/db";

// import { useFocusEffect } from "@react-navigation/native";

import {
  View,
  Text,
  Button,
  StyleSheet,
  Pressable,
  Image,
  Switch,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import {
  useRouter,
  Link,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";
import { useEffect, useState, useCallback } from "react";
import { flowerTypes, colorPalette, renderFlower } from "@/utils/flowerUtils";

import { globalState } from "@/components/Global";
import { getPathWithConventionsCollapsed } from "expo-router/build/fork/getPathFromState-forks";

export default function OuterGarden() {
  const router = useRouter();
  const { translateX, translateY } = useBackground();
  const { postIds } = useLocalSearchParams(); // Get post IDs from query params

  const [isToggled, setIsToggled] = useState(true);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedGardenId, setSelectedGardenId] = useState(
    globalState.selectedGardenId
  );
  const [isGarden, setIsGarden] = useState(true); // Toggle for garden/collage view

  console.log("selected garden Id is", selectedGardenId);

  const goToInner = () => {
    router.push("/tabs/home/inner");
    translateX.value = -200; // Reset background position
    translateY.value = -450;
  };

  const handleToggle = () => {
    setIsToggled(!isToggled);
    if (!isToggled) {
      // Pass only necessary data, such as post IDs
      const postIds = posts.map((post) => post.id).join(",");
      router.push(`/tabs/home/collage?postIds=${postIds}`);
    }
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

  useFocusEffect(
    useCallback(() => {
      translateX.value = -400; // Reset background position
      translateY.value = 0;
    }, [])
  );

  // Fetch posts for this garden
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch posts for a specific garden_id from Supabase
        const { data, error } = await db
          .from("post")
          .select(
            "id, username, memory_person, text, flower_type, media, time_stamp"
          ) // Fetch post info
          .eq("garden_id", selectedGardenId); // Filter by garden_id

        if (error) {
          console.error("Supabase error:", error.message);
          return;
        }
        setPosts(data || []); // Set posts to the state
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [selectedGardenId]);

  console.log("posts :" + posts);

  // Loading state
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#9d82ff" />
      </View>
    );
  }

  // Function to get a random position
  const getRandomPosition = (max) => {
    return Math.floor(Math.random() * max);
  };

  const handleFlowerPress = (text, media, time_stamp) => {
    // Navigate to the post page, passing post data
    router.push(
      `/tabs/community/post?text=${text}&media=${media}&time_stamp=${time_stamp}`
    );
  };

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
              value={isToggled}
              onValueChange={handleToggle}
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

      {/* Add button to add a flower */}
      <Link href="/add/chooseprompt" style={styles.postButtonContainer}>
        <View style={styles.postButton}>
          <FontAwesome size={36} name="plus" color="white" />
        </View>
      </Link>

      {/* Render flowers for each post */}
      <View style={styles.gardenArea}>
        {posts.map((post) => {
          // Generate random positions for the flowers
          const randomTop = getRandomPosition(250); // Adjust the max to control range of vertical positions
          const randomLeft = getRandomPosition(250); // Adjust the max to control range of horizontal positions

          return (
            <TouchableOpacity
              key={post.id}
              style={[styles.flower, { top: randomTop, left: randomLeft }]}
              onPress={() =>
                handleFlowerPress(post.text, post.media, post.time_stamp)
              }
            >
              <View>
                {renderFlower(
                  flowerTypes[post.flower_type].BloomComponent,
                  flowerTypes[post.flower_type].StemComponent,
                  post.flower_color,
                  "#94CDA0",
                  70
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    marginBottom: 120,
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
    bottom: 15,
    left: 15,
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
    padding: 10,
    marginTop: 40,
    position: "absolute",
    alignSelf: "flex-end",
  },
  signIcon: {
    width: 80,
    height: 100,
    resizeMode: "contain",
  },
  subtextRemembering: {
    fontFamily: "SourceSerifPro_700Bold",
    color: "#3C3661",
    fontSize: 12,
  },
  subtextName: {
    fontFamily: "Rubik_700Bold",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    color: "#8B7CEC",
    paddingBottom: 10,
  },
  postButtonContainer: {
    position: "absolute",
    right: 15,
    bottom: 15,
  },
  postButton: {
    backgroundColor: "#8B7CEC",
    height: 70,
    width: 70,
    borderRadius: 200,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 2,
    paddingLeft: 1,
    shadowColor: "#8B7CEC",
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8, // Add this property
    elevation: 10,
  },
});
