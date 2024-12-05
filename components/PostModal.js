import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";

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

const PostModal = ({ visible, onClose, text, media, timeStamp }) => {
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
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>🌻</Text>
          </View>

          {/* Post Text */}
          <Text style={styles.text}>{text}</Text>

          {/* Date */}
          <Text style={styles.date}>{timeStamp}</Text>

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
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
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
  },
  date: {
    fontSize: 14,
    color: "#a0a0a0",
    textAlign: "right",
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
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
