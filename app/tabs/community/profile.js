// this page should display all the gardens of a given user profile

// on click garden, navigate to garden.js

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from "react-native";
import { useRouter, useSearchParams } from "expo-router";

const Profile = () => {
  const router = useRouter();
  const { userId } = "helen-smith";

  // Mock data for user gardens
  const gardens = [
    {
      id: "1",
      name: "John White",
      years: "1927-2004",
      image: "https://via.placeholder.com/100",
    },
    {
      id: "2",
      name: "Mike Smith",
      years: "1950-2012",
      image: "https://via.placeholder.com/100",
    },
    {
      id: "3",
      name: "Susan Brown",
      years: "1980-2020",
      image: "https://via.placeholder.com/100",
    },
  ];

  // Mock user data
  const user = {
    id: userId,
    name: "Helen Smith",
    username: "helen-smith",
  };

  const handleGardenClick = (gardenId) => {
    router.push(`/tabs/community/garden?gardenId=${gardenId}`);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => router.back()}
      >
        <Text style={styles.closeButtonText}>×</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{user.name}</Text>
      <Text style={styles.subtitle}>@{user.username}</Text>

      <FlatList
        data={gardens}
        keyExtractor={(item) => item.id}
        horizontal
        contentContainerStyle={styles.gardenList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.gardenContainer}
            onPress={() => handleGardenClick(item.id)}
          >
            <Image source={{ uri: item.image }} style={styles.gardenImage} />
            <Text style={styles.gardenName}>{item.name}</Text>
            <Text style={styles.gardenYears}>({item.years})</Text>
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
