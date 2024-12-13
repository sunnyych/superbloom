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
  SafeAreaView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import db from "@/databse/db";

const localImages = {
  "john-white.jpg": require("../../../assets/profiles/john-white.jpg"),
  "mike-smith.jpg": require("../../../assets/profiles/mike-smith.jpg"),
  "susan-brown.jpg": require("../../../assets/profiles/susan-brown.jpg"),
  "jack-fan.jpg": require("../../../assets/profiles/jack-fan.jpg"),
  "mr-whistler.jpg": require("../../../assets/profiles/mr-whistler.jpg"),
  "isa-bella.jpg": require("../../../assets/profiles/isa-bella.jpg"),
  "jimmy-d.jpg": require("../../../assets/profiles/jimmy-d.jpg"),
  "peter-snake.jpg": require("../../../assets/profiles/peter-snake.jpg"),
  "caroline-meyer.jpg": require("../../../assets/profiles/caroline-meyer.jpg"),
};

const Profile = () => {
  const router = useRouter();
  //   const { userId } = useSearchParams(); // Dynamically fetch userId
  const [user, setUser] = useState(null);
  const [gardens, setGardens] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { username } = useLocalSearchParams();
  // console.log("username", username);

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

  const handleGardenClick = (gardenName) => {
    router.push(`/tabs/community/garden?gardenName=${gardenName}`);
  };

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#9d82ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
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
              onPress={() => handleGardenClick(item.garden_name)}
            >
              <Image
                source={
                  localImages[item.image] ||
                  require("../../../assets/profiles/john-white.jpg")
                }
                style={styles.gardenImage}
              />
              <Text style={styles.gardenName}>{item.garden_name}</Text>
              <Text style={styles.gardenYears}>({item.year})</Text>
            </TouchableOpacity>
          )}
        />

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f4ff",
    padding: 16,
  },
  safeContainer: {
    flex: 1,
    padding: 50,
    backgroundColor: "#f8f4ff",
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
    fontFamily: "SourceSerifPro_700Bold",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#7f7f7f",
    marginBottom: 20,
    fontFamily: "Rubik_500Medium",
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
    fontFamily: "Rubik_500Medium",
  },
  gardenYears: {
    fontSize: 14,
    color: "#7f7f7f",
    textAlign: "center",
  },
  backButton: {
    position: "absolute",
    bottom: 110,
    left: 20,
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
});

export default Profile;
