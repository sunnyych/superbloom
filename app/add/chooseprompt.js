import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import db from "@/databse/db"; 
import { useRouter } from "expo-router";
import { usePrompt } from "@/utils/PromptContext";

export default function ChoosePrompt() {
  const router = useRouter();
  const { selectedPrompt, setSelectedPrompt } = usePrompt();

  const hardcodedUsername = "helen-smith";
  const hardcodedUserId = 1;
  const hardcodedGardenId = 1;
  const hardcodedMemoryPerson = "John Doe"; 

  const prompts = [
    "What is your favorite memory of Mary?",
    "What did Mary like to do?",
    "Do you have any favorite stories of times you spent with Mary at school?",
    "What is your earliest memory of Mary?",
    "How would you describe Mary's personality?",
  ];

  const goToMakePost = () => {
    setSelectedPrompt(-1);
    router.push("/add/makepost");
  };
  console.log("selected prompt is " + selectedPrompt);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => router.push("tabs/home")}
        >
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.skipButton} onPress={goToMakePost}>
          <Text style={styles.skipButtonText}>skip</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>plant a memory</Text>
        <Text style={styles.subtitle}>choose a prompt</Text>
      </View>

      <ScrollView
        style={styles.promptsContainer}
        showsVerticalScrollIndicator={false}
      >
        {prompts.map((prompt, index) => (
          <Pressable
            key={index}
            style={[
              styles.promptCard,
              selectedPrompt === index && styles.selectedPromptCard,
            ]}
            onPress={() => setSelectedPrompt(index)}
          >
            <Text
              style={[
                styles.promptText,
                selectedPrompt === index && styles.selectedPromptText,
              ]}
            >
              {prompt}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.navigationButtons}>
        <TouchableOpacity
          style={[styles.navButton, styles.backButton]}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.navButton,
            selectedPrompt >= 0 ? styles.nextButton : styles.disabledNextButton,
          ]}
          onPress={() => router.push("/add/makepost")}
          disabled={!selectedPrompt}
        >
          <Text style={styles.nextButtonText}>next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCF8FE",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#A393EB",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: 20,
  },
  skipButton: {
    backgroundColor: "#F0EDFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  skipButtonText: {
    color: "#A393EB",
    fontSize: 16,
    fontFamily: "Rubik_500Medium",
  },
  titleContainer: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
    fontFamily: "SourceSerifPro_700Bold",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    fontFamily: "SourceSerifPro_700Bold_Italic",
  },
  promptsContainer: {
    paddingHorizontal: 20,
  },
  promptCard: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#BEBEBE",
  },
  selectedPromptCard: {
    backgroundColor: "#F4EFFF",
    borderWidth: 3,
    borderColor: "#8B7CEC",
    shadowColor: "#000000",
    shadowOffset: {
      width: 10,
      height: 5,
    },
  },
  promptText: {
    fontSize: 16,
    color: "#000",
    textAlign: "center",
    fontFamily: "Rubik_400Regular",
  },
  selectedPromptText: {
    color: "#8B7CEC",
    fontFamily: "Rubik_400Regular",
  },
  confirmButton: {
    backgroundColor: "#8B7CEC",
    margin: 20,
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
  },
  confirmButtonDisabled: {
    opacity: 0.5,
  },
  confirmButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Rubik_500Medium",
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    marginTop: "auto",
  },
  navButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  backButton: {
    backgroundColor: "#EEE7FF",
  },
  backButtonText: {
    color: "#8B7CEC",
    fontSize: 16,
    fontFamily: "Rubik_500Medium",
  },
  nextButton: {
    backgroundColor: "#8B7CEC",
  },
  nextButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Rubik_500Medium",
  },
  disabledNextButton: {
    backgroundColor: "#EAE9ED",
  },
  disabledNextButtonText: {
    color: "#CCCCCC",
    fontSize: 16,
    fontFamily: "Rubik_500Medium",
  },
});
