import { useState } from "react";
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
import { flowerTypes, colorPalette, renderFlower } from "@/utils/flowerUtils";
import { useFlower } from "@/utils/FlowerContext";

export default function CustomizeFlowerScreen({ navigation }) {
  const router = useRouter();

  const { selectedType, setSelectedType, selectedColor, setSelectedColor } =
    useFlower();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => router.push("tabs/home")}
        >
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>plant a memory</Text>
        <Text style={styles.subtitle}>customize your flower</Text>
      </View>

      <View style={styles.previewContainer}>
        {renderFlower(
          flowerTypes[selectedType].BloomComponent,
          flowerTypes[selectedType].StemComponent,
          selectedColor,
          "#94CDA0",
          100 // size parameter
        )}
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
              {renderFlower(
                type.BloomComponent,
                type.StemComponent,
                "#434243",
                "#434243",
                40 // smaller size for type selection
              )}
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
          onPress={() => router.push("/add/preview")}
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
    marginTop: 20,
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
    width: "60%",
    height: 150,
    backgroundColor: "white",
    marginBottom: 15,
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
    fontFamily: "Rubik_500Medium",
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
    backgroundColor: "#E8E2FE",
    borderWidth: 4,
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
    borderWidth: 4,
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
});
