import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Exam, useExamsStore } from "@/store/useExamStore";
import { formatTime, formatDate } from "@/utils/helper";
import ThreeDotMenu from "./ThreeDotMenu";

type Props = {
  item: Exam;
};

const ExamCard = ({ item }: Props) => {
  const deleteExam = useExamsStore((state) => state.deleteExam);
  const handleDelete = () => {
    deleteExam(item.id);
  };
  return (
    <View style={styles.card}>
      <ThreeDotMenu onDelete={handleDelete} />
      <Text style={styles.type}>Exam</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.description}>
        Building: {item.building} - Room: {item.room}
      </Text>
      <Text style={styles.description}>
        During time (In minutes) : {item.duringTime}m
      </Text>
      <Text style={styles.datetime}>
        {formatDate(item.date)} {formatTime(item.startTime)} -{" "}
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

export default ExamCard;
