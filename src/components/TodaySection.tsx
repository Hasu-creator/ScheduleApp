import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Task } from "../store/useTaskStore";
import TaskCard from "./TaskCard";
interface Props {
  tasks: Task[];
}

export default function TodaySection({ tasks }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Today’s Task</Text>
        <Text style={styles.seeAll}>See all →</Text>
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskCard
            id={item.id}
            title={item.title}
            time={`${item.startTime} - ${item.endTime}`}
            completed={item.completed}
          />
        )}
        scrollEnabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontFamily: "Inter_700Bold",
  },
  seeAll: {
    fontSize: 14,
    color: "#888",
    fontFamily: "Inter_400Regular",
  },
});
