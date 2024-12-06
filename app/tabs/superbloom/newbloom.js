import { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
// ty https://callstack.github.io/react-native-paper/docs/components/RadioButton/
import { RadioButton } from "react-native-paper";
import { useRouter } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
// ty https://www.npmjs.com/package/@react-native-community/datetimepicker
import RNDateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { useSuperbloom } from "@/utils/SuperbloomContext";

export default function NewSuperbloom() {
  const { addBloom } = useSuperbloom();
  const [celebrated, setCelebrated] = useState("");
  const [memory_person, setMemory_person] = useState("");
  const [description, setDescription] = useState("");
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [checked, setChecked] = useState("");
  const [img, setImg] = useState(null);
  const router = useRouter();

  const handleAddStart = (event, date) => {
    if (date) {
      setStart(date);
    }
  };

  const handleAddEnd = (event, date) => {
    if (date) {
      setEnd(date);
    }
  };

  const handleAddBloom = () => {
    setMemory_person(celebrated.toLowerCase());

    const newBloom = {
      id: (Math.random() * 10).toString(),
      celebrated,
      memory_person,
      host: "James Landay",
      description,
      month: start.toLocaleString("default", { month: "long" }).substring(0, 3),
      start: start.getDate(),
      end: end.getDate(),
      requested: true, // bc self made it, so they don't need to request
      image: img,
    };

    addBloom(newBloom);
    setCelebrated("");
    setDescription("");
    setStart(new Date());
    setEnd(new Date());
    router.back();
  };

  // ty https://docs.expo.dev/versions/latest/sdk/imagepicker/
  const pickImage = async () => {
    try {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images", "videos"],
        allowsEditing: true,
        quality: 1,
      });

      console.log(result);

      if (!result.canceled) {
        setImg(result.assets[0]);
      }
    } catch (error) {
      console.error("Error launching image picker:", error);
      Alert.alert("Error", "Something went wrong while picking the image.");
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <SafeAreaView style={styles.container}>
        <View style={styles.closeContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => router.back()}
          >
            <Text style={styles.closeButtonText}>back</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>start a superbloom</Text>
        <Text style={styles.subtitle}>organize a celebration of life</Text>
        <View style={styles.row1}>
          <View>
            <Text style={styles.guideText}>in memory of...</Text>
            <TextInput
              style={styles.celebratedInput}
              placeholder=""
              value={celebrated}
              onChangeText={setCelebrated}
            />
            <Text style={styles.guideText}>description</Text>
          </View>
          <TouchableOpacity style={styles.image} onPress={pickImage}>
            {img ? (
              <Image
                source={img}
                style={styles.uploadedImg}
                onError={(error) =>
                  console.error("Image loading error:", error.nativeEvent.error)
                }
              />
            ) : (
              <MaterialCommunityIcons
                name="file-image-plus-outline"
                size={44}
                color="white"
                style={styles.notUploadedImg}
              />
            )}
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.descriptionInput}
          placeholder=""
          value={description}
          onChangeText={setDescription}
        />
        <View style={styles.row3}>
          <Text style={styles.dateText}>start date</Text>
          <View style={styles.datePickerContainer}>
            <RNDateTimePicker
              value={start}
              mode="date"
              minimumDate={new Date()}
              onChange={handleAddStart}
            />
          </View>
        </View>
        <View style={styles.row4}>
          <Text style={styles.dateText}>end date</Text>
          <View style={styles.datePickerContainer}>
            <RNDateTimePicker
              value={end}
              mode="date"
              minimumDate={new Date()}
              onChange={handleAddEnd}
            />
          </View>
        </View>
        <View style={styles.row5}>
          <View style={styles.visableTitle}>
            <Text style={styles.guideText}>set event visability</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <View style={styles.checkbox}>
              <RadioButton
                value="first"
                status={checked === "first" ? "checked" : "unchecked"}
                onPress={() => setChecked("first")}
                style={styles.checkbox}
              />
            </View>
            <View style={styles.checkbox}>
              <RadioButton
                value="second"
                status={checked === "second" ? "checked" : "unchecked"}
                onPress={() => setChecked("second")}
              />
            </View>
          </View>
          <View style={styles.visableTextContainer}>
            <Text style={styles.visableHeader}>friends</Text>
            <Text style={styles.visableBody}>shown to all friends</Text>
            <Text style={styles.visableHeader}>everyone</Text>
            <Text style={styles.visableBody}>shown in public search</Text>
          </View>
        </View>
        <TouchableOpacity
          style={[
            celebrated ? styles.confirmButton : styles.confirmButtonDisabled,
          ]}
          onPress={handleAddBloom}
          disabled={!celebrated}
        >
          <Text
            style={[
              celebrated
                ? styles.confirmButtonText
                : styles.confirmButtonTextDisabled,
            ]}
          >
            confirm
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f4ff",
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    fontFamily: "SourceSerifPro_700Bold",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#7f7f7f",
    marginBottom: 20,
    fontFamily: "SourceSerifPro_700Bold_Italic",
  },
  closeContainer: {
    marginTop: 20,
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
  guideText: {
    fontSize: 16,
    color: "#6C6C6C",
    fontFamily: "SourceSerifPro_700Bold",
    paddingLeft: 36,
  },
  row1: {
    flexDirection: "row",
  },
  celebratedInput: {
    marginLeft: 36,
    marginTop: 5,
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: "#D1CBE4",
    backgroundColor: "white",
    borderRadius: 20,
    width: 215,
    height: 35,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginLeft: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  uploadedImg: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  notUploadedImg: {
    width: 80,
    height: 80,
    backgroundColor: "#8B7CEC",
    borderRadius: 50,
    padding: 16,
  },
  descriptionInput: {
    marginLeft: 36,
    marginTop: 5,
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: "#D1CBE4",
    backgroundColor: "white",
    borderRadius: 20,
    width: 320,
    height: 90,
  },
  dateText: {
    fontSize: 16,
    color: "#6C6C6C",
    fontFamily: "SourceSerifPro_700Bold",
    paddingLeft: 36,
    paddingTop: 10,
    width: 110,
  },
  datePickerContainer: {
    marginLeft: 16,
    marginTop: 5,
    marginBottom: 15,
    marginLeft: 16,
    borderWidth: 1,
    borderColor: "#D1CBE4",
    backgroundColor: "white",
    borderRadius: 20,
    width: 215,
    height: 35,
  },
  row3: {
    flexDirection: "row",
  },
  row4: {
    flexDirection: "row",
  },
  row5: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  visableTitle: {
    width: 110,
    marginRight: 0,
  },
  visableTextContainer: {},
  checkboxContainer: {
    width: 40,
    marginHorizontal: 15,
  },
  checkbox: {
    borderWidth: 1,
    borderColor: "#D1CBE4",
    backgroundColor: "white",
    borderRadius: 10,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  visableHeader: {
    fontSize: 16,
    fontWeight: "bold",
  },
  visableBody: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#60617C",
    marginBottom: 15,
  },
  confirmButton: {
    backgroundColor: "#8B7CEC",
    marginTop: 30,
    marginRight: 36,
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    width: 100,
    alignSelf: "flex-end",
  },
  confirmButtonDisabled: {
    backgroundColor: "#EAE9ED",
    marginTop: 30,
    marginRight: 36,
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    width: 100,
    alignSelf: "flex-end",
  },
  confirmButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Rubik_500Medium",
  },
  confirmButtonTextDisabled: {
    color: "#CCCCCC",
    fontSize: 16,
    fontFamily: "Rubik_500Medium",
  },
});
