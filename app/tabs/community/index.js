import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import Theme from "@/assets/theme";
import {
  useFonts,
  SourceSerifPro_400Regular,
  SourceSerifPro_400Regular_Italic,
  SourceSerifPro_600SemiBold,
  SourceSerifPro_600SemiBold_Italic,
  SourceSerifPro_700Bold,
  SourceSerifPro_700Bold_Italic,
  SourceSerifPro_900Black,
  SourceSerifPro_900Black_Italic,
} from "@expo-google-fonts/source-serif-pro";

const FriendsPage = () => {
  let [fontsLoaded] = useFonts({
    SourceSerifPro_400Regular,
    SourceSerifPro_400Regular_Italic,
    SourceSerifPro_600SemiBold,
    SourceSerifPro_600SemiBold_Italic,
    SourceSerifPro_700Bold,
    SourceSerifPro_700Bold_Italic,
    SourceSerifPro_900Black,
    SourceSerifPro_900Black_Italic,
  });

  const router = useRouter();

  const friends = [
    { name: "Thu Le", username: "@thulium" },
    { name: "Myan Ngo", username: "@mngo" },
    { name: "Sunny Yu", username: "@sunny.ych" },
    { name: "Felicia Yan", username: "@feliciaaa" },
  ];

  const renderFriend = ({ item }) => (
    <View style={styles.friendContainer}>
      <View style={styles.avatar} />
      <View style={styles.friendInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.username}>{item.username}</Text>
      </View>
      <TouchableOpacity style={styles.viewProfileButton}>
        <Text style={styles.viewProfileText}>view profile</Text>
      </TouchableOpacity>
    </View>
  );

  if (fontsLoaded) {
    return (
      <View style={styles.container}>
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
            <Text style={styles.addFriendIconText}>+</Text>
          </View>
          <Text style={styles.addFriendText}>add friend</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return <Text>Loading...</Text>;
  }
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
    marginTop: 70,
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
  },
  avatar: {
    width: 48,
    height: 48,
    backgroundColor: "#dcd6ff",
    borderRadius: 24,
    marginRight: 12,
  },
  friendInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  username: {
    fontSize: 14,
    color: "#7f7f7f",
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
  },
  addFriendButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#dcd6ff",
    borderRadius: 24,
    padding: 16,
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
    color: "#7f7f7f",
  },
});

export default FriendsPage;
