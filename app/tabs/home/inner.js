import { useBackground } from "./_layout";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import db from "@/databse/db";
// import { useFocusEffect } from "@react-navigation/native";
import Dropdown from "@/components/Dropdown";
import Toggle from "@/components/Toggle";

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
  Modal,
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
import PostModal from "@/components/PostModal";

export default function OuterGarden() {
  const router = useRouter();
  const { translateX, translateY } = useBackground();
  const { postIds } = useLocalSearchParams(); // Get post IDs from query params

  const [isToggled, setIsToggled] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedGardenId, setSelectedGardenId] = useState(
    globalState.selectedGardenId
  );
  const [isGarden, setIsGarden] = useState(true); // Toggle for garden/collage view

  // Post modal when a flower is clicked
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  console.log("selected garden Id is", selectedGardenId);

  const handleGoBack = () => {
    translateX.value = -400; // Reset background position
    translateY.value = 0;
    router.back();
  };

  const handleToggle = () => {
    const newToggleState = !isToggled;
    setIsToggled(newToggleState);

    if (newToggleState) {
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

  // Fetch posts for this garden
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch posts for a specific garden_id from Supabase
        const { data, error } = await db
          .from("post")
          .select(
            "id, username, memory_person, text, media, time_stamp, flower_type, flower_color"
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

  // console.log("posts :" + JSON.stringify(posts, null, 2));

  // Loading state
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#9d82ff" />
      </View>
    );
  }

  // Function to get a random position
  const getRandomPosition = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handleFlowerPress = (
    text,
    media,
    time_stamp,
    flower_type,
    flower_color
  ) => {
    // Navigate to the post page, passing post data
    // router.push(
    //   `/tabs/community/post?text=${text}&media=${media}&time_stamp=${time_stamp}`
    // );
    setSelectedPost({ text, media, time_stamp, flower_type, flower_color });
    setModalVisible(true);
  };

  const handleBack = () => {
    setModalVisible(false); // Close the modal
    setTimeout(() => setSelectedPost(null), 100);
  };

  return (
    <View style={styles.container}>
      {/* Render flowers for each post */}
      <View style={styles.gardenArea}>
        {posts.map((post) => {
          // Generate random positions for the flowers
          const randomTop = getRandomPosition(20, 20); // Adjust the max to control range of vertical positions
          const randomLeft = getRandomPosition(10, 80); // Adjust the max to control range of horizontal positions

          return (
            <TouchableOpacity
              key={post.id}
              style={[
                styles.flower,
                { top: randomTop + "%", left: randomLeft + "%" },
              ]}
              onPress={() =>
                handleFlowerPress(
                  post.text,
                  post.media,
                  post.time_stamp,
                  post.flower_type,
                  post.flower_color
                )
              }
            >
              <View>
                {renderFlower(
                  flowerTypes[post.flower_type].BloomComponent,
                  flowerTypes[post.flower_type].StemComponent,
                  post.flower_color,
                  "#94CDA0",
                  75
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Buttons in lower right for toggling */}
      <View style={styles.content}>
        <View style={styles.buttonContainer}>
          <Pressable onPress={handleGoBack}>
            <Image
              style={styles.signIcon}
              source={require("@/assets/icons/private-sign.png")}
            />
          </Pressable>
          <View style={styles.toggleContainer}>
            <Toggle onToggle={handleToggle} isEnabled={isToggled} />
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
        <Dropdown />
      </View>

      {/* Add button to add a flower */}
      <Link href="/add/chooseprompt" style={styles.postButtonContainer}>
        <View style={styles.postButton}>
          <FontAwesome size={36} name="plus" color="white" />
        </View>
      </Link>

      {modalVisible && selectedPost && (
        <PostModal
          visible={modalVisible}
          onClose={handleBack} // Close the modal
          text={selectedPost.text} // Pass the selected post's data
          media={selectedPost.media}
          timeStamp={selectedPost.time_stamp}
          flower_color={selectedPost.flower_color}
          flower_type={selectedPost.flower_type}
        />
      )}
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
  toggleContainer: {
    width: 90,
    height: 40,
    borderRadius: 16,
    padding: 2,
    justifyContent: "center",
  },
});
