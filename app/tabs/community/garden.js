// this is the garden page for the given user profile

// on click back, navigate to profile.js

// on click toggle, navigate to collage.js

// on click flower, navigate to post.js

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Switch,
} from "react-native";
import { useRouter } from "expo-router";

const Garden = () => {
  const router = useRouter();
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
    if (!isToggled) {
      router.push("/tabs/community/collage");
    }
  };

  const handleFlowerPress = () => {
    router.push("/tabs/community/post");
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push("/tabs/community/profile")}
      >
        <Text style={styles.backButtonText}>back</Text>
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>John White</Text>

      {/* Creator Badge */}
      <View style={styles.creatorBadge}>
        <Text style={styles.creatorText}>made by @helen-smith</Text>
      </View>

      {/* Placeholder Avatar */}
      <View style={styles.avatarContainer}>
        <Image
          source={require("../../../assets/john_white.jpg")}
          style={styles.avatar}
        />
      </View>

      {/* Placeholder Garden Area */}
      <View style={styles.gardenArea}>
        {/* Pressable Flower */}
        <TouchableOpacity style={styles.flower} onPress={handleFlowerPress}>
          <Image
            source={require("../../../assets/flower.jpg")}
            style={styles.flowerImage}
          />
        </TouchableOpacity>
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
  creatorBadge: {
    position: "absolute",
    top: 100,
    right: 16,
    backgroundColor: "#ffdab9",
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 8,
  },
  creatorText: {
    fontSize: 14,
    color: "#7f7f7f",
    fontWeight: "bold",
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
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
  gardenArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  flower: {
    width: 100,
    height: 100,
  },
  flowerImage: {
    width: "100%",
    height: "100%",
  },
});

export default Garden;
