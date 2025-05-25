import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { signOut, getAuth } from "firebase/auth";
import { format } from "date-fns";

interface HeaderProps {
  isDate?: boolean;
}

export default function Header({ isDate }: HeaderProps) {
  const today = format(new Date(), "d MMMM yyyy");

  return (
    <View style={styles.container}>
      {isDate ? (
        <View style={styles.header}>
          <Text style={styles.dateText}>{today}</Text>
          <Ionicons name="notifications-outline" size={24} color="#333" />
        </View>
      ) : (
        <>
          <View style={styles.left}>
            <Image
              source={require("../images/avatar.png")}
              style={styles.avatar}
            />
            <View style={styles.textGroup}>
              <Text style={styles.greeting}>Hello!</Text>
              <Text style={styles.name}>Chau Loc</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={28} color="#222" />
          </TouchableOpacity>
        </>
      )}
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
    backgroundColor: "transparent",
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
});
