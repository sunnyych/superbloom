import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

export default function Background({ translateX, translateY }) {
  // Animated styles for moving the background
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: withTiming(translateX.value, { duration: 500 }) },
      { translateY: withTiming(translateY.value, { duration: 500 }) },
    ],
  }));

  return (
    <View style={StyleSheet.absoluteFillObject}>
      <Animated.Image
        source={require("../assets/backgrounds/background garden.png")}
        style={[styles.background, animatedStyle]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "220%",
    height: "220%",
  },
});
