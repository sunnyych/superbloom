// superbloom main page

// on click back, navigate to index.js

// on click add button, navigate to newpost.js

// on click the toggle, navigate to collage.js
import { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Link,
  Image,
  Switch,
  Animated,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";

export default function Superbloom() {
  const router = useRouter();
  const [isToggled, setIsToggled] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [flowerFadeAnim] = useState(new Animated.Value(0));
  //const [flowerFadeAnim, setFlowerFadeAnim] = useState([]);
  const [showFlowers, setShowFlowers] = useState(false);
  const [flowerPositions, setFlowerPositions] = useState([]);

  useEffect(() => {
    // Fade in the text when the component mounts
    Animated.timing(fadeAnim, {
      toValue: 1, // Make the text fully visible
      duration: 1000, // Animation duration in milliseconds
      useNativeDriver: true,
    }).start();
  }, []);

  const generateRandomPositions = () => {
    const newFlowerPositions = [];
    //const newFlowerFadeAnim = [];

    while (newFlowerPositions.length < 10) {
      const randomX = Math.random() * 300;
      const randomY = Math.random() * 400;

      // Check for overlap
      const overlap = newFlowerPositions.some(
        (position) =>
          Math.abs(position.x - randomX) < 50 &&
          Math.abs(position.y - randomY) < 50
      );

      if (!overlap) {
        newFlowerPositions.push({ x: randomX, y: randomY });
        //newFlowerFadeAnim.push(new Animated.Value(0));
      }
    }
    //setFlowerFadeAnim(newFlowerFadeAnim);
    setFlowerPositions(newFlowerPositions);
    //animateFlowersFadeIn();
  };

  // const animateFlowersFadeIn = () => {
  //   const animations = flowerFadeAnim.map((anim) =>
  //     Animated.timing(anim, {
  //       toValue: 1,
  //       duration: 1000,
  //       useNativeDriver: true,
  //     })
  //   );
  //   //Animated.stagger(200, animations).start();
  // };

  useEffect(() => {
    // Fade in the text when the component mounts
    Animated.timing(flowerFadeAnim, {
      toValue: 1, // Make the text fully visible
      duration: 1000, // Animation duration in milliseconds
      useNativeDriver: true,
    }).start();
  }, []);

  const handleToggle = () => {
    setIsToggled(!isToggled);
    if (!isToggled) {
      // Pass only necessary data, such as post IDs
      const postIds = posts.map((post) => post.id).join(",");
      router.push(`/tabs/superbloom/collage`);
    }
  };

  const handleTap = () => {
    // Fade out the text when the screen is tapped
    Animated.timing(fadeAnim, {
      toValue: 0, // Fade out the text (invisible)
      duration: 100, // Animation duration for fade-out (NOTE TO SELF: CHANGE BACK TO 1000)
      useNativeDriver: true,
    }).start();

    setShowFlowers(true);
    generateRandomPositions();
  };

  const flowers = [
    require("@/assets/flowers/flower0.jpg"),
    require("@/assets/flowers/flower1.jpg"),
    require("@/assets/flowers/flower2.jpg"),
    require("@/assets/flowers/flower3.jpg"),
    require("@/assets/flowers/flower0.jpg"),
    require("@/assets/flowers/flower1.jpg"),
    require("@/assets/flowers/flower2.jpg"),
    require("@/assets/flowers/flower3.jpg"),
  ];

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("@/assets/backgrounds/background-superbloom.png")}
        resizeMode="cover"
        style={styles.background}
      >
        <View style={styles.closeContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => router.back()}
          >
            <Text style={styles.closeButtonText}>back</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.titleContainer}>
          <Image
            source={require("@/assets/profiles/mr-whistler.jpg")}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.titleText}>superbloom for</Text>
            <Text style={styles.name}>Mr. Whistler</Text>
          </View>
        </View>

        <Animated.View
          style={[styles.fadeTextContainer, { opacity: fadeAnim }]}
        >
          <Text style={styles.fadingText}>
            A celebration of Mr. Whistler's life, 1 year since his passing. He
            was the bestest kitty ever.
          </Text>
          <TouchableOpacity onPress={handleTap} style={styles.fadingButton}>
            <Text style={styles.fadingButtonText}>press to start</Text>
          </TouchableOpacity>
        </Animated.View>

        {showFlowers &&
          flowerPositions.map((position, index) => (
            <View style={styles.flowerContainer}>
              <Animated.Image
                key={index}
                source={flowers[index]}
                style={[
                  styles.flowerImage,
                  {
                    left: position.x,
                    top: position.y,
                    opacity: flowerFadeAnim,
                  },
                ]}
                resizeMode={"contain"}
              />
            </View>
          ))}

        <TouchableOpacity
          style={styles.postButtonContainer}
          onPress={() => router.push("tabs/superbloom/import")}
        >
          <View style={styles.postButton}>
            <FontAwesome size={36} name="plus" color="white" />
          </View>
        </TouchableOpacity>
        <View style={styles.toggleContainer}>
          <Switch
            trackColor={{ false: "#dcd6ff", true: "#9d82ff" }}
            thumbColor={isToggled ? "#9d82ff" : "#ffffff"}
            ios_backgroundColor="#dcd6ff"
            onValueChange={handleToggle}
            value={isToggled}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  closeContainer: {
    marginTop: 46,
    marginLeft: 16,
    width: "20%",
  },
  closeButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#EEE7FF",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: "#8B7CEC",
    fontSize: 16,
    fontWeight: "bold",
  },
  titleContainer: {
    margin: 20,
    flexDirection: "row",
  },
  titleText: {
    fontFamily: "SourceSerifPro_700Bold",
    fontSize: 20,
  },
  name: {
    color: "#8B7CEC",
    fontWeight: "bold",
    fontSize: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    backgroundColor: "#dcd6ff",
    borderRadius: 50,
    marginRight: 12,
  },
  fadeTextContainer: {
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "rgba(238, 231, 255, 0.8)",
    marginHorizontal: 20,
    marginTop: 100,
    padding: 16,
    borderRadius: 20,
  },
  fadingText: {
    textAlign: "center",
    color: "#8B7CEC",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    fontFamily: "SourceSerifPro_600SemiBold_Italic",
  },
  fadingButton: {
    width: 150,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#8B7CEC",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  fadingButtonText: {
    color: "#EEE7FF",
    fontSize: 16,
    fontWeight: "bold",
  },
  flowerContainer: {
    position: "absolute",
    top: 300,
  },
  flowerImage: {
    position: "absolute",
    height: 50,
  },
  toggleContainer: {
    position: "absolute",
    bottom: 150,
    left: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  postButtonContainer: {
    position: "absolute",
    right: 15,
    bottom: 135,
  },
  postButton: {
    backgroundColor: "#8B7CEC",
    height: 70,
    width: 70,
    borderRadius: 200,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 2,
    paddingLeft: 1,
    shadowColor: "#8B7CEC",
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8, // Add this property
    elevation: 10,
  },
});
