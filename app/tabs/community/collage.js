// // this is the collage view of the profile

// // update the collage with new post (render every time a post is added to the database)

// // on click toggle, navigate back to garden.js

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
//   Switch,
//   ScrollView,
// } from "react-native";
// import { useRouter, useLocalSearchParams } from "expo-router";

// const Collage = () => {
//   const router = useRouter();
//   const [isToggled, setIsToggled] = useState(true);
//   const { postIds } = useLocalSearchParams();

//   const handleToggle = () => {
//     setIsToggled(!isToggled);
//     if (isToggled) {
//       router.push("/tabs/community/garden");
//     }
//   };

//   const placeholderPosts = [
//     {
//       id: "1",
//       icon: "🌷",
//       text: "John and I were project partners for CS147, and we had a great time making an app about dogs. John was a great designer. This was our HMWs.",
//       date: "04.20.10",
//       image: require("../../../assets/posts/whiteboard.jpg"),
//     },
//     {
//       id: "2",
//       icon: "🌸",
//       text: "John took me to the new matcha place in Palo Alto. Their tarts are good.",
//       date: "Yesterday",
//       image: require("../../../assets/posts/matcha.jpg"),
//     },
//     {
//       id: "3",
//       icon: "🌻",
//       text: "John loved spending time in nature and capturing sunsets. This reminds me of our trip to Yosemite.",
//       date: "05.12.15",
//       image: require("../../../assets/posts/sunset.jpg"),
//     },
//   ];

//   return (
//     <View style={styles.container}>
//       {/* Scrollable Content */}
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         {/* Header */}
//         <View style={styles.header}>
//           <Text style={styles.title}>in memory of</Text>
//           <Text style={styles.subtitle}>John White</Text>
//         </View>

//         {/* Placeholder Posts */}
//         {placeholderPosts.map((item) => (
//           <View key={item.id} style={styles.post}>
//             <View style={styles.iconContainer}>
//               <Text style={styles.icon}>{item.icon}</Text>
//             </View>
//             <Text style={styles.postText}>{item.text}</Text>
//             <Text style={styles.date}>{item.date}</Text>
//             <Image source={item.image} style={styles.postImage} />
//           </View>
//         ))}
//       </ScrollView>

