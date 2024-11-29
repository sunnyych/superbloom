import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import db from "@/databse/db"; // Supabase client

const fallbackImage = require("../../../assets/logo.png"); // Use logo.png as the fallback image

const Profile = () => {
  const [gardens, setGardens] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGardenId, setSelectedGardenId] = useState(null); // Track selected garden ID

  const hardcodedUsername = "helen-smith"; // Hardcoded username

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
  }, []);

  const handleSelectGarden = (gardenId) => {
    setSelectedGardenId(gardenId); // Update selected garden ID
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
      <Text style={styles.title}>Gardens for {hardcodedUsername}</Text>

      {gardens.length > 0 ? (
        <FlatList
          data={gardens}
          keyExtractor={(item) => item.garden_id.toString()} // Use garden_id as the key
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.gardenContainer,
                selectedGardenId === item.garden_id && styles.selectedGarden, // Highlight if selected
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
              <Text style={styles.gardenYear}>Year: {item.year || "N/A"}</Text>
              <Text style={styles.gardenId}>Garden ID: {item.garden_id}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.noGardensText}>No gardens available for this user.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  gardenContainer: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  selectedGarden: {
    backgroundColor: "#cce5ff", // Highlighted background color for selected garden
    borderWidth: 2,
    borderColor: "#007AFF", // Border color for selected garden
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
