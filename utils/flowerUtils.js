import { React } from "react";
import { View } from "react-native";
import { SvgProps, SvgXml } from "react-native-svg";

// flower svg files
import DelphiniumFlowerSvg from "@/assets/flowers/delphinium flower.svg";
import DelphiniumStemSvg from "@/assets/flowers/delphinium stem.svg";
import LavenderFlowerSvg from "@/assets/flowers/lavender flower.svg";
import LavenderStemSvg from "@/assets/flowers/lavender stem.svg";
import SunflowerFlowerSvg from "@/assets/flowers/sunflower flower.svg";
import SunflowerStemSvg from "@/assets/flowers/sunflower stem.svg";
import TulipFlowerSvg from "@/assets/flowers/tulip flower.svg";
import TulipStemSvg from "@/assets/flowers/tulip stem.svg";

// convert to svg from xml with react-native-svg
const TulipFlower = (props) => <SvgXml xml={TulipFlowerSvg} {...props} />;
const TulipStem = (props) => <SvgXml xml={TulipStemSvg} {...props} />;
const DelphiniumFlower = (props) => (
  <SvgXml xml={DelphiniumFlowerSvg} {...props} />
);
const DelphiniumStem = (props) => <SvgXml xml={DelphiniumStemSvg} {...props} />;
const LavenderFlower = (props) => <SvgXml xml={LavenderFlowerSvg} {...props} />;
const LavenderStem = (props) => <SvgXml xml={LavenderStemSvg} {...props} />;
const SunflowerFlower = (props) => (
  <SvgXml xml={SunflowerFlowerSvg} {...props} />
);
const SunflowerStem = (props) => <SvgXml xml={SunflowerStemSvg} {...props} />;

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
  bloomColor,
  size = 100
) => {
  return (
    <View style={{ width: size, height: size }}>
      <StemComponent
        width="100%"
        height="100%"
        fill={stemColor}
        style={{ position: "absolute" }}
      />
      <BloomComponent
        width="100%"
        height="100%"
        fill={bloomColor}
        style={{ position: "absolute" }}
      />
    </View>
  );
};
