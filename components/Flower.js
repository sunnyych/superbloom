import { TouchableOpacity, StyleSheet } from "react-native";
import { useEffect } from "react";

// rendering flowers in garden
import { flowerTypes, colorPalette, renderFlower } from "@/utils/flowerUtils";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const Flower = ({ post, handleFlowerPress }) => {
  // Generate random positions for the flowers
  // const randomTop = getRandomPosition(20, 20); // Adjust the max to control range of vertical positions
  // const randomLeft = getRandomPosition(10, 80); // Adjust the max to control range of horizontal positions
  const { randomTop, randomLeft } = post;

  // Create a shared value for opacity
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(-100); // For initial off-screen position (bounce in from below)

  const randomDuration = Math.random() * (1000 - 500) + 500;

  // Create an animated style
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        { translateY: translateY.value }, // Apply bounce
      ],
    };
  });

  // Start the fade-in animation when the component mounts
  useEffect(() => {
    opacity.value = withTiming(1, { duration: 500 }); // Fade in smoothly
    translateY.value = withTiming(0, { duration: randomDuration }); // Drop down from above with a random duration
  }, [randomDuration]);

  return (
    <TouchableOpacity
      key={post.id}
      style={[
        { position: "absolute", top: randomTop, left: randomLeft },
        styles.glow,
      ]}
      onPress={() =>
        handleFlowerPress(
          post.text,
          post.media,
          post.time_stamp,
          post.flower_type,
          post.flower_color
        )
      }
    >
      <Animated.View style={animatedStyle}>
        {renderFlower(
          flowerTypes[post.flower_type].BloomComponent,
          flowerTypes[post.flower_type].StemComponent,
          post.flower_color,
          "#94CDA0",
          75
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  glow: {
    shadowColor: "#8589ff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
});

export default Flower;
