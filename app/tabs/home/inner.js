import { useBackground } from "./_layout";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import db from "@/databse/db";
// import { useFocusEffect } from "@react-navigation/native";
import Dropdown from "@/components/Dropdown";
import Toggle from "@/components/Toggle";
import Flower from "@/components/Flower";
import { Dimensions } from "react-native";

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
  const { width, height } = Dimensions.get("window");

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
          .eq("garden_id", selectedGardenId) // Filter by garden_id
          .eq("public", false); // Filter where 'public' is true

        if (error) {
          console.error("Supabase error:", error.message);
          return;
        }

        // setPosts(data || []); // Set posts to the state
        const postsWithPositions = data.map((post) => ({
          ...post,
          randomTop: getRandomPosition(height * 0.2, height * 0.25), // Random top position
          randomLeft: getRandomPosition(width * 0.02, width * 0.8), // Random left position
        }));
        setPosts(postsWithPositions); // Set posts to the state
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

  const PROFILE_PICS = [
    require("@/assets/pfps/mary.png"),
    require("@/assets/profiles/john-white.jpg"),
    require("@/assets/profiles/mr-whistler.jpg"),
  ];
  const PROFILE_NAMES = ["Mary", "John", "Mr. Whistler"];

  return (
    <View style={styles.container}>
      {/* Render flowers for each post */}
      <View style={styles.gardenArea}>
        {posts.map((post) => {
          return (
            <Flower
              key={post.id}
              post={post}
              handleFlowerPress={handleFlowerPress}
            />
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
        <Text style={styles.subtextName}>
          {PROFILE_NAMES[selectedGardenId - 10]}
        </Text>
        <View style={styles.profileContainer}>
          <Image
            style={styles.profilePic}
            source={PROFILE_PICS[selectedGardenId - 10]}
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
    padding: 16,
    marginTop: 50,
    position: "absolute",
    alignSelf: "flex-end",
  },
  signIcon: {
    width: 80,
    height: 100,
    resizeMode: "contain",
  },
  subtextRemembering: {
    fontFamily: "SourceSerifPro_700Bold_Italic",
    color: "#3C3661",
    fontSize: 12,
  },
  subtextName: {
    fontFamily: "Rubik_700Bold",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    color: "#8B7CEC",
    marginBottom: 10,
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
