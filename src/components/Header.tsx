import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "expo-router";
export default function Header() {
  const { signOut } = useAuth();
  const route = useRouter();
  const handleSignOut = async () => {
    await signOut();
    route.replace("/login");
  };
  return (
    <View style={styles.container}>
      {/* Left side: Avatar + Greeting */}
      <View style={styles.left}>
        <Image source={require("../images/avatar.png")} style={styles.avatar} />
        <View style={styles.textGroup}>
          <Text style={styles.greeting}>Hello!</Text>
          <Text style={styles.name}>Chau Loc</Text>
        </View>
      </View>

      {/* Right side: Notification bell */}
      <TouchableOpacity onPress={handleSignOut}>
        <Ionicons name="notifications-outline" size={28} color="#222" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  textGroup: {
    justifyContent: "center",
  },
  greeting: {
    fontSize: 14,
    color: "#444",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
});
