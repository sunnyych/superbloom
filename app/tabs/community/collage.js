import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import db from "@/databse/db"; // Assuming you have your database module
import Toggle from "@/components/Toggle";
import { flowerTypes, colorPalette, renderFlower } from "@/utils/flowerUtils";
import { format, formatDistanceToNow } from "date-fns";

const DateFormatter = (isoDate) => {
  const date = new Date(isoDate);

  // Format as "October 23, 2024"
  const formattedDate = format(date, "MMMM d, yyyy");

  // Format as "2 hours ago"
  const relativeTime = formatDistanceToNow(date, { addSuffix: true });

  const words = relativeTime.split(" ");
  const timeScale = words.length > 1 ? words[words.length - 2] : null;
  if (timeScale === "days" || timeScale === "hours") {
    return relativeTime;
  }
  return formattedDate;
};

const postImages = {
  "star.jpg": require("../../../assets/posts/star.jpg"),
  "game.jpg": require("../../../assets/posts/game.jpg"),
  "cube.jpg": require("../../../assets/posts/cube.jpg"),
  "walks.jpg": require("../../../assets/posts/walks.jpg"),
  "cat2.jpg": require("../../../assets/posts/cat2.jpg"),
  "pancake.jpg": require("../../../assets/posts/pancake.jpg"),
  "jimmy2.jpg": require("../../../assets/posts/jimmy2.jpg"),
  "tea.jpg": require("../../../assets/posts/tea.jpg"),
  "stories.jpg": require("../../../assets/posts/stories.jpg"),
  "jimmy1.jpg": require("../../../assets/posts/jimmy1.jpg"),
  "baking.jpg": require("../../../assets/posts/baking.jpg"),
  "cat1.jpg": require("../../../assets/posts/cat1.jpg"),
  "santa_monica.jpg": require("../../../assets/posts/santa_monica.jpg"),
  "whiteboard.jpg": require("../../../assets/posts/whiteboard.jpg"),
  "book.jpg": require("../../../assets/posts/book.jpg"),
  "knitting.jpg": require("../../../assets/posts/knitting.jpg"),
  "coffee.jpg": require("../../../assets/posts/coffee.jpg"),
  "burger.jpg": require("../../../assets/posts/burger.jpg"),
  "soccer.jpg": require("../../../assets/posts/soccer.jpg"),
  "sunset.jpg": require("../../../assets/posts/sunset.jpg"),
  "matcha.jpg": require("../../../assets/posts/matcha.jpg"),
  "hike.jpg": require("../../../assets/posts/hike.jpg"),
  "song.jpg": require("../../../assets/posts/song.jpg"),
};

const localImages = {
  "john-white": require("../../../assets/profiles/john-white.jpg"),
  "mike-smith": require("../../../assets/profiles/mike-smith.jpg"),
  "susan-brown": require("../../../assets/profiles/susan-brown.jpg"),
  "jack-fan": require("../../../assets/profiles/jack-fan.jpg"),
  "mr-whistler": require("../../../assets/profiles/mr-whistler.jpg"),
  "isa-bella": require("../../../assets/profiles/isa-bella.jpg"),
  "jimmy-d": require("../../../assets/profiles/jimmy-d.jpg"),
  "peter-snake": require("../../../assets/profiles/peter-snake.jpg"),
  "caroline-meyer": require("../../../assets/profiles/caroline-meyer.jpg"),
};

const Collage = () => {
  const router = useRouter();
  const { postIds } = useLocalSearchParams(); // Get post IDs from query params
  const [isToggled, setIsToggled] = useState(true);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState(null);

  // Toggle function to navigate back to the garden
  const handleToggle = () => {
    const newToggleState = !isToggled;
    setIsToggled(newToggleState);

    if (!newToggleState) {
      router.back();
    }
  };

  // Fetch posts based on the postIds passed in the URL
  useEffect(() => {
    const fetchPosts = async () => {
      if (postIds) {
        const ids = postIds.split(","); // Convert the comma-separated string into an array of IDs
        try {
          const { data, error } = await db
            .from("post")
            .select("*")
            .in("id", ids); // Fetch posts based on the received IDs

          if (error) {
            console.error("Error fetching posts:", error.message);
            return;
          }
          setPosts(data || []);
          setName(data[0].memory_person);
          console.log("name", name);
        } catch (err) {
          console.error("Error fetching posts:", err);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchPosts();
  }, [postIds]);

  // const handleFlowerPress = (
  //   text,
  //   media,
  //   time_stamp,
  //   flower_type,
  //   flower_color
  // ) => {
  //   // Navigate to the post page, passing post data
  //   router.push(
  //     `/tabs/community/post?text=${text}&media=${media}&time_stamp=${time_stamp}&flower_type=${flower_type}&flower_color=${flower_color}`
  //   );
  // };

  // Loading state
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#9d82ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Image style={styles.profilePic} source={localImages[name]} />
        </View>
        <View>
          <Text style={styles.title}>in memory of</Text>
          <Text style={styles.subtitle}>{name}</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {posts.map((item) => (
          <View key={item.id} style={styles.popupContent}>
            <View style={styles.paddedContent}>
              <View style={styles.iconContainer}>
                {renderFlower(
                  flowerTypes[item.flower_type].BloomComponent,
                  flowerTypes[item.flower_type].StemComponent,
                  item.flower_color,
                  "#94CDA0",
                  60
                )}
              </View>

              {/* Post Text */}
              <Text style={styles.text}>{item.text}</Text>

              {/* Date */}
              <Text style={styles.date}>{DateFormatter(item.time_stamp)}</Text>
            </View>
            {/* Image */}
            {postImages[item.media] ? (
              <Image source={postImages[item.media]} style={styles.image} />
            ) : null}
          </View>
        ))}
      </ScrollView>

      <View style={styles.toggleContainer}>
        <Toggle onToggle={handleToggle} isEnabled={isToggled} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f4ff",
    padding: 16,
  },
  scrollContainer: {
    paddingBottom: 80,
    alignItems: "center",
    gap: 10,
  },
  header: {
    alignItems: "center",
    marginTop: 65,
    marginBottom: 20,
    marginHorizontal: 20,
    flexDirection: "row",
    // gap: 20,
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 20,
    color: "#A896E8",
    fontFamily: "SourceSerifPro_700Bold",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 24,
    color: "#9d82ff",
    fontWeight: "bold",
    fontFamily: "Rubik_700Bold",
  },
  toggleContainer: {
    position: "absolute",
    bottom: 16,
    left: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 120,
  },
  toggleIcon: {
    marginLeft: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#9d82ff",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: 18,
    color: "#ffffff",
  },
  popupContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  paddedContent: {
    padding: 20,
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 12,
  },
  icon: {
    fontSize: 28,
  },
  text: {
    fontSize: 16,
    color: "#4a4a4a",
    lineHeight: 22,
    marginBottom: 16,
    fontFamily: "Rubik_400Regular",
  },
  date: {
    fontSize: 14,
    color: "#a0a0a0",
    textAlign: "right",
    marginBottom: 16,
    fontFamily: "Rubik_500Medium",
  },
  image: {
    width: "100%",
    height: 250,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileContainer: {
    shadowColor: "#202020",
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 1,
  },
  profilePic: {
    height: 70,
    width: 70,
    borderRadius: 1000,
    borderColor: "#FFFFFF",
    borderWidth: 4,
    resizeMode: "cover",
    backgroundColor: "#FFFFFF",
    marginRight: 15,
  },
  dropdown: {
    position: "absolute",
    right: 0,
  },
});

export default Collage;
