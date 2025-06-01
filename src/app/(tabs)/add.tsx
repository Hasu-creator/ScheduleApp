import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import TaskForm from "@/components/TaskForm";
import ClassForm from "@/components/ClassForm";
import ExamForm from "@/components/ExamForm";
const tabOptions = ["Task", "Class", "Exam", "Vacation"];

export default function AddScreen() {
  const [activeTab, setActiveTab] = useState("Task");

  const renderForm = () => {
    switch (activeTab) {
      case "Task":
        return <TaskForm />;
      case "Class":
        return <ClassForm />;
      case "Exam":
        return <ExamForm />;
      default:
        return <TaskForm />;
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={10}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.header}>New {activeTab}</Text>

        <View style={styles.tabs}>
          {tabOptions.map((t) => (
            <TouchableOpacity key={t} onPress={() => setActiveTab(t)}>
              <Text
                style={[styles.tabText, activeTab === t && styles.activeTab]}
              >
                {t}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View>{renderForm()}</View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingBottom: 8,
  },
  tabText: {
    fontSize: 14,
    color: "#999",
  },
  activeTab: {
    color: "#3979ED",
    fontWeight: "bold",
    borderBottomWidth: 2,
    borderColor: "#3979ED",
  },
});
