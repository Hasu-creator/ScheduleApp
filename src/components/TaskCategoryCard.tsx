import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ProgressBar from "@/components/ProgressBar";

const screenWidth = Dimensions.get("window").width;
const cardWidth = screenWidth / 2 - 24; // subtract padding/margin for spacing

type Props = {
  title: string;
  description: string;
  progress: number;
  color: string;
};
export default function TaskCategoryCard({
  title,
  description,
  progress,
  color,
}: Props) {
  return (
    <View
      style={[styles.card, { backgroundColor: `${color}10`, width: cardWidth }]}
    >
      <View style={styles.inner}>
        <View>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <Ionicons name="arrow-forward-outline" size={18} color="#555" />
          </View>
          <Text style={styles.description}>{description}</Text>
        </View>
        <ProgressBar progress={progress} color={color} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 14,
    margin: 6,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inner: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#000",
  },
  description: {
    fontSize: 12,
    color: "#555",
  },
});
