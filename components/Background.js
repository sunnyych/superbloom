import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
} from "react-native-reanimated";

export default function Background({ translateX, translateY }) {
  // animated styles for moving the background
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withTiming(translateX.value, {
          duration: 1000,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        }),
      },
      {
        translateY: withTiming(translateY.value, {
          duration: 1000,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        }),
      },
    ],
  }));

  console.log("using background component");

  return (
    <View style={StyleSheet.absoluteFillObject}>
      <Animated.Image
        source={require("../assets/backgrounds/background-garden.png")}
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
    backgroundColor: "red",
  },
});
