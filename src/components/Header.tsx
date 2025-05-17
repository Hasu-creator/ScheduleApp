import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useNavigation } from "expo-router";

type HeaderProps = {
  title: string;
  showBackButton?: boolean;
};

export default function Header({ title, showBackButton = false }: HeaderProps) {
  const navigation = useNavigation();
  const router = useRouter();

  return (
    <View style={styles.container}>
      {showBackButton ? (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.left}
        >
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
      ) : (
        <View style={styles.left} />
      )}
      <Text style={styles.title}>{title}</Text>
      <View style={styles.right} /> {/* Reserved for future right icon */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    backgroundColor: "transparent",
    marginTop: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Inter_600SemiBold",
    textAlign: "center",
    flex: 1,
  },
  left: {
    width: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  right: {
    width: 40,
    justifyContent: "center",
    alignItems: "flex-end",
  },
});
