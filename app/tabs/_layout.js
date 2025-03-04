// there should be 4 tabs: settings, home, community, and superbloom

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { FontAwesome6 } from "@expo/vector-icons";
import { router, Tabs } from "expo-router";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import Theme from "@/assets/theme";
// import { UserProvider } from "@/components/UserContext";

const CustomAddButton = () => {
  return (
    <TouchableOpacity
      onPress={() => router.push("/add")}
      style={styles.addButtonContainer}
    >
      <Image
        style={{ width: 80, height: 80 }}
        source={require("@/assets/icons/plus-button.png")}
      />
    </TouchableOpacity>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#8B7CEC",
        // tabBarShowLabel: false,
        headerShow: false,
        tabBarStyle: styles.navBar,
        tabBarPosition: "bottom",
        tabBarIconStyle: {
          width: 48, // or whatever size you want
          height: 48,
        },
        tabBarLabelStyle: {
          fontFamily: "Rubik_500Medium",
        },
        contentStyle: {
          marginBottom: 120,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome size={40} name="home" color={color} />
          ),
          headerShown: false,
          contentStyle: { backgroundColor: "transparent" },
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: "Community",
          tabBarLabel: "Community",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome6 size={35} name="user-group" color={color} />
          ),
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Theme.colors.backgroundPrimary },
          headerTintColor: Theme.colors.textPrimary,
          headerShown: false,
        }}
      />
      {/* <Tabs.Screen
        name="add"
        options={{
          // headerShown: false,
          tabBarLabel: "Add",
          // tabBarIcon: () => (
          //   // <FontAwesome size={32} name="plus" color={color} />
          //   <Image
          //     style={{ width: 80, height: 80 }}
          //     source={require("@/assets/icons/plus-button.png")}
          //   />
          // ),
          tabBarButton: (props) => <CustomAddButton {...props} />,
          tabBarInactiveTintColor: "white",
          headerShown: false,
          presentation: "modal",
        }}
      /> */}
      <Tabs.Screen
        name="superbloom"
        options={{
          title: "Superbloom",
          tabBarLabel: "Superblooms",
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                style={{ width: 40, height: 40 }}
                // ty https://youtu.be/gPaBicMaib4
                source={
                  focused
                    ? require("@/assets/icons/active-icon-superblooms.png") // Active icon
                    : require("@/assets/icons/icon-superblooms.png") // Inactive icon
                }
              />
            );
          },
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome size={40} name="cog" color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  navBar: {
    position: "absolute",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#0E0835",
    height: 115,
    overflow: "hidden",
    paddingTop: 10,
  },
  addButtonContainer: {
    position: "absolute",
    bottom: 0,
  },
});
