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
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          // headerShown: false,
          tabBarLabel: "Add",
          tabBarIcon: () => (
            // <FontAwesome size={32} name="plus" color={color} />
            <Image
              style={{ width: 80, height: 80 }}
              source={require("@/assets/icons/plus-button.png")}
            />
          ),
          //tabBarButton: (props) => <CustomAddButton {...props} />,
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
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                style={{ width: 32, height: 32 }}
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
    top: -30,

    // zIndex: 10,
  },
});
