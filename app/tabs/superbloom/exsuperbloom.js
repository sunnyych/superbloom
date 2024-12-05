// superbloom main page

// on click back, navigate to index.js

// on click add button, navigate to newpost.js

// on click the toggle, navigate to collage.js
import { useState } from "react";
import {
  View,
  Text,
  Button,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";

export default function Superbloom() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("@/assets/backgrounds/background-superbloom.png")}
        resizeMode="cover"
        style={styles.background}
      >
        <View style={styles.closeContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => router.back()}
          >
            <Text style={styles.closeButtonText}>back</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  closeContainer: {
    marginTop: 46,
    marginLeft: 16,
    width: "20%",
  },
  closeButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#EEE7FF",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: "#8B7CEC",
    fontSize: 16,
    fontWeight: "bold",
  },
});
