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
} from "react-native";
import { useRouter } from "expo-router";

export default function Superbloom() {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("@/assets/backgrounds/background-superbloom.png")}
        resizeMode="cover"
        style={styles.background}
      >
        <Text>hi hehe</Text>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: "center",
  },
});
