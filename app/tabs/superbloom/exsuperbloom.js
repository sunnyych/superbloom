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
  ActivityIndicator,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter, useLocalSearchParams } from "expo-router";
import db from "@/databse/db";
import { useSuperbloom } from "@/utils/SuperbloomContext";
import Toggle from "@/components/Toggle";
import Flower from "@/components/Flower";
import { Dimensions } from "react-native";
import PostModal from "@/components/PostModal";

export default function Superbloom() {
  const { requestedDatabase } = useSuperbloom();
  const router = useRouter();

  // these are from my own superbloom-database
  const [celebratedName, setCelebratedName] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState(null);

  const [isToggled, setIsToggled] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [isLoading, setIsLoading] = useState(false);

  const [showFlowers, setShowFlowers] = useState(false);
  const [flowerPositions, setFlowerPositions] = useState([]);
  const { memory_person } = useLocalSearchParams();
  const { width, height } = Dimensions.get("window");

  // Post modal when a flower is clicked
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const getRandomPosition = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await db
          .from("post")
          .select("*")
          .eq("memory_person", memory_person)
          .eq("added_superbloom", true);

        if (error) {
          console.error("Supabase error:", error.message);
          return;
        }
        const postsWithPositions = data.map((post) => ({
          ...post,
          randomTop: getRandomPosition(height * 0.2, height * 0.6), // Random top position
          randomLeft: getRandomPosition(width * 0.1, width * 0.8), // Random left position
        }));
        setFlowerPositions(postsWithPositions);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [memory_person]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#9d82ff" />
      </View>
    );
  }

  useEffect(() => {
    if (!memory_person) {
      console.error("No celebrated value provided.");
      return;
    }

    const matchedBloom = requestedDatabase.find(
      (bloom) =>
        bloom.memory_person.toLowerCase() === memory_person.toLowerCase()
    );

    if (matchedBloom) {
      setDescription(matchedBloom.description);
      setCelebratedName(matchedBloom.celebrated);
      setImg(matchedBloom.image);
      console.log("Found description:", matchedBloom.description);
    } else {
      console.warn("No matching celebrated found in the database.");
    }
  }, [memory_person]);

  useEffect(() => {
    // Fade in the text when the component mounts
    Animated.timing(fadeAnim, {
      toValue: 1, // Make the text fully visible
      duration: 1000, // Animation duration in milliseconds
      useNativeDriver: true,
    }).start();
  }, []);

  const handleFlowerPress = (
    text,
    media,
    time_stamp,
    flower_type,
    flower_color,
    username
  ) => {
    // Navigate to the post page, passing post data
    // router.push(
    //   `/tabs/community/post?text=${text}&media=${media}&time_stamp=${time_stamp}`
    // );
    setSelectedPost({
      text,
      media,
      time_stamp,
      flower_type,
      flower_color,
      username,
    });
    setModalVisible(true);
  };

  const handleToggle = () => {
    const newToggleState = !isToggled;
    setIsToggled(newToggleState);
    if (newToggleState) {
      // Pass only necessary data, such as post IDs
      const postIds = flowerPositions.map((post) => post.id).join(",");
      router.push(`/tabs/superbloom/collage?postIds=${postIds}`);
    }
  };

  const handleImport = () => {
    // const postIds = flowerPositions.map((post) => post.id).join(",");
    // router.push(`/tabs/superbloom/import?postIds=${postIds}`);
    router.push(`/tabs/superbloom/import`);
  };

  const handleTap = () => {
    Animated.timing(fadeAnim, {
      toValue: 0, // Fade out the text (invisible)
      duration: 100,
      useNativeDriver: true,
    }).start();

    setShowFlowers(true);
  };

  const handleBack = () => {
    setModalVisible(false); // Close the modal
    setTimeout(() => setSelectedPost(null), 100);
  };

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
          <Image source={img} style={styles.avatar} />
          <View>
            <Text style={styles.titleText}>superbloom for</Text>
            <Text style={styles.name}>{celebratedName}</Text>
          </View>
        </View>

        <Animated.View
          style={[styles.fadeTextContainer, { opacity: fadeAnim }]}
        >
          <Text style={styles.fadingText}>{description}</Text>
          {memory_person === "mr-whistler" && (
            <TouchableOpacity onPress={handleTap} style={styles.fadingButton}>
              <Text style={styles.fadingButtonText}>press to start</Text>
            </TouchableOpacity>
          )}
        </Animated.View>

        {showFlowers && (
          <View style={styles.flowerContainer}>
            {flowerPositions.map((post) => {
              return (
                <Flower
                  key={post.id}
                  post={post}
                  handleFlowerPress={handleFlowerPress}
                />
              );
            })}
          </View>
        )}

        {modalVisible && selectedPost && (
          <PostModal
            visible={modalVisible}
            onClose={handleBack} // Close the modal
            text={selectedPost.text} // Pass the selected post's data
            username={selectedPost.username}
            media={selectedPost.media}
            timeStamp={selectedPost.time_stamp}
            flower_color={selectedPost.flower_color}
            flower_type={selectedPost.flower_type}
          />
        )}

        {memory_person === "mr-whistler" && (
          <TouchableOpacity
            style={styles.postButtonContainer}
            onPress={handleImport}
          >
            <View style={styles.postButton}>
              <FontAwesome size={36} name="plus" color="white" />
            </View>
          </TouchableOpacity>
        )}

        {memory_person === "mr-whistler" && (
          <View style={styles.toggleContainer}>
            <Toggle onToggle={handleToggle} isEnabled={isToggled} />
          </View>
        )}
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
    top: 100,
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
