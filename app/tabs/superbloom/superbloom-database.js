// local database for superblooms since not that many we need

import mrWhistlerImage from "@/assets/profiles/mr-whistler.jpg";
import johnWhiteImage from "@/assets/profiles/john-white.jpg";

export const database = [
  {
    id: "1",
    celebrated: "Mr. Whistler",
    host: "Myan Ngo",
    description:
      "A celebration of Mr. Whistler's life, 1 year since his passing. Add memories and moments for friends and family",
    month: "Dec",
    start: "05",
    end: "07",
    requested: false,
    image: mrWhistlerImage,
  },
  {
    id: "2",
    celebrated: "John White",
    host: "Sunny Yu",
    description:
      "A celebration of John's life, 1 year since his passing. Add memories and moments for friends and family",
    month: "Dec",
    start: "13",
    end: "15",
    requested: false,
    image: johnWhiteImage,
  },
];
