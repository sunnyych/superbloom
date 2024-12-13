import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Animated,
  StyleSheet,
  Easing,
} from "react-native";
import { globalState } from "@/components/Global";

const GARDEN_DATA = [
  { id: "1", name: "Mary Chen" },
  { id: "2", name: "John White" },
  { id: "3", name: "Mr. Whistler" },
];

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    id: "1",
    name: "Mary Chen",
  });
  const animatedValue = useRef(new Animated.Value(0)).current;

  const toggleDropdown = () => {
    const toValue = isOpen ? 0 : 1;

    Animated.timing(animatedValue, {
      toValue,
      duration: 300,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();

    setIsOpen(!isOpen);
  };

  const selectItem = (item) => {
    setSelectedItem(item);
    globalState.selectedGardenId = parseInt(item.id) + 9; // Update the global state
    toggleDropdown();
  };

  const dropdownHeight = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 150],
  });

  const rotateArrow = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={selectedItem?.id === item.id ? styles.selectedItem : styles.item}
      onPress={() => selectItem(item)}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.itemText,
          selectedItem?.id === item.id && styles.selectedItemText,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={toggleDropdown}
        activeOpacity={0.7}
      >
        <Animated.Text
          style={[styles.arrow, { transform: [{ rotate: rotateArrow }] }]}
        >
          ▼
        </Animated.Text>
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.dropdown,
          {
            opacity: animatedValue,
            transform: [
              {
                scaleY: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }),
              },
            ],
          },
        ]}
      >
        <Text style={styles.subtitleText}>your gardens for</Text>
        <FlatList
          data={GARDEN_DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          bounces={false}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "80%",
    maxWidth: 300,
    zIndex: 1000,
    alignItems: "center",
  },
  label: {
    fontSize: 30,
    color: "#666",
    marginBottom: 8,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    // paddingHorizontal: 5,
    // paddingVertical: 5,
    borderRadius: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: 50,
    height: 50,
    marginTop: -10,
  },
  buttonText: {
    fontSize: 16,
    color: "#333",
  },
  arrow: {
    fontSize: 20,
    color: "#8B7CEC",
  },
  dropdown: {
    position: "absolute",
    top: "100%",
    right: 0,
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#D1CBE4",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: 150,
    padding: 10,
  },
  item: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  itemText: {
    fontSize: 14,
    color: "#969696",
    fontFamily: "Rubik_500Medium",
  },
  selectedItem: {
    backgroundColor: "#EEE7FF",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 20,
  },
  selectedItemText: {
    color: "#6366f1",
    fontWeight: "500",
    fontFamily: "Rubik_500Medium",
  },
  subtitleText: {
    fontFamily: "SourceSerifPro_700Bold",
    color: "#302860",
    textAlign: "center",
    marginBottom: 10,
  },
});
