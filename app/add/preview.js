import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useFlower } from "@/utils/FlowerContext";
import { usePost } from "@/utils/PostContext";
import { useSuperbloom } from "@/utils/SuperbloomContext";
import { flowerTypes, renderFlower } from "@/utils/flowerUtils";
import db from "@/databse/db"; 

const hardcodedUsername = "helen-smith";
const hardcodedUserId = 1;
const hardcodedGardenId = 1;
let hardcodedMemoryPerson = "Mary Chen";

const addMemory = async (
  router,
  text,
  media,
  isPublic,
  selectedColor,
  selectedType
) => {
  if (!text) {
    Alert.alert("Error", "Please fill in the memory text.");
    return;
  }

  let mediaUrl = null;

  try {
    if (media) {
      const mediaName = `memory-${Date.now()}`; 
      const { data: uploadData, error: uploadError } = await db.storage
        .from("images")
        .upload(mediaName, {
          uri: media,
          type: "image/jpeg", 
          name: mediaName,
        });

      if (uploadError) {
        console.error("Error uploading media:", uploadError);
        Alert.alert("Error", "Failed to upload media.");
        return;
      }

      const { data: publicData } = db.storage
        .from("images")
        .getPublicUrl(mediaName);
      mediaUrl = publicData.publicUrl;
    }

    const { error } = await db.from("post").insert([
      {
        username: hardcodedUsername,
        user_id: hardcodedUserId,
        garden_id: hardcodedGardenId,
        memory_person: hardcodedMemoryPerson,
        text: text,
        media: mediaUrl, 
        public: isPublic,
        time_stamp: new Date().toISOString(),
        flower_color: selectedColor,
        flower_type: selectedType,
      },
    ]);

    if (error) {
      console.error("Error adding memory:", error);
      Alert.alert("Error", "Failed to add memory.");
    } else {
      router.push("tabs/home/");
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    Alert.alert("Error", "An unexpected error occurred.");
  }
};

const PostPreview = () => {
  const router = useRouter();
  const { text, media, isPublic, setIsPublic } = usePost();
  const { selectedType, selectedColor } = useFlower();
  const { addedSuperbloom, postBloom } = useSuperbloom();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => router.push("tabs/home")}
        >
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>plant a memory</Text>
      <Text style={styles.subtitle}>preview your post</Text>
      <View style={styles.popupContent}>
        <View style={styles.paddedContent}>
          <View style={styles.iconContainer}>
            {renderFlower(
              flowerTypes[selectedType]?.BloomComponent,
              flowerTypes[selectedType]?.StemComponent,
              selectedColor,
              "#94CDA0",
              60
            )}
          </View>

          {/* Post Text */}
          <Text style={styles.text}>{text}</Text>

          {/* Date */}
          <Text style={styles.date}>
            {new Date().toLocaleString("en-US", { hour12: true })}
          </Text>
        </View>
        {/* Image */}
        {media ? (
          <Image source={{ uri: media }} style={styles.image} />
        ) : (
          <Text style={styles.placeholderText}>No image uploaded</Text>
        )}
      </View>
      {/* <View style={styles.post}>
        <View style={styles.previewContainer}>
          {renderFlower(
            flowerTypes[selectedType]?.BloomComponent,
            flowerTypes[selectedType]?.StemComponent,
            selectedColor,
            "#94CDA0",
            60
          )}
        </View>
        <Text style={styles.postText}>{text}</Text>
        <Text style={styles.date}>
          {new Date().toLocaleString("en-US", { hour12: true })}
        </Text>
        {media ? (
          <Image source={{ uri: media }} style={styles.postImage} />
        ) : (
          <Text style={styles.placeholderText}>No image uploaded</Text>
        )}
      </View> */}
      <View style={styles.toggleContainer}>
        <Text style={styles.toggleLabel}>set post {"\n"}visibility</Text>
        <View style={styles.radioGroup}>
          <TouchableOpacity
            style={styles.radioOption}
            onPress={() => setIsPublic(false)}
          >
            <View
              style={[
                styles.radioCircle,
                !isPublic && styles.radioCircleSelected,
              ]}
            />
            <View>
              <Text style={styles.radioLabel}>private</Text>
              <Text style={styles.radioSublabel}>only for you</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.radioOption}
            onPress={() => setIsPublic(true)}
          >
            <View
              style={[
                styles.radioCircle,
                isPublic && styles.radioCircleSelected,
              ]}
            />
            <View>
              <Text style={styles.radioLabel}>public</Text>
              <Text style={styles.radioSublabel}>shown to friends</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.navigationButtons}>
        <TouchableOpacity
          style={[styles.navButton, styles.backButton]}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navButton, styles.nextButton]}
          onPress={() =>
            addMemory(
              router,
              text,
              media,
              isPublic,
              selectedColor,
              selectedType
            )
          }
        >
          <Text style={styles.nextButtonText}>plant</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PostPreview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCF8FE",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#A393EB",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 40,
    fontFamily: "SourceSerifPro_700Bold",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#7f7f7f",
    marginBottom: 20,
    fontFamily: "SourceSerifPro_700Bold_Italic",
  },
  post: {
    marginBottom: 24,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    padding: 16,
  },
  previewContainer: {
    alignItems: "center",
    marginBottom: 12,
  },
  postText: {
    fontSize: 16,
    color: "#7f7f7f",
    lineHeight: 22,
    marginBottom: 12,
  },
  date: {
    fontSize: 14,
    color: "#b0b0b0",
    textAlign: "right",
    marginBottom: 16,
  },
  postImage: {
    width: 300,
    height: 300,
    borderRadius: 12,
    marginTop: 10,
  },
  placeholderText: {
    textAlign: "center",
    color: "#aaa",
    fontSize: 16,
    fontStyle: "italic",
    marginTop: 10,
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    marginTop: "auto",
  },
  navButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  backButton: {
    backgroundColor: "#EEE7FF",
  },
  backButtonText: {
    color: "#8B7CEC",
    fontSize: 16,
    fontFamily: "Rubik_500Medium",
  },
  nextButton: {
    backgroundColor: "#1D1749",
  },
  nextButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Rubik_500Medium",
  },
  popupContent: {
    alignSelf: "center",
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
  toggleContainer: {
    flexDirection: "row",
    marginTop: 16,
    paddingHorizontal: 20,
    alignItems: "center",
    alignSelf: "center",
    gap: 20,
  },
  toggleLabel: {
    fontSize: 16,
    fontFamily: "SourceSerifPro_700Bold_Italic",
    color: "#6C6C6C",
    textAlign: "center",
  },
  radioGroup: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioCircle: {
    height: 25,
    width: 25,
    borderRadius: 5,
    borderWidth: 3,
    borderColor: "#8B7CEC",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  radioCircleSelected: {
    backgroundColor: "#9d82ff",
  },
  radioLabel: {
    fontSize: 16,
    fontFamily: "Rubik_500Medium",
    color: "#333",
  },
  radioSublabel: {
    fontSize: 12,
    fontFamily: "Rubik_500Medium",
    color: "#60617C",
  },
});
