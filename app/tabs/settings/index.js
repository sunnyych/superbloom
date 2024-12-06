import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import db from "@/databse/db"; // Supabase client
import { globalState } from "@/components/Global";
import { FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const fallbackImage = require("@/assets/previews/preview-garden1.png"); // Use logo.png as the fallback image

const gardenImages = {
  1: require("@/assets/previews/preview-garden1.png"),
  2: require("@/assets/previews/preview-garden2.png"),
  3: require("@/assets/previews/preview-garden3.png"),
};

const Profile = () => {
  const [gardens, setGardens] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const hardcodedUsername = globalState.hardcodedUsername; // Get the hardcoded username from globalState

  const router = useRouter();

  useEffect(() => {
    const fetchGardens = async () => {
      try {
        const { data, error } = await db
          .from("user") // Query the "user" table
          .select("gardens") // Fetch only the gardens column
          .eq("username", hardcodedUsername)
          .single();

        if (error) throw error;

        setGardens(data.gardens || []); // Parse gardens JSONB
      } catch (err) {
        console.error("Error fetching gardens:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGardens();
  }, [hardcodedUsername]);

  const handleSelectGarden = (gardenId) => {
    globalState.selectedGardenId = gardenId; // Update the global state
    console.log(
      `Selected Garden ID updated to: ${globalState.selectedGardenId}`
    );
    setGardens((prevGardens) =>
      prevGardens.map((garden) =>
        garden.garden_id === gardenId
          ? { ...garden, isSelected: true }
          : { ...garden, isSelected: false }
      )
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#9d82ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.logoutButton}>
          <TouchableOpacity onPress={() => router.push("/")}>
            <FontAwesome6 size={30} name="right-from-bracket" color="#8B7CEC" />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>settings</Text>
        <Text style={styles.subtitle}>edit your gardens</Text>
        <Text style={styles.title}>your gardens</Text>
        <Text style={styles.username}>@james-landay</Text>

        {gardens.length > 0 ? (
          <FlatList
            data={gardens}
            keyExtractor={(item) => item.garden_id.toString()} // Use garden_id as the key
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.gardenContainer,
                  item.isSelected && styles.selectedGarden, // Highlight if selected
                ]}
                onPress={() => handleSelectGarden(item.garden_id)} // Select garden
              >
                <Image
                  source={gardenImages[item.garden_id]}
                  style={styles.gardenImage}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.gardenName}>in memory of</Text>
                  <Text style={styles.memoryPerson}>{item.garden_name}</Text>
                  <Text style={styles.gardenYear}>{item.year || "N/A"}</Text>
                  {/* <Text style={styles.gardenId}>
                    Garden ID: {item.garden_id}
                  </Text> */}
                </View>
              </TouchableOpacity>
            )}
          />
        ) : (
          <Text style={styles.noGardensText}>
            No gardens available for this user.
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f4ff",
    marginBottom: 80,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    fontFamily: "SourceSerifPro_700Bold_Italic",
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Rubik_700Bold",
    color: "#8B7CEC",
    marginBottom: 20,
  },
  gardenContainer: {
    // padding: 12,
    marginVertical: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#BEBEBE",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  selectedGarden: {
    backgroundColor: "#E8E2FE", // Highlighted background color for selected garden
    borderWidth: 2,
    borderColor: "#8B7CEC", // Border color for selected garden
  },
  gardenImage: {
    width: "100%",
    height: 100,
    resizeMode: "cover",
    borderRadius: 14,
    marginBottom: 8,
  },
  gardenName: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "SourceSerifPro_700Bold_Italic",
    color: "#A896E8",
  },
  memoryPerson: {
    fontSize: 24,
    fontFamily: "SourceSerifPro_700Bold",
  },
  gardenYear: {
    fontSize: 15,
    color: "#666",
    fontFamily: "Rubik_500Medium",
  },
  gardenId: {
    fontSize: 14,
    color: "#888",
  },
  noGardensText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
  logoutButton: {
    position: "absolute",
    right: 20,
    top: 20,
  },
  textContainer: {
    padding: 10,
  },
});

export default Profile;