//       {/* Toggle at the Bottom Right */}
//       <View style={styles.toggleContainer}>
//         <Switch
//           trackColor={{ false: "#dcd6ff", true: "#9d82ff" }}
//           thumbColor={isToggled ? "#9d82ff" : "#ffffff"}
//           ios_backgroundColor="#dcd6ff"
//           onValueChange={handleToggle}
//           value={isToggled}
//         />
//         <TouchableOpacity style={styles.toggleIcon}>
//           <Text style={styles.icon}>📰</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f8f4ff",
//     padding: 16,
//   },
//   scrollContainer: {
//     paddingBottom: 80, // Prevent overlap with the toggle
//   },
//   header: {
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 24,
//     color: "#7f7f7f",
//     fontWeight: "bold",
//   },
//   subtitle: {
//     fontSize: 28,
//     color: "#9d82ff",
//     fontWeight: "bold",
//   },
//   post: {
//     marginBottom: 24,
//     backgroundColor: "#ffffff",
//     borderRadius: 12,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//     padding: 16,
//   },
//   iconContainer: {
//     alignItems: "center",
//     marginBottom: 8,
//   },
//   postText: {
//     fontSize: 16,
//     color: "#7f7f7f",
//     lineHeight: 22,
//     marginBottom: 12,
//   },
//   date: {
//     fontSize: 14,
//     color: "#b0b0b0",
//     textAlign: "right",
//     marginBottom: 16,
//   },
//   postImage: {
//     width: "100%",
//     height: 200,
//     borderRadius: 12,
//   },
//   toggleContainer: {
//     position: "absolute",
//     bottom: 16,
//     right: 16,
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   toggleIcon: {
//     marginLeft: 10,
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: "#9d82ff",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   icon: {
//     fontSize: 18,
//     color: "#ffffff",
//   },
// });

// export default Collage;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import db from "@/databse/db"; // Assuming you have your database module

const Collage = () => {
  const router = useRouter();
  const { postIds } = useLocalSearchParams(); // Get post IDs from query params
  const [isToggled, setIsToggled] = useState(true);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState([]);
  const postImages = {
    "star.jpg": require("../../../assets/posts/star.jpg"),
    "game.jpg": require("../../../assets/posts/game.jpg"),
    "cube.jpg": require("../../../assets/posts/cube.jpg"),
    "walks.jpg": require("../../../assets/posts/walks.jpg"),
    "cat2.jpg": require("../../../assets/posts/cat2.jpg"),
    "pancake.jpg": require("../../../assets/posts/pancake.jpg"),
    "jimmy2.jpg": require("../../../assets/posts/jimmy2.jpg"),
    "tea.jpg": require("../../../assets/posts/tea.jpg"),
    "stories.jpg": require("../../../assets/posts/stories.jpg"),
    "jimmy1.jpg": require("../../../assets/posts/jimmy1.jpg"),
    "baking.jpg": require("../../../assets/posts/baking.jpg"),
    "cat1.jpg": require("../../../assets/posts/cat1.jpg"),
    "santa_monica.jpg": require("../../../assets/posts/santa_monica.jpg"),
    "whiteboard.jpg": require("../../../assets/posts/whiteboard.jpg"),
    "book.jpg": require("../../../assets/posts/book.jpg"),
    "knitting.jpg": require("../../../assets/posts/knitting.jpg"),
    "coffee.jpg": require("../../../assets/posts/coffee.jpg"),
    "burger.jpg": require("../../../assets/posts/burger.jpg"),
    "soccer.jpg": require("../../../assets/posts/soccer.jpg"),
    "sunset.jpg": require("../../../assets/posts/sunset.jpg"),
    "matcha.jpg": require("../../../assets/posts/matcha.jpg"),
    "hike.jpg": require("../../../assets/posts/hike.jpg"),
    "song.jpg": require("../../../assets/posts/song.jpg"),
  };

  // Toggle function to navigate back to the garden
  const handleToggle = () => {
    setIsToggled(!isToggled);
    if (isToggled) {
      router.back();
    }
  };

  // Fetch posts based on the postIds passed in the URL
  useEffect(() => {
    const fetchPosts = async () => {
      if (postIds) {
        const ids = postIds.split(","); // Convert the comma-separated string into an array of IDs
        try {
          const { data, error } = await db
            .from("post")
            .select("*")
            .in("id", ids); // Fetch posts based on the received IDs

          if (error) {
            console.error("Error fetching posts:", error.message);
            return;
          }
          setPosts(data || []);
          setName(data.memory_person);
        } catch (err) {
          console.error("Error fetching posts:", err);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchPosts();
  }, [postIds]);

  // Loading state
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#9d82ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>in memory of</Text>
          <Text style={styles.subtitle}>{name}</Text>
        </View>

        {/* Dynamic Posts */}
        {posts.map((item) => (
          <View key={item.id} style={styles.post}>
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>🌷</Text>{" "}
              {/* You can customize icon based on flower type */}
            </View>
            <Text style={styles.postText}>{item.text}</Text>
            <Text style={styles.date}>{item.time_stamp}</Text>
            <Image source={postImages[item.media]} style={styles.postImage} />
          </View>
        ))}
      </ScrollView>

      {/* Toggle at the Bottom Right */}
      <View style={styles.toggleContainer}>
        <Switch
          trackColor={{ false: "#dcd6ff", true: "#9d82ff" }}
          thumbColor={isToggled ? "#9d82ff" : "#ffffff"}
          ios_backgroundColor="#dcd6ff"
          onValueChange={handleToggle}
          value={isToggled}
        />
        <TouchableOpacity style={styles.toggleIcon}>
          <Text style={styles.icon}>📰</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f4ff",
    padding: 16,
  },
  scrollContainer: {
    paddingBottom: 80, // Prevent overlap with the toggle
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: "#7f7f7f",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 28,
    color: "#9d82ff",
    fontWeight: "bold",
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
  iconContainer: {
    alignItems: "center",
    marginBottom: 8,
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
    width: "100%",
    height: 200,
    borderRadius: 12,
  },
  toggleContainer: {
    position: "absolute",
    bottom: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  toggleIcon: {
    marginLeft: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#9d82ff",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: 18,
    color: "#ffffff",
  },
});

export default Collage;
