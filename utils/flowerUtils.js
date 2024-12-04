import { React } from "react";
import { View } from "react-native";
import { Svg, SvgProps, SvgXml } from "react-native-svg";

// flower svg files
import DelphiniumFlower from "@/assets/flowers/delphinium flower.svg";
import DelphiniumStem from "@/assets/flowers/delphinium stem.svg";
import LavenderFlower from "@/assets/flowers/lavender flower.svg";
import LavenderStem from "@/assets/flowers/lavender stem.svg";
import SunflowerFlower from "@/assets/flowers/sunflower flower.svg";
import SunflowerStem from "@/assets/flowers/sunflower stem.svg";
import TulipFlower from "@/assets/flowers/tulip flower.svg";
import TulipStem from "@/assets/flowers/tulip stem.svg";

export const flowerTypes = [
  { id: "tulip", BloomComponent: TulipFlower, StemComponent: TulipStem },
  {
    id: "delphinium",
    BloomComponent: DelphiniumFlower,
    StemComponent: DelphiniumStem,
  },
  {
    id: "lavender",
    BloomComponent: LavenderFlower,
    StemComponent: LavenderStem,
  },
  {
    id: "sunflower",
    BloomComponent: SunflowerFlower,
    StemComponent: SunflowerStem,
  },
];

export const stemColor = "#A8E6CF";
export const colorPalette = [
  // row 1
  "#FF8B8B", // coral
  "#FFB981", // peach
  "#FFE281", // yellow
  "#A8F4D6", // mint
  "#81DEFF", // light blue
  // row 2
  "#C4CFFF", // periwinkle
  "#8B9FFF", // blue
  "#B893FF", // lavender
  "#D593FF", // purple
  "#FF93D8", // pink
];
export const renderFlower = (
  BloomComponent,
  StemComponent,
  flowerColor,
  stemColor,
  size
) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 35 61">
      {StemComponent && <StemComponent color={stemColor} />}
      {BloomComponent && <BloomComponent color={flowerColor} />}
    </Svg>
  );
};
