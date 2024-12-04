// "join a superbloom"

// search for an event

// on click "request to join", chaneg button color and text to "open superbloom", and navigate to superbloom.js
import { useState } from "react";
import {
  View,
  Text,
  Button,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";

export default function SuperbloomHome() {
  const router = useRouter();
  const [requested, setRequested] = useState(false);

  const handleRequested = () => {
    setRequested(true);
  };

  // if (fontsLoaded) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>join a superbloom</Text>
      <Text style={styles.subtitle}>search for an event</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Enter a username..."
          //value={searchQuery}
          //onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.searchButton}>
          {/*took out  onPress={handleSearch}*/}
          <Text style={styles.searchButtonText}>🔍</Text>
        </TouchableOpacity>
      </View>
      {/* TO DO: figure out searching,,, for now i just hard code hihi */}
      <View style={styles.resultContainer}>
        <View style={styles.avatar} />
        <View style={styles.resultInfo}>
          <Text style={styles.resultName}>Celebrating Mary</Text>
          <Text style={styles.resultUsername}>Hosted by Helen Smith</Text>
          {requested ? (
            <TouchableOpacity
              style={styles.openSuperbloomButton}
              onPress={() => router.push("tabs/superbloom/exsuperbloom")}
            >
              <Text style={styles.openSuperbloomText}>open superbloom</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.requestButton}
              onPress={handleRequested}
            >
              <Text style={styles.requestTest}>request to join</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.date}>
          <Text style={styles.month}>Nov</Text>
          <Text style={styles.days}>05-13</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.createSuperbloomButton}
        onPress={() => router.push("tabs/superbloom/newbloom")}
      >
        <View style={styles.createSuperbloomIcon}>
          <Image
            source={require("@/assets/icons/icon-superblooms.png")}
            style={styles.superbloomIcon}
          ></Image>
        </View>
        <View style={styles.createSuperbloomTextWrap}>
          <Text style={styles.createSuperbloomText}>create a superbloom</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
  // } else {
  //   return <Text>loading...</Text>;
  // }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f4ff",
    padding: 16,
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
  resultContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  avatar: {
    width: 75,
    height: 75,
    backgroundColor: "#dcd6ff",
    borderRadius: 50,
    marginRight: 12,
  },
  resultInfo: {
    flex: 1,
  },
  resultName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  resultUsername: {
    fontSize: 16,
  },
  requestButton: {
    backgroundColor: "#9d82ff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    borderRadius: 50,
    width: 160,
    marginTop: 5,
  },
  requestTest: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  date: {
    width: 65,
    marginLeft: 15,
  },
  month: {
    textAlign: "center",
    fontSize: 28,
    color: "#3C3661",
    fontWeight: "bold",
  },
  days: {
    textAlign: "center",
    fontSize: 20,
    color: "#3C3661",
    fontWeight: "bold",
  },
  openSuperbloomButton: {
    backgroundColor: "#e6e0ff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 50,
    width: 160,
    marginTop: 5,
  },
  openSuperbloomText: {
    color: "#9d82ff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15,
  },
  createSuperbloomButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#dcd6ff",
    borderRadius: 50,
    padding: 15,
  },
  createSuperbloomIcon: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  superbloomIcon: {
    height: 40,
    width: 40,
  },
  createSuperbloomTextWrap: {
    width: 100,
  },
  createSuperbloomText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#7f7f7f",
    flexShrink: 1,
  },
});
