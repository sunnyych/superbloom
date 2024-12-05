import { FontAwesome6 } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Animated, StyleSheet } from "react-native";

const Toggle = ({ onToggle, isEnabled, disabled = false }) => {
  const [animation] = useState(new Animated.Value(isEnabled ? 1 : 0));

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isEnabled ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isEnabled]);

  const toggleSwitch = () => {
    onToggle?.(!isEnabled);
  };

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 28],
  });

  const iconOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const iconScale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.5],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.toggleContainer, isEnabled && styles.toggleContainerOn]}
        onPress={toggleSwitch}
        activeOpacity={0.8}
      >
        <Animated.View style={[styles.toggle, { transform: [{ translateX }] }]}>
          <Animated.View
            style={[
              styles.iconWrapper,
              { opacity: iconOpacity, transform: [{ scale: iconScale }] },
            ]}
          >
            <FontAwesome6
              size={18}
              name="seedling"
              color={isEnabled ? "#8b5cf6" : "#FFF"}
            />
          </Animated.View>
          <Animated.View
            style={[
              styles.iconWrapper,
              { opacity: animation, transform: [{ scale: animation }] },
            ]}
          >
            <FontAwesome6
              size={20}
              name="newspaper"
              color={isEnabled ? "#FFF" : "#8b5cf6"}
            />
          </Animated.View>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1000,
  },
  toggleContainer: {
    width: 75,
    height: 30,
    borderRadius: 16,
    padding: 2,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderWidth: 1,
    borderColor: "#EEE7FF",
    justifyContent: "center",
  },
  toggleContainerOn: {
    backgroundColor: "#C5B9EE",
  },
  toggle: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: "#8B7CEC",
    justifyContent: "center",
    alignItems: "center",
  },
  iconWrapper: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Toggle;
