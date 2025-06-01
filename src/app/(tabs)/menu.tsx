import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  View,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTasksStore } from "@/store/useTaskStore";
import { useClassesStore } from "@/store/useClassStore";
import { useExamsStore } from "@/store/useExamStore";
import TaskCard from "@/components/TaskCard";
import ClassCard from "@/components/ClassCard";
import ExamCard from "@/components/ExamCard";
import { formatTime } from "@/utils/helper";
import { Ionicons } from "@expo/vector-icons";

const menuItems = [
  { label: "Task", image: require("../../images/task.png") },
  { label: "Class", image: require("../../images/class.png") },
  { label: "Exam", image: require("../../images/exam.png") },
  { label: "Vacation", image: require("../../images/vacation.png") },
];

export default function MenuScreen() {
  const [selected, setSelected] = useState<string | null>(null);

  const { tasks, fetchTasks } = useTasksStore();
  const { classes, fetchClasses } = useClassesStore();
  const { exams, fetchExams } = useExamsStore();

  useEffect(() => {
    fetchTasks();
    fetchClasses();
    fetchExams();
  }, []);

  const renderItem = ({ item }: { item: (typeof menuItems)[0] }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => setSelected(item.label)}
    >
      <Image source={item.image} style={styles.icon} />
      <Text style={styles.label}>{item.label}</Text>
    </TouchableOpacity>
  );

  const renderContent = () => {
    switch (selected) {
      case "Task":
        return tasks.length === 0 ? (
          <Text style={styles.emptyText}>No tasks available</Text>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              id={task.id}
              title={task.title}
              time={`${formatTime(task.startTime)} - ${formatTime(
                task.endTime
              )}`}
              completed={task.completed}
              description={task.description}
              isContent
            />
          ))
        );
      case "Class":
        return classes.length === 0 ? (
          <Text style={styles.emptyText}>No classes available</Text>
        ) : (
          classes.map((classItem) => (
            <ClassCard key={classItem.id} item={classItem} />
          ))
        );
      case "Exam":
        return exams.length === 0 ? (
          <Text style={styles.emptyText}>No exams available</Text>
        ) : (
          exams.map((examItem) => (
            <ExamCard key={examItem.id} item={examItem} />
          ))
        );
      case "Vacation":
        return <Text style={styles.emptyText}>Enjoy your vacation! 🎉</Text>;
      default:
        return null;
    }
  };

  if (selected) {
    return (
      <LinearGradient colors={["#C5D1FC", "#F7F8FF"]} style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setSelected(null)}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>{selected}</Text>
        <ScrollView contentContainerStyle={styles.content}>
          {renderContent()}
        </ScrollView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={["#C5D1FC", "#F7F8FF"]} style={styles.container}>
      <Text style={styles.title}>Menu</Text>
      <FlatList
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.label}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.grid}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 8,
    alignSelf: "flex-start",
    elevation: 2,
  },
  grid: {
    justifyContent: "center",
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 20,
  },
  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: 3,
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 12,
    resizeMode: "contain",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  content: {
    paddingBottom: 40,
    paddingHorizontal: 10,
  },
  emptyText: {
    textAlign: "center",
    color: "#666",
    fontSize: 16,
    marginTop: 20,
  },
  backBtn: {
    marginBottom: 10,
    marginLeft: 10,
  },
  backText: {
    fontSize: 16,
    color: "#007bff",
  },
});
