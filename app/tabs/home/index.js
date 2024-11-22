// this should display the outer garden

// on click gate, navigate to outer.js

// on click add button, navigate to newpost.js

// on click the toggle, navigate to collage.js
import { useBackground } from "./_layout";
import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";
import Background from "@/components/Background"; // Import the Background component

export default function OuterGarden() {
  const router = useRouter();
  const { translateX, translateY } = useBackground();

  const goToInner = () => {
    router.push("/tabs/home/inner");
    translateX.value = -200; // Reset background position
    translateY.value = -450;
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <Background translateX={translateX} translateY={translateY} /> */}

      <Text>Outer Garden</Text>

      <Button title="Go to Inner Garden" onPress={goToInner} />
    </View>
  );
}

// export default function HomeGarden() {
//   return (
//     <ImageBackground
//       source={require("../../../assets/backgrounds/background garden.png")}
//       style={styles.backgroundImage}
//       imageStyle={styles.publicBackgroundImage}
//     >
//       <View style={styles.container}></View>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   backgroundImage: {
//     flex: 1,
//   },
//   container: {
//     flex: 1,
//   },
// });
