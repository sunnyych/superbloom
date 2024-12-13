import React from "react";
import { FontAwesome6 } from "@expo/vector-icons";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import Theme from "@/assets/theme";

const FriendsPage = () => {
  const router = useRouter();

  const imageMapping = {
    "Thu Le": require("../../../assets/pfps/thu.jpg"),
    "Myan Ngo": require("../../../assets/pfps/myan.jpg"),
    "Sunny Yu": require("../../../assets/pfps/sunny.jpg"),
    "Felicia Yan": require("../../../assets/pfps/felicia.jpg"),
  };

  const friends = [
    {
      name: "Thu Le",
      username: "@thulium",
      image: "../../../assets/pfps/thu.jpg",
    },
    {
      name: "Myan Ngo",
      username: "@mngo",
      image: "../../../assets/pfps/myan.jpg",
    },
    {
      name: "Sunny Yu",
      username: "@sunny.ych",
      image: "../../../assets/pfps/sunny.jpg",
    },
    {
      name: "Felicia Yan",
      username: "@feliciaaa",
      image: "../../../assets/pfps/felicia.jpg",
    },
  ];

  const renderFriend = ({ item }) => (
    <View style={styles.friendContainer}>
      <View style={styles.avatar}>
        {/* Render the image */}
        <Image
          source={imageMapping[item.name]} // Dynamically load the image
          style={styles.avatarImage}
        />
      </View>
      <View style={styles.friendInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.username}>{item.username}</Text>
      </View>
      <TouchableOpacity
        style={styles.viewProfileButton}
        onPress={() =>
          router.push(
            `/tabs/community/profile?username=${item.username.replace("@", "")}`
          )
        } // Navigate to profile page
      >
        <Text style={styles.viewProfileText}>view profile</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>friends</Text>
      <Text style={styles.subtitle}>visit a friend’s gardens</Text>
      <FlatList
        data={friends}
        renderItem={renderFriend}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.list}
      />
      <TouchableOpacity
        style={styles.addFriendButton}
        onPress={() => router.push("/tabs/community/add_friend")}
      >
        <View style={styles.addFriendIcon}>
          <FontAwesome6 size={20} name="user-plus" color="white" />
        </View>
        <Text style={styles.addFriendText}>add friend</Text>
      </TouchableOpacity>
    </SafeAreaView>
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
  list: {
    paddingBottom: 100,
  },
  friendContainer: {
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
    margin: 30,
  },
  avatar: {
    width: 48,
    height: 48,
    backgroundColor: "#dcd6ff",
    borderRadius: 24,
    marginRight: 12,
  },
  avatarImage: {
    width: "100%", // Takes up the entire width of the avatar container
    height: "100%", // Takes up the entire height of the avatar container
    resizeMode: "cover", // Ensures the image fills the circle without stretching
    borderRadius: 24, // Rounds the corners of the image
  },
  friendInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Rubik_500Medium",
  },
  username: {
    fontSize: 14,
    color: "#7f7f7f",
    fontFamily: "Rubik_500Medium",
  },
  viewProfileButton: {
    backgroundColor: "#9d82ff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  viewProfileText: {
    color: "#fff",
    fontWeight: "bold",
    fontFamily: "Rubik_500Medium",
  },
  addFriendButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#dcd6ff",
    borderRadius: 50,
    padding: 10,
  },
  addFriendIcon: {
    backgroundColor: "#9d82ff",
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  addFriendIconText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  addFriendText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#8B7CEC",
    fontFamily: "Rubik_500Medium",
  },
});

export default FriendsPage;
