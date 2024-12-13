import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Switch,
  ActivityIndicator,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import { useRouter, useLocalSearchParams, useFocusEffect } from "expo-router";
import db from "@/databse/db";
import { flowerTypes, colorPalette, renderFlower } from "@/utils/flowerUtils";
import Toggle from "@/components/Toggle";

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
    0: require("../../../assets/flowers/flower0.jpg"),
    1: require("../../../assets/flowers/flower1.jpg"),
    2: require("../../../assets/flowers/flower2.jpg"),
    3: require("../../../assets/flowers/flower3.jpg"),
  };

  const localImages = {
    "john-white": require("../../../assets/profiles/john-white.jpg"),
    "mike-smith": require("../../../assets/profiles/mike-smith.jpg"),
    "susan-brown": require("../../../assets/profiles/susan-brown.jpg"),
    "jack-fan": require("../../../assets/profiles/jack-fan.jpg"),
    "mr-whistler": require("../../../assets/profiles/mr-whistler.jpg"),
    "isa-bella": require("../../../assets/profiles/isa-bella.jpg"),
    "jimmy-d": require("../../../assets/profiles/jimmy-d.jpg"),
    "peter-snake": require("../../../assets/profiles/peter-snake.jpg"),
    "caroline-meyer": require("../../../assets/profiles/caroline-meyer.jpg"),
  };

  // Function to get a random position
  const getRandomPosition = (max) => {
    return Math.floor(Math.random() * max);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch posts for a specific garden_id from Supabase
        const { data, error } = await db
          .from("post")
          .select(
            "id, username, memory_person, text, flower_type, media, time_stamp, flower_color"
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
  }, [gardenName]);

  // const handleToggle = () => {
  //   setIsToggled(!isToggled);
  //   if (!isToggled) {
  //     router.push(`/tabs/community/collage`);
  //   }
  // };

  useFocusEffect(
    useCallback(() => {
      // Reset the toggle when the screen is focused
      setIsToggled(false);
    }, [])
  );

  const handleToggle = () => {
    setIsToggled(!isToggled);
    if (!isToggled) {
      // Pass only necessary data, such as post IDs
      const postIds = posts.map((post) => post.id).join(",");
      router.push(`/tabs/community/collage?postIds=${postIds}`);
    }
  };

  const handleFlowerPress = (
    text,
    media,
    time_stamp,
    flower_type,
    flower_color
  ) => {
    // Navigate to the post page, passing post data
    router.push(
      `/tabs/community/post?text=${text}&media=${media}&time_stamp=${time_stamp}&flower_type=${flower_type}&flower_color=${flower_color}`
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
    <SafeAreaView style={styles.container}>
      <View style={StyleSheet.absoluteFillObject}>
        <Image
          source={require("@/assets/backgrounds/background-garden.png")}
          style={styles.background}
        />
      </View>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>back</Text>
      </TouchableOpacity>

      <View style={styles.creatorBadge}>
        <Image
          style={styles.signImage}
          source={require("@/assets/icons/blank-sign.png")}
        />
        <Text style={styles.creatorText}>@{user}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.toggleContainer}>
          <Toggle onToggle={handleToggle} isEnabled={isToggled} />
        </View>
      </View>

      {/* <View style={styles.avatarContainer}>
        <Image source={localImages[gardenName]} style={styles.avatar} />
      </View> */}
      {/* Garden profile pic and switching between gardens in upper right */}
      <View style={styles.switchGardensContainer}>
        <Text style={styles.subtextRemembering}>remembering</Text>
        <Text style={styles.subtextName}>
          {/* {PROFILE_NAMES[selectedGardenId - 10]} */}
          {name}
        </Text>
        <View style={styles.profileContainer}>
          <Image
            style={styles.profilePic}
            source={localImages[gardenName]}
          ></Image>
        </View>
      </View>

      {/* Garden Area with random flower positions */}
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
                  70
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* <View style={styles.toggleContainer}>
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
      </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f4ff",
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 16,
    backgroundColor: "#EEE7FF",
    borderRadius: 25,
    paddingHorizontal: 30,
    paddingVertical: 12,
  },
  backButtonText: {
    color: "#8B7CEC",
    fontSize: 16,
    fontFamily: "Rubik_500Medium",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 60,
    color: "#9d82ff",
    fontFamily: "Rubik_500Medium",
  },
  gardenArea: {
    flex: 1,
    position: "relative", // Make sure this is relative to position absolute flowers inside it
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20, // Optional: Add some padding if needed
  },
  flower: {
    position: "absolute", // Position flowers absolutely
    margin: 10,
    borderRadius: 12, // Optional: rounded corners for a smoother look
    overflow: "hidden", // Ensure the images don't overflow the container
  },
  // flowerImage: {
  //   width: "100%",
  //   height: "100%",
  // },
  // toggleContainer: {
  //   position: "absolute",
  //   bottom: 150,
  //   right: 30,
  //   flexDirection: "row",
  //   alignItems: "center",
  // },
  // toggleIcon: {
  //   marginLeft: 10,
  //   width: 40,
  //   height: 40,
  //   borderRadius: 20,
  //   backgroundColor: "#9d82ff",
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // toggleIconText: {
  //   fontSize: 18,
  //   color: "#ffffff",
  // },
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
  signImage: {
    width: 100,
    resizeMode: "contain",
  },
  creatorBadge: {
    marginTop: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  creatorText: {
    color: "white",
    position: "absolute",
    fontSize: 13,
    fontFamily: "Rubik_500Medium",
    paddingBottom: 10,
  },
  background: {
    width: "200%",
    left: -350,
    top: -40,
  },
  switchGardensContainer: {
    alignItems: "center",
    padding: 16,
    marginTop: 50,
    position: "absolute",
    alignSelf: "flex-end",
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
  toggleContainer: {
    width: 90,
    height: 40,
    borderRadius: 16,
    padding: 2,
    justifyContent: "center",
  },
  content: {
    position: "absolute",
    bottom: 135,
    left: 15,
  },
});

export default Garden;
