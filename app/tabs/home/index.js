// this should display the outer garden

// on click gate, navigate to outer.js

// on click add button, navigate to newpost.js

// on click the toggle, navigate to collage.js

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  ImageBackground,
} from "react-native";
import Svg, { Path } from "react-native-svg";

export default function HomeGarden() {
  return (
    <ImageBackground
      source={require("../../assets/backgrounds/background garden.svg")}
    ></ImageBackground>
  );
}
