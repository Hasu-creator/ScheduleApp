import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
interface TaskCardProps {
  id: string;
  title: string;
  time: string;
  completed?: boolean;
  isContent?: boolean;
  description?: string;
}
import { useTasksStore } from "@/store/useTaskStore";
export default function TaskCard({
  id,
  title,
  time,
  completed,
  isContent = false,
  description,
}: TaskCardProps) {
  const completeTask = useTasksStore((state) => state.completeTask);

  return (
    <View style={[styles.card, completed && styles.cardCompleted]}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.timeRow}>
          <Ionicons name="time-outline" size={16} color="#666" />
          <Text style={styles.time}>{time}</Text>
        </View>
        {isContent && (
          <View style={styles.timeRow}>
            <Text style={styles.time}>{description}</Text>
          </View>
        )}
      </View>
      {!isContent ? (
        <TouchableOpacity
          style={[styles.checkbox, completed && styles.checkboxCompleted]}
          onPress={() => completeTask(id)}
        >
          {completed && <Ionicons name="checkmark" size={16} color="#fff" />}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical-outline" size={16} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
  },
  cardCompleted: {
    borderColor: "#3B82F6",
    borderWidth: 1,
  },
  title: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    marginBottom: 4,
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  time: {
    marginLeft: 6,
    color: "#666",
    fontFamily: "Inter_400Regular",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxCompleted: {
    backgroundColor: "#3B82F6",
  },
});
