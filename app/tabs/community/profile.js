// export default Profile;

// fetches the user profile (their info + their gardens) to dynamically set up the profile page

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import db from "@/databse/db";

const localImages = {
  "john_white.jpg": require("../../../assets/john_white.jpg"),
  "mike_smith.jpg": require("../../../assets/mike_smith.jpg"),
  "susan_brown.jpg": require("../../../assets/susan_brown.jpg"),
  "jack_fan.jpg": require("../../../assets/jack_fan.jpg"),
  "mr_whistler.jpg": require("../../../assets/mr_whistler.jpg"),
  "isa_bella.jpg": require("../../../assets/isa_bella.jpg"),
  "jimmy_d.jpg": require("../../../assets/jimmy_d.jpg"),
  "peter-snake.jpg": require("../../../assets/peter-snake.jpg"),
  "caroline-meyer.jpg": require("../../../assets/caroline-meyer.jpg"),
};

const Profile = () => {
  const router = useRouter();
  //   const { userId } = useSearchParams(); // Dynamically fetch userId
  const [user, setUser] = useState(null);
  const [gardens, setGardens] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { username } = useLocalSearchParams();
  console.log("username", username);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Query the `user` table in Supabase
        const { data, error } = await db
          .from("user")
          .select("username, real_username, gardens") // Specify the columns to retrieve; "*" means all columns
          .eq("username", username); // Filter where `username` matches the provided value

        // Log the response for debugging
        console.log("Supabase Response:", { data, error });

        // Handle errors
        if (error) {
          console.error("Supabase error:", error.message);
          return;
        }

        // If data is found, set the user and gardens
        if (data && data.length > 0) {
          setUser({
            username: data[0].username,
            realUsername: data[0].real_username,
          });
          setGardens(data[0].gardens || []); // Parse the gardens array
        } else {
          console.error("User not found");
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleGardenClick = (gardenId) => {
    router.push(`/tabs/community/garden?gardenId=${gardenId}`);
  };

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#9d82ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => router.back()}
      >
        <Text style={styles.closeButtonText}>×</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{user.realUsername}</Text>
      <Text style={styles.subtitle}>@{user.username}</Text>

      <FlatList
        data={gardens}
        keyExtractor={(item) => item.garden_id.toString()}
        horizontal
        contentContainerStyle={styles.gardenList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.gardenContainer}
            onPress={() => handleGardenClick(item.garden_id)}
          >
            <Image
              source={
                localImages[item.image] ||
                require("../../../assets/john_white.jpg")
              }
              style={styles.gardenImage}
            />
            <Text style={styles.gardenName}>{item.garden_name}</Text>
            <Text style={styles.gardenYears}>({item.year})</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f4ff",
    padding: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f4ff",
  },
  closeButton: {
    position: "absolute",
    top: 16,
    left: 16,
    backgroundColor: "#9d82ff",
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  closeButtonText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 40,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#7f7f7f",
    marginBottom: 20,
  },
  gardenList: {
    marginTop: 16,
    paddingHorizontal: 10,
  },
  gardenContainer: {
    alignItems: "center",
    marginHorizontal: 3,
  },
  gardenImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  gardenName: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  gardenYears: {
    fontSize: 14,
    color: "#7f7f7f",
    textAlign: "center",
  },
  backButton: {
    position: "absolute",
    bottom: 16,
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
});

export default Profile;
