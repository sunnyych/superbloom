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

const fallbackImage = require("../../../assets/logo.png"); // Use logo.png as the fallback image

const Profile = () => {
  const [gardens, setGardens] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const hardcodedUsername = globalState.hardcodedUsername; // Get the hardcoded username from globalState

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
        <Text style={styles.title}>settings</Text>
        <Text style={styles.subtitle}>edit your gardens</Text>
        <Text style={styles.title}>Gardens for {hardcodedUsername}</Text>

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
                  source={
                    item.image
                      ? { uri: item.image } // Load the image dynamically if it exists
                      : fallbackImage // Use logo.png as the fallback
                  }
                  style={styles.gardenImage}
                />
                <Text style={styles.gardenName}>Name: {item.garden_name}</Text>
                <Text style={styles.gardenYear}>
                  Year: {item.year || "N/A"}
                </Text>
                <Text style={styles.gardenId}>Garden ID: {item.garden_id}</Text>
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
  gardenContainer: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
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
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  gardenName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  gardenYear: {
    fontSize: 14,
    color: "#666",
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
});

export default Profile;
