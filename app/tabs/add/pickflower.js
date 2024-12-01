import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import Svg, { Path } from "react-native-svg";
// if not working, run npm install react-native-svg

// flower svgs
const flowerTypes = [
  {
    id: "tulip",
    path: "M10 30 C10 10 90 10 90 30 L50 90 Z", // Simplified example path
  },
  {
    id: "rose",
    path: "M10 30 C10 10 90 10 90 30 C90 50 10 50 10 30", // Simplified example path
  },
  {
    id: "daisy",
    path: "M50 50 L90 50 M50 50 L10 50 M50 50 L50 10 M50 50 L50 90", // Simplified example path
  },
  {
    id: "lily",
    path: "M10 90 Q50 10 90 90", // Simplified example path
  },
];

const colorPalette = [
  // row 1
  "#FF8B8B", // coral
  "#FFB981", // peach
  "#FFE281", // yellow
  "#A8F4D6", // mint
  "#81DEFF", // light blue
  // row 1
  "#C4CFFF", // periwinkle
  "#8B9FFF", // blue
  "#B893FF", // lavender
  "#D593FF", // purple
  "#FF93D8", // pink
];

export default function CustomizeFlowerScreen({ navigation }) {
  const [selectedType, setSelectedType] = useState(0);
  const [selectedColor, setSelectedColor] = useState(colorPalette[0]);
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>plant a memory</Text>
        <Text style={styles.subtitle}>customize your flower</Text>
      </View>

      <View style={styles.previewContainer}>
        <Svg width={150} height={150} viewBox="0 0 100 100">
          <Path
            d={flowerTypes[selectedType].path}
            fill={selectedColor}
            stroke="#000"
            strokeWidth="1"
          />
        </Svg>
      </View>

      <View style={styles.optionsContainer}>
        <Text style={styles.optionLabel}>types</Text>
        <View style={styles.typeOptions}>
          {flowerTypes.map((type, index) => (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.typeButton,
                selectedType === index && styles.selectedTypeButton,
              ]}
              onPress={() => setSelectedType(index)}
            >
              <Svg width={30} height={30} viewBox="0 0 100 100">
                <Path d={type.path} fill="#000" />
              </Svg>
            </TouchableOpacity>
          ))}
        </View>

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
            />
          ))}
        </View>
      </View>

      <View style={styles.navigationButtons}>
        <TouchableOpacity
          style={[styles.navButton, styles.backButton]}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navButton, styles.nextButton]}
          onPress={() => router.push("/tabs/home")}
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
  clipButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F0EDFF",
    justifyContent: "center",
    alignItems: "center",
  },
  clipButtonText: {
    fontSize: 20,
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
  previewContainer: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: "75%",
    height: 150,
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
    marginHorizontal: 30,
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
    backgroundColor: "#A393EB",
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
    borderColor: "#A393EB",
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
