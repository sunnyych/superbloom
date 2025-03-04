// local database for superblooms since not that many we need

import mrWhistlerImage from "@/assets/profiles/mr-whistler.jpg";
import johnWhiteImage from "@/assets/profiles/john-white.jpg";

export const database = [
  {
    id: "1",
    celebrated: "Mr. Whistler",
    memory_person: "mr-whistler",
    host: "Myan Ngo",
    description:
      "A celebration of Mr. Whistler's life, 1 year since his passing. He was the best kitty ever. Add memories and moments for friends and family.",
    month: "Dec",
    start: "06",
    end: "17",
    requested: false,
    image: mrWhistlerImage,
  },
  {
    id: "2",
    celebrated: "John White",
    memory_person: "john-white",
    host: "Sunny Yu",
    description:
      "A celebration of John's life, 1 year since his passing. Add memories and moments closer to the start of superbloom date. In meantime, we invite you to populate your own garden.",
    month: "Jan",
    start: "13",
    end: "15",
    requested: false,
    image: johnWhiteImage,
  },
];
