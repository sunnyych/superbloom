// a search engine for adding friends

// on click "add friend", change the button color from purple to white and display "view profile", navigate to profile.js

import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";

import db from "@/databse/db";

const AddFriend = () => {
  const router = useRouter();

  // Hardcoded database with more detailed data
  const database = [
    { id: "1", username: "thulium", name: "Thu Le" },
    { id: "2", username: "mngo", name: "Myan Ngo" },
    { id: "3", username: "sunny.ych", name: "Sunny Yu" },
    { id: "4", username: "feliciaaa", name: "Felicia Yan" },
    { id: "5", username: "helen-smith", name: "Helen Smith" },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [addedFriends, setAddedFriends] = useState({}); // Tracks added friends

  const handleSearch = () => {
    const results = database.filter(
      (user) => user.username.toLowerCase() === searchQuery.toLowerCase()
    );
    setSearchResults(results);
  };

  const handleAddFriend = (userId) => {
    setAddedFriends((prev) => ({ ...prev, [userId]: true }));
  };

  const handleViewProfile = (username) => {
    // Navigate to the profile.js page using the username as a query parameter
    router.push(`/tabs/community/profile?username=${username}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>add a friend</Text>
      <Text style={styles.subtitle}>search for a user</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Enter a username..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <FontAwesome6 size={14} name="magnifying-glass" color="white" />
        </TouchableOpacity>
      </View>
      {searchResults.length > 0 && (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.resultContainer}>
              <View style={styles.avatar} />
              <View style={styles.resultInfo}>
                <Text style={styles.resultName}>{item.name}</Text>
                <Text style={styles.resultUsername}>@{item.username}</Text>
              </View>
              {addedFriends[item.id] ? (
                <TouchableOpacity
                  style={styles.viewProfileButton}
                  onPress={() => handleViewProfile(item.username)}
                >
                  <Text style={styles.viewProfileText}>view profile</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.addFriendButton}
                  onPress={() => handleAddFriend(item.id)}
                >
                  <Text style={styles.addFriendText}>add friend</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
          contentContainerStyle={styles.resultsList}
        />
      )}
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
    marginBottom: 120,
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
    marginTop: 80,
    fontFamily: "SourceSerifPro_700Bold",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#7f7f7f",
    marginBottom: 20,
    fontFamily: "SourceSerifPro_700Bold_Italic",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#7f7f7f",
    paddingHorizontal: 8,
    fontFamily: "Rubik_400Regular",
  },
  searchButton: {
    backgroundColor: "#9d82ff",
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  searchButtonText: {
    fontSize: 16,
    color: "#fff",
  },
  resultsList: {
    marginTop: 16,
    paddingHorizontal: 20,
  },
  resultContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 48,
    height: 48,
    backgroundColor: "#dcd6ff",
    borderRadius: 24,
    marginRight: 12,
  },
  resultInfo: {
    flex: 1,
  },
  resultName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  resultUsername: {
    fontSize: 14,
    color: "#7f7f7f",
  },
  addFriendButton: {
    backgroundColor: "#9d82ff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  addFriendText: {
    color: "#fff",
    fontWeight: "bold",
    fontFamily: "Rubik_500Medium",
  },
  viewProfileButton: {
    backgroundColor: "#e6e0ff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  viewProfileText: {
    color: "#9d82ff",
    fontWeight: "bold",
  },
  backButton: {
    position: "absolute",
    bottom: 16,
    left: 16,
    backgroundColor: "#EEE7FF",
    borderRadius: 25,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#8B7CEC",
    fontFamily: "Rubik_500Medium",
  },
});

export default AddFriend;
