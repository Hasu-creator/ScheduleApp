import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName: any;

          switch (route.name) {
            case "home":
              iconName = "home-outline";
              break;
            case "schedule":
              iconName = "calendar-clear-outline";
              break;
            case "add":
              iconName = "add";
              break;
            case "menu":
              iconName = "grid-outline";
              break;
            case "profile":
              iconName = "person-outline";
              break;
            default:
              iconName = "ellipse";
          }

          if (route.name === "add") {
            return (
              <View style={styles.addButton}>
                <Ionicons name={iconName} size={32} color="white" />
              </View>
            );
          }

          return (
            <Ionicons
              name={iconName}
              size={24}
              color={focused ? "#3979ED" : "#757575"}
            />
          );
        },
        tabBarActiveTintColor: "#3979ED",
        tabBarInactiveTintColor: "#999",
        headerShown: false,
        tabBarStyle: {
          height: 70,
          borderTopWidth: 0.5,
          borderTopColor: "#eee",
        },
        tabBarLabelStyle: {
          display: "none", // Hide text labels
        },
      })}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="schedule" />
      <Tabs.Screen name="add" />
      <Tabs.Screen name="menu" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  addButtonWrapper: {
    top: -20,
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "#3979ED",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
});
