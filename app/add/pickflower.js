import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import Svg, { Path } from "react-native-svg";
// if not working, run npm install react-native-svg

import {
  flowerTypes,
  colorPalette,
  renderFlower,
  stemColor,
} from "@/utils/flowerUtils";
// if not working, run npm install --save-dev react-native-svg-transformer

export default function CustomizeFlowerScreen({ navigation }) {
  const [selectedType, setSelectedType] = useState(0);
  const [selectedColor, setSelectedColor] = useState(colorPalette[0]);
  const selectedFlower = flowerTypes[selectedType];

  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.closeButton}
            accessibilityLabel="Close"
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.clipButton}
            accessibilityLabel="Attach"
          >
            <Text style={styles.clipButtonText}>📎</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>plant a memory</Text>
          <Text style={styles.subtitle}>customize your flower</Text>
        </View>

        <View style={styles.previewContainer}>
          {renderFlower(
            selectedFlower.BloomComponent,
            selectedFlower.StemComponent,
            selectedColor,
            200
          )}
        </View>

        <View style={styles.optionsContainer}>
          <Text style={styles.optionLabel}>types</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.typeOptions}
          >
            {flowerTypes.map((type, index) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.typeButton,
                  selectedType === index && styles.selectedTypeButton,
                ]}
                onPress={() => setSelectedType(index)}
                accessibilityLabel={`Select ${type.id} flower type`}
              >
                {renderFlower(
                  type.BloomComponent,
                  type.StemComponent,
                  selectedType === index ? selectedColor : "#000000",
                  50
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.optionLabel}>colors</Text>
          <View style={styles.colorGrid}>
            {colorPalette.map((color, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.colorButton,
                  { backgroundColor: color },
                  selectedColor === color && styles.selectedColorButton,
                ]}
                onPress={() => setSelectedColor(color)}
                accessibilityLabel={`Select color ${index + 1}`}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.navigationButtons}>
        <TouchableOpacity
          style={[styles.navButton, styles.backButton]}
          onPress={() => navigation.goBack()}
          accessibilityLabel="Go back"
        >
          <Text style={styles.backButtonText}>back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navButton, styles.nextButton]}
          onPress={() => navigation.navigate("NextScreen")}
          accessibilityLabel="Go to next screen"
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
    backgroundColor: "#F8F9FF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
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
  titleContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
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
  previewContainer: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: 175,
    height: 175,
    backgroundColor: "white",
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  optionsContainer: {
    paddingHorizontal: 20,
    marginHorizontal: 40,
  },
  optionLabel: {
    fontSize: 16,
    color: "#000",
    marginBottom: 10,
  },
  typeOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  typeButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  selectedTypeButton: {
    backgroundColor: "#EEE7FF",
    borderWidth: 3,
    borderColor: "#8B7CEC",
  },
  colorGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    marginBottom: 5,
  },
  selectedColorButton: {
    borderWidth: 3,
    borderColor: "#8B7CEC",
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
    backgroundColor: "#F0EDFF",
  },
  backButtonText: {
    color: "#A393EB",
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: "#A393EB",
  },
  nextButtonText: {
    color: "white",
    fontSize: 16,
  },
});
