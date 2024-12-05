import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";
import { flowerTypes, colorPalette, renderFlower } from "@/utils/flowerUtils";
import { format, formatDistanceToNow } from "date-fns";

const postImages = {
  "star.jpg": require("@/assets/posts/star.jpg"),
  "game.jpg": require("@/assets/posts/game.jpg"),
  "cube.jpg": require("@/assets/posts/cube.jpg"),
  "walks.jpg": require("@/assets/posts/walks.jpg"),
  "cat2.jpg": require("@/assets/posts/cat2.jpg"),
  "pancake.jpg": require("@/assets/posts/pancake.jpg"),
  "jimmy2.jpg": require("@/assets/posts/jimmy2.jpg"),
  "tea.jpg": require("@/assets/posts/tea.jpg"),
  "stories.jpg": require("@/assets/posts/stories.jpg"),
  "jimmy1.jpg": require("@/assets/posts/jimmy1.jpg"),
  "baking.jpg": require("@/assets/posts/baking.jpg"),
  "cat1.jpg": require("@/assets/posts/cat1.jpg"),
  "santa_monica.jpg": require("@/assets/posts/santa_monica.jpg"),
  "whiteboard.jpg": require("@/assets/posts/whiteboard.jpg"),
  "book.jpg": require("@/assets/posts/book.jpg"),
  "knitting.jpg": require("@/assets/posts/knitting.jpg"),
  "coffee.jpg": require("@/assets/posts/coffee.jpg"),
  "burger.jpg": require("@/assets/posts/burger.jpg"),
  "soccer.jpg": require("@/assets/posts/soccer.jpg"),
  "sunset.jpg": require("@/assets/posts/sunset.jpg"),
  "matcha.jpg": require("@/assets/posts/matcha.jpg"),
  "hike.jpg": require("@/assets/posts/hike.jpg"),
  "song.jpg": require("@/assets/posts/song.jpg"),
};

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

const PostModal = ({
  visible,
  onClose,
  text,
  media,
  flower_type,
  flower_color,
  timeStamp,
}) => {
  console.log("timeStamp:", timeStamp);
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        {/* Close Button */}
        <TouchableOpacity style={styles.backButton} onPress={onClose}>
          <Text style={styles.backButtonText}>back</Text>
        </TouchableOpacity>

        <View style={styles.popupContent}>
          {/* Flower Icon */}
          <View style={styles.paddedContent}>
            <View style={styles.iconContainer}>
              {renderFlower(
                flowerTypes[flower_type].BloomComponent,
                flowerTypes[flower_type].StemComponent,
                flower_color,
                "#94CDA0",
                60
              )}
            </View>

            {/* Post Text */}
            <Text style={styles.text}>{text}</Text>

            {/* Date */}
            <Text style={styles.date}>{DateFormatter(timeStamp)}</Text>
          </View>
          {/* Image */}
          {media && <Image source={postImages[media]} style={styles.image} />}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)", // dark transparent bg overlay
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
  backButton: {
    position: "absolute",
    left: 20,
    top: 60,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    backgroundColor: "#EEE7FF",
    width: 100,
  },
  backButtonText: {
    color: "#8B7CEC",
    fontSize: 16,
    fontFamily: "Rubik_500Medium",
  },
});

export default PostModal;
