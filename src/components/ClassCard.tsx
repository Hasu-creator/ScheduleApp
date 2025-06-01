import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Class } from "@/store/useClassStore";
import { formatTime, formatDate } from "@/utils/helper";
type Props = {
  item: Class;
};

const ClassCard = ({ item }: Props) => {
  return (
    <View style={styles.card}>
      <Text style={styles.type}>Class</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.description}>
        Building: {item.building} - Room: {item.room}
      </Text>
      <Text style={styles.description}>Teacher name: {item.teacherName}</Text>
      <Text style={styles.datetime}>
        {formatDate(item.date)} {formatTime(item.startTime)} -
        {formatTime(item.endTime)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  type: {
    fontSize: 12,
    fontWeight: "600",
    color: "#888",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 6,
  },
  datetime: {
    fontSize: 12,
    color: "#666",
  },
});

export default ClassCard;
