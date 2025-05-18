import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Modal,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { useTasksStore } from "@/store/useTaskStore";

export default function AddTaskScreen() {
  const router = useRouter();
  const addTask = useTasksStore((state) => state.addTask);
  const [tab, setTab] = useState("Tasks");
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [taskType, setTaskType] = useState("");

  const [showTypeModal, setShowTypeModal] = useState(false);

  const [date, setDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [startTime, setStartTime] = useState<Date | null>(null);
  const [showStartPicker, setShowStartPicker] = useState(false);

  const [endTime, setEndTime] = useState<Date | null>(null);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const handleResetState = () => {
    setTaskName("");
    setDescription("");
    setTaskType("");
    setDate(null);
    setStartTime(null);
    setEndTime(null);
  };

  const handleSave = () => {
    if (!taskName || !date || !startTime || !endTime) {
      Alert.alert("Please fill in all required fields.");
      return;
    }

    addTask({
      id: Date.now().toString(),
      title: taskName,
      description,
      type: taskType || tab,
      date: date.toISOString(),
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      completed: false,
    });

    handleResetState();
    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={10}
    >
      <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>New Task</Text>

        {/* Tabs */}
        <View style={styles.tabs}>
          {["Tasks", "Classes", "Exams", "Vacations"].map((t) => (
            <TouchableOpacity key={t} onPress={() => setTab(t)}>
              <Text style={[styles.tabText, tab === t && styles.activeTab]}>
                {t}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Inputs */}
        <Text style={styles.label}>Task Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Task Title"
          value={taskName}
          onChangeText={setTaskName}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Task Description"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <Text style={styles.label}>Type</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowTypeModal(true)}
        >
          <Text>{taskType || "Select task type"}</Text>
          <Ionicons name="chevron-down-outline" size={20} />
        </TouchableOpacity>
        <Modal transparent visible={showTypeModal} animationType="fade">
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setShowTypeModal(false)}
          >
            <View style={styles.modalContent}>
              {["Assignment", "Reminder", "Revision"].map((option) => (
                <TouchableOpacity
                  key={option}
                  onPress={() => {
                    setTaskType(option);
                    setShowTypeModal(false);
                  }}
                  style={{
                    paddingVertical: 12,
                    borderBottomWidth: 1,
                    borderColor: "#eee",
                  }}
                >
                  <Text>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Pressable>
        </Modal>

        {/* Date Picker */}
        <Text style={styles.label}>Date</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowDatePicker(true)}
        >
          <Text>{date ? date.toDateString() : "Select date"}</Text>
          <Ionicons name="calendar-outline" size={20} />
        </TouchableOpacity>
        <Modal transparent visible={showDatePicker} animationType="fade">
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setShowDatePicker(false)}
          >
            <View style={styles.modalContent}>
              <DateTimePicker
                themeVariant="light"
                value={date || new Date()}
                mode="date"
                display={Platform.OS === "ios" ? "inline" : "default"}
                onChange={(event, selectedDate) => {
                  if (selectedDate) setDate(selectedDate);
                  setShowDatePicker(false);
                }}
              />
            </View>
          </Pressable>
        </Modal>

        {/* Start Time Picker */}
        <Text style={styles.label}>Start Time</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowStartPicker(true)}
        >
          <Text>{startTime ? startTime.toLocaleTimeString() : "Select time"}</Text>
          <Ionicons name="time-outline" size={20} />
        </TouchableOpacity>
        <Modal transparent visible={showStartPicker} animationType="fade">
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setShowStartPicker(false)}
          >
            <View style={styles.modalContent}>
              <DateTimePicker
                themeVariant="light"
                value={startTime || new Date()}
                mode="time"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={(event, selectedTime) => {
                  if (selectedTime) setStartTime(selectedTime);
                  setShowStartPicker(false);
                }}
              />
            </View>
          </Pressable>
        </Modal>

        {/* End Time Picker */}
        <Text style={styles.label}>End Time</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowEndPicker(true)}
        >
          <Text>{endTime ? endTime.toLocaleTimeString() : "Select time"}</Text>
          <Ionicons name="time-outline" size={20} />
        </TouchableOpacity>
        <Modal transparent visible={showEndPicker} animationType="fade">
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setShowEndPicker(false)}
          >
            <View style={styles.modalContent}>
              <DateTimePicker
                themeVariant="light"
                value={endTime || new Date()}
                mode="time"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={(event, selectedTime) => {
                  if (selectedTime) setEndTime(selectedTime);
                  setShowEndPicker(false);
                }}
              />
            </View>
          </Pressable>
        </Modal>

        {/* Buttons */}
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => {
              router.back();
              handleResetState();
            }}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveText}>Save Task</Text>
          </TouchableOpacity>
        </View>
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
  label: {
    marginTop: 12,
    marginBottom: 4,
    fontSize: 14,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#F9FAFB",
    padding: 12,
    borderRadius: 8,
    borderColor: "#E5E7EB",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  cancelBtn: {
    borderColor: "#3979ED",
    borderWidth: 1,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  saveBtn: {
    backgroundColor: "#3979ED",
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  cancelText: {
    color: "#3979ED",
    fontWeight: "600",
  },
  saveText: {
    color: "#fff",
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    width: "90%",
  },
});
