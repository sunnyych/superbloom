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
  FlatList,
  Alert,
} from "react-native";
import {
  Swipeable,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";

// font import source: https://www.npmjs.com/package/@expo-google-fonts/source-serif-pro
// if it doesn't work, run dis in terminal "npx expo install @expo-google-fonts/source-serif-pro expo-font expo-app-loading"
import { useSuperbloom } from "@/utils/SuperbloomContext";

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

export default function SuperbloomHome() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const router = useRouter();

  const { requestedDatabase, updateRequestStatus, deleteBloom } =
    useSuperbloom();

  const handleSearch = () => {
    const results = requestedDatabase.filter(
      (bloom) => bloom.celebrated.toLowerCase() === searchQuery.toLowerCase()
    );
    setSearchResults(results);
  };

  const handleRequested = (id) => {
    updateRequestStatus(id);
  };

  const handleDelete = (id) => (
    <View style={styles.deleteContainer}>
      <Text
        style={styles.deleteText}
        onPress={() => deleteBloom(id)} // Trigger deletion
      >
        Delete
      </Text>
    </View>
  );

  const handleViewBloom = (memory_person) => {
    router.push(`tabs/superbloom/exsuperbloom?memory_person=${memory_person}`);
  };

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

  if (fontsLoaded) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>join a superbloom</Text>
        <Text style={styles.subtitle}>search for an event</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Enter a name..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <FontAwesome6 size={14} name="magnifying-glass" color="white" />
          </TouchableOpacity>
        </View>

        {searchResults.length > 0 ? (
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <GestureHandlerRootView>
                <Swipeable renderRightActions={() => handleDelete(item.id)}>
                  <View style={styles.defaultContainer}>
                    <Image source={item.image} style={styles.avatar} />
                    <View style={styles.defaultInfo}>
                      <Text style={styles.defaultName}>
                        Celebrating {item.celebrated}
                      </Text>
                      <Text style={styles.defaultUsername}>
                        Hosted by {item.host}
                      </Text>
                      {item.requested ? (
                        <TouchableOpacity
                          style={styles.openSuperbloomButton}
                          onPress={() => handleViewBloom(item.memory_person)}
                        >
                          <Text style={styles.openSuperbloomText}>
                            open superbloom
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          style={styles.requestButton}
                          onPress={() => handleRequested(item.id)}
                        >
                          <Text style={styles.requestText}>
                            request to join
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                    <View style={styles.date}>
                      <Text style={styles.month}>{item.month}</Text>
                      <Text style={styles.days}>
                        {item.start}-{item.end}
                      </Text>
                    </View>
                  </View>
                </Swipeable>
              </GestureHandlerRootView>
            )}
          />
        ) : (
          <FlatList
            data={requestedDatabase}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <GestureHandlerRootView>
                <Swipeable renderRightActions={() => handleDelete(item.id)}>
                  <View style={styles.defaultContainer}>
                    <Image source={item.image} style={styles.avatar} />
                    <View style={styles.defaultInfo}>
                      <Text style={styles.defaultName}>
                        Celebrating {item.celebrated}
                      </Text>
                      <Text style={styles.defaultUsername}>
                        Hosted by {item.host}
                      </Text>
                      {item.requested ? (
                        <TouchableOpacity
                          style={styles.openSuperbloomButton}
                          onPress={() => handleViewBloom(item.memory_person)}
                        >
                          <Text style={styles.openSuperbloomText}>
                            open superbloom
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          style={styles.requestButton}
                          onPress={() => handleRequested(item.id)}
                        >
                          <Text style={styles.requestText}>
                            request to join
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                    <View style={styles.date}>
                      <Text style={styles.month}>{item.month}</Text>
                      <Text style={styles.days}>
                        {item.start}-{item.end}
                      </Text>
                    </View>
                  </View>
                </Swipeable>
              </GestureHandlerRootView>
            )}
          />
        )}

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
  } else {
    return <Text>loading...</Text>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f4ff",
    padding: 16,
    marginBottom: 120,
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
  defaultContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    backgroundColor: "#dcd6ff",
    borderRadius: 50,
    marginRight: 12,
  },
  defaultInfo: {
    flex: 1,
  },
  defaultName: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Rubik_700Bold",
  },
  defaultUsername: {
    fontSize: 16,
    fontFamily: "Rubik_400Regular",
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
  requestText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Rubik_500Medium",
  },
  date: {
    marginLeft: 10,
  },
  month: {
    textAlign: "center",
    fontSize: 28,
    color: "#3C3661",
    fontWeight: "bold",
    fontFamily: "Rubik_500Medium",
  },
  days: {
    textAlign: "center",
    fontSize: 20,
    color: "#3C3661",
    fontWeight: "bold",
    fontFamily: "Rubik_500Medium",
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
    fontFamily: "Rubik_500Medium",
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
    color: "#8B7CEC",
    flexShrink: 1,
    fontFamily: "Rubik_500Medium",
  },
  deleteContainer: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: "100%",
  },
  deleteText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
