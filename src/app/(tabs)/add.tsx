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
import { db } from "../../../FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "@/hooks/useAuth";
import { useLoadingStore } from "@/hooks/useLoading";
const taskTypeOptions = ["Assignment", "Reminder", "Revision"];
const tabOptions = ["Tasks", "Classes", "Exams", "Vacations"];

export default function AddTaskScreen() {
  const router = useRouter();
  const addTaskLocal = useTasksStore((state) => state.addTask);
  const { setIsLoading } = useLoadingStore();
  const [tab, setTab] = useState("Tasks");
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [taskType, setTaskType] = useState("");
  const { user } = useAuth();

  const [date, setDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);

  const [activeModal, setActiveModal] = useState<
    null | "type" | "date" | "start" | "end"
  >(null);

  const closeModal = () => setActiveModal(null);

  const handleResetState = () => {
    setTaskName("");
    setDescription("");
    setTaskType("");
    setDate(null);
    setStartTime(null);
    setEndTime(null);
  };

  const handleSave = async () => {
    if (!taskName || !date || !startTime || !endTime) {
      Alert.alert("Please fill in all required fields.");
      return;
    }
    const newTask = {
      title: taskName,
      description,
      type: taskType || tab,
      date: date.toISOString(),
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      completed: false,
      userId: user?.uid || "",
    };
    try {
      setIsLoading(true);
      await addDoc(collection(db, "tasks"), newTask);
      addTaskLocal(newTask);
      handleResetState();
      setIsLoading(false);
      router.back();
    } catch (error) {
      setIsLoading(false);
      console.error("Error adding task to Firestore:", error);
      Alert.alert("Error", "Could not save task. Please try again.");
    }
  };

  const renderDateTimeModal = (
    mode: "date" | "time",
    value: Date | null,
    onChange: (date: Date) => void
  ) => (
    <Modal transparent visible animationType="fade">
      <Pressable style={styles.modalOverlay} onPress={closeModal}>
        <View style={styles.modalContent}>
          <DateTimePicker
            value={value || new Date()}
            mode={mode}
            display={
              Platform.OS === "ios"
                ? mode === "date"
                  ? "inline"
                  : "spinner"
                : "default"
            }
            onChange={(event, selectedDate) => {
              if (selectedDate) onChange(selectedDate);
              closeModal();
            }}
          />
        </View>
      </Pressable>
    </Modal>
  );

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
        <Text style={styles.header}>New Task</Text>

        {/* Tabs */}
        <View style={styles.tabs}>
          {tabOptions.map((t) => (
            <TouchableOpacity key={t} onPress={() => setTab(t)}>
              <Text style={[styles.tabText, tab === t && styles.activeTab]}>
                {t}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Inputs */}
        <LabeledInput label="Task Name">
          <TextInput
            style={styles.input}
            placeholder="Task Title"
            value={taskName}
            onChangeText={setTaskName}
          />
        </LabeledInput>

        <LabeledInput label="Description">
          <TextInput
            style={[styles.input, { height: 100 }]}
            placeholder="Task Description"
            value={description}
            onChangeText={setDescription}
            multiline
          />
        </LabeledInput>

        <LabeledInput label="Type">
          <TouchableOpacity
            style={styles.input}
            onPress={() => setActiveModal("type")}
          >
            <Text>{taskType || "Select task type"}</Text>
            <Ionicons name="chevron-down-outline" size={20} />
          </TouchableOpacity>
        </LabeledInput>

        <LabeledInput label="Date">
          <TouchableOpacity
            style={styles.input}
            onPress={() => setActiveModal("date")}
          >
            <Text>{date ? date.toDateString() : "Select date"}</Text>
            <Ionicons name="calendar-outline" size={20} />
          </TouchableOpacity>
        </LabeledInput>

        <LabeledInput label="Start Time">
          <TouchableOpacity
            style={styles.input}
            onPress={() => setActiveModal("start")}
          >
            <Text>
              {startTime ? startTime.toLocaleTimeString() : "Select time"}
            </Text>
            <Ionicons name="time-outline" size={20} />
          </TouchableOpacity>
        </LabeledInput>

        <LabeledInput label="End Time">
          <TouchableOpacity
            style={styles.input}
            onPress={() => setActiveModal("end")}
          >
            <Text>
              {endTime ? endTime.toLocaleTimeString() : "Select time"}
            </Text>
            <Ionicons name="time-outline" size={20} />
          </TouchableOpacity>
        </LabeledInput>

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

      {/* Modals */}
      {activeModal === "type" && (
        <Modal transparent visible animationType="fade">
          <Pressable style={styles.modalOverlay} onPress={closeModal}>
            <View style={styles.modalContent}>
              {taskTypeOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  onPress={() => {
                    setTaskType(option);
                    closeModal();
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
      )}
      {activeModal === "date" && renderDateTimeModal("date", date, setDate)}
      {activeModal === "start" &&
        renderDateTimeModal("time", startTime, setStartTime)}
      {activeModal === "end" &&
        renderDateTimeModal("time", endTime, setEndTime)}
    </KeyboardAvoidingView>
  );
}

const LabeledInput = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <View>
    <Text style={styles.label}>{label}</Text>
    {children}
  </View>
);

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
