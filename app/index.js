import { useState } from "react";
import {
  Button,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router"; // Import useRouter for navigation
import { useFonts } from "expo-font"; // Import useFonts for Rubik font
import {
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_700Bold,
} from "@expo-google-fonts/rubik"; // Import Rubik font

import {
  SourceSerifPro_600SemiBold,
  SourceSerifPro_600SemiBold_Italic,
  SourceSerifPro_700Bold,
  SourceSerifPro_700Bold_Italic,
  SourceSerifPro_900Black_Italic,
} from "@expo-google-fonts/source-serif-pro";

export default function Index() {
  const router = useRouter(); // Hook for navigation

  const [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_700Bold,
    SourceSerifPro_600SemiBold,
    SourceSerifPro_600SemiBold_Italic,
    SourceSerifPro_700Bold,
    SourceSerifPro_700Bold_Italic,
    SourceSerifPro_900Black_Italic,
  });

  if (!fontsLoaded) {
    return null; // Wait for fonts to load
  }

  // Function to handle the "Log In" button click
  const handleLogin = () => {
    router.push("/tabs"); // Navigate to the next page (e.g., /tabs)
  };

  // Function for the second button (if needed)
  const handleSecondButton = () => {
    console.log("Second button clicked!");
    // Add logic for the second button click here
  };

  return (
    <View style={styles.container}>
      {/* Display flower logo */}
      <Image source={require("../assets/logo.png")} style={styles.logo} />

      {/* Welcome Text */}
      <Text style={styles.welcomeText}>superbloom</Text>
      <Text style={styles.celebrateText}>
        plant their stories,{"\n"} celebrate life.
      </Text>

      {/* Buttons */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>log in</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondButton}
        onPress={handleSecondButton}
      >
        <Text style={styles.buttonText}>sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8B7CEC", // Purple background
    padding: 20,
  },
  logo: {
    width: 100, // Adjust the width and height based on the logo size you want
    height: 100,
    marginBottom: 30, // Space between logo and text
  },
  welcomeText: {
    fontSize: 32, // Larger text for prominence
    fontWeight: "bold", // Make it bold
    color: "#FFF", // White color for the text
    marginBottom: 10, // Space between "superbloom" and "celebrate life"
    textAlign: "center", // Center-align the text
    fontFamily: "SourceSerifPro_700Bold",
  },
  celebrateText: {
    fontSize: 20, // Smaller size for "celebrate life"
    color: "#492A93", // Set color to #492A93
    fontFamily: "Rubik_500Medium", // Apply Rubik font
    textAlign: "center", // Center-align the text
    marginBottom: 40,
  },
  loginButton: {
    backgroundColor: "#000", // Black background for "Log In" button
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginBottom: 20, // Space between the buttons
    width: "50%",
  },
  secondButton: {
    backgroundColor: "#000", // Black background for the second button
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    width: "50%",
  },
  buttonText: {
    color: "#FFF", // White text color
    fontSize: 18, // Adjust font size
    fontWeight: "bold", // Bold text
    textAlign: "center", // Center-align the button text
  },
});
