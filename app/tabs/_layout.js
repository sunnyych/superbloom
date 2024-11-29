// there should be 4 tabs: settings, home, community, and superbloom

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import Theme from "@/assets/theme";
// import { UserProvider } from "@/components/UserContext";

const CustomAddButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.addButtonContainer}>
      <View
        style={{
          width: 80,
          height: 80,
          borderRadius: 100,
          backgroundColor: "#8B7CEC",
          zIndex: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#8B7CEC",
        tabBarShowLabel: false,
        headerShow: false,
        tabBarStyle: styles.navBar,
        tabBarPosition: "bottom",
      }}
    >
      <Tabs.Screen
        name="settings"
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome size={32} name="cog" color={color} />
          ),
          // headerShown: false,
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome size={32} name="home" color={color} />
          ),
          headerShown: false,
          contentStyle: { backgroundColor: "transparent" },
          tabBarInactiveTintColor: "white",
          tabBarActiveTintColor: "#8B7CEC",
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          // headerShown: false,
          tabBarLabel: "Add",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome size={32} name="plus" color={color} />
          ),
          // tabBarButton: (props) => <CustomAddButton {...props} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: "Community",
          tabBarLabel: "Community",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome size={32} name="user" color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="superbloom"
        options={{
          title: "Superbloom",
          tabBarLabel: "Superbloom",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome size={32} name="star" color={color} />
          ),
          // this not working for some rzn,, it's v late for me rn so i leave for later -myan
          // tabBarIcon: ({ size }) => {
          //   return (
          //     <Image
          //       style={{ width: size, height: size }}
          //       source={{
          //         uri: require("@/assets/icon-superblooms.png"),
          //       }}
          //     />
          //   );
          // },
          headerShown: false,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  navBar: {
    // commenting out bc background looks weird ;-; borderRadius: 30,
    backgroundColor: "#0E0835",
    height: 90,
    overflow: "hidden",
    paddingTop: 10,
  },
  addButtonContainer: {
    position: "absolute",

    // zIndex: 10,
  },
});
