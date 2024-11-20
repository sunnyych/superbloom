// there should be 4 tabs: settings, home, community, and superbloom

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import Theme from "@/assets/theme";
// import { UserProvider } from "@/components/UserContext";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "red", headerShow: false }}>
      <Tabs.Screen
        name="settings"
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome size={size} name="settings" color={color} />
          ),
          headerShown: false, // Disable the header here to avoid duplication
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome size={size} name="home" color={color} />
          ),
          headerShown: false, // Disable the header here to avoid duplication
        }}
      />
      <Tabs.Screen
        name="community/index"
        options={{
          title: "Community",
          tabBarLabel: "Community",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome size={size} name="user" color={color} />
          ),
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Theme.colors.backgroundPrimary },
          headerTintColor: Theme.colors.textPrimary,
        }}
      />
      <Tabs.Screen
        name="superbloom/index"
        options={{
          title: "Superbloom",
          tabBarLabel: "Superbloom",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome size={size} name="flower" color={color} />
          ),
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Theme.colors.backgroundPrimary },
          headerTintColor: Theme.colors.textPrimary,
        }}
      />
    </Tabs>
  );
}
