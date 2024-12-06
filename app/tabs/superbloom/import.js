import { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Link,
  Image,
  Switch,
  Animated,
  SafeAreaView,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter, useLocalSearchParams } from "expo-router";
import Reposts from "@/app/tabs/superbloom/reposts";

export default function Import() {
  const [importVisable, setVisableImport] = useState(false);
  const router = useRouter();
  const { postIds } = useLocalSearchParams();

  const handleImport = () => {
    setVisableImport(true);
  };

  const handleBack = () => {
    setVisableImport(false);
  };

  const handleAdd = () => {
    router.push("add/chooseprompt");
  };

  return (
    <SafeAreaView style={styles.container}>
      {importVisable ? (
        <View>
          <View>
            <TouchableOpacity style={styles.closeButton} onPress={handleBack}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>import a memory</Text>
          <Text style={styles.subtitle}>repost from your garden</Text>
          <Reposts />
        </View>
      ) : (
        <View>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => router.back()}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>add a memory</Text>
          <Text style={styles.subtitle}>
            contribute to Mr. Whistler's superbloom
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.bigButtons} onPress={handleImport}>
              <Image
                source={require("@/assets/icons/import-mem.png")}
                style={styles.buttonIcon}
                resizeMode={"contain"}
              />
              <Text style={styles.buttonText}>add from a garden</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bigButtons} onPress={handleAdd}>
              <Image
                source={require("@/assets/icons/write-mem.png")}
                style={styles.buttonIcon}
                resizeMode={"contain"}
              />
              <Text style={styles.buttonText}>write a new memory</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FCF8FE",
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 25,
    marginTop: 20,
    backgroundColor: "#A393EB",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: 20,
    fontFamily: "Rubik_500Medium",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 30,
    fontFamily: "SourceSerifPro_700Bold",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#7f7f7f",
    marginBottom: 20,
    fontFamily: "SourceSerifPro_700Bold_Italic",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
  },
  bigButtons: {
    width: 250,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#8B7CEC",
    justifyContent: "center",
    marginBottom: 30,
    flexDirection: "row",
    padding: 16,
  },
  buttonText: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    width: 120,
  },
  buttonIcon: {
    alignSelf: "center",
    height: 40,
    marginRight: 20,
  },
});
