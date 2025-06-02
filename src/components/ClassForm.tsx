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
import { db } from "../../FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "@/hooks/useAuth";
import { useLoadingStore } from "@/hooks/useLoading";
import { useClassesStore } from "@/store/useClassStore";
export default function ClassForm() {
  const router = useRouter();
  const addClassLocal = useClassesStore((state) => state.addClass);
  const { setIsLoading } = useLoadingStore();
  const [className, setClassName] = useState("");
  const [description, setDescription] = useState("");
  const [building, setBuilding] = useState("");
  const [room, setRoom] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const { user } = useAuth();

  const [date, setDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);

  const [activeModal, setActiveModal] = useState<
    null | "type" | "date" | "start" | "end"
  >(null);

  const closeModal = () => setActiveModal(null);

  const handleResetState = () => {
    setClassName("");
    setDescription("");
    setDate(null);
    setStartTime(null);
    setEndTime(null);
  };

  const handleSave = async () => {
    if (!className || !date || !startTime || !endTime) {
      Alert.alert("Please fill in all required fields.");
      return;
    }
    const newClass = {
      title: className,
      description,
      date: date.toISOString(),
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      building: building,
      room: room,
      teacherName: teacherName,
      completed: false,
      userId: user?.uid || "",
    };
    try {
      setIsLoading(true);
      addClassLocal(newClass);
      handleResetState();
      setIsLoading(false);
      router.push("/(tabs)/home");
    } catch (error) {
      setIsLoading(false);
      console.error("Error adding class to Firestore:", error);
      Alert.alert("Error", "Could not save class. Please try again.");
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
            themeVariant="light"
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
    <ScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {/* Inputs */}
      <LabeledInput label="Class Name">
        <TextInput
          style={styles.input}
          placeholder="Class Title"
          value={className}
          onChangeText={setClassName}
        />
      </LabeledInput>

      <LabeledInput label="Description">
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Class Description"
          value={description}
          onChangeText={setDescription}
          multiline
        />
      </LabeledInput>

      <LabeledInput label="Date">
        <TouchableOpacity
          style={styles.input}
          onPress={() => setActiveModal("date")}
        >
          <Text style={!date && { color: "#A4A6AB" }}>
            {date ? date.toDateString() : "Select date"}
          </Text>
          <Ionicons name="calendar-outline" size={20} />
        </TouchableOpacity>
      </LabeledInput>

      <View style={[styles.inputGroup]}>
        <View style={styles.inputItem}>
          <LabeledInput label="Start Time">
            <TouchableOpacity
              style={[styles.input]}
              onPress={() => setActiveModal("start")}
            >
              <Text style={!startTime && { color: "#A4A6AB" }}>
                {startTime ? startTime.toLocaleTimeString() : "Select time"}
              </Text>
              <Ionicons name="time-outline" size={20} />
            </TouchableOpacity>
          </LabeledInput>
        </View>
        <View style={styles.inputItem}>
          <LabeledInput label="End Time">
            <TouchableOpacity
              style={[styles.input]}
              onPress={() => setActiveModal("end")}
            >
              <Text style={!endTime && { color: "#A4A6AB" }}>
                {endTime ? endTime.toLocaleTimeString() : "Select time"}
              </Text>
              <Ionicons name="time-outline" size={20} />
            </TouchableOpacity>
          </LabeledInput>
        </View>
      </View>
      <View style={[styles.inputGroup]}>
        <View style={styles.inputItem}>
          <LabeledInput label="Building">
            <TextInput
              style={[styles.input]}
              placeholder=""
              value={building}
              onChangeText={setBuilding}
              multiline
            />
          </LabeledInput>
        </View>
        <View style={styles.inputItem}>
          <LabeledInput label="Room">
            <TextInput
              style={[styles.input]}
              placeholder=""
              value={room}
              onChangeText={setRoom}
              multiline
            />
          </LabeledInput>
        </View>
      </View>
      <LabeledInput label="Teacher Name">
        <TextInput
          style={[styles.input]}
          placeholder=""
          value={teacherName}
          onChangeText={setTeacherName}
          multiline
        />
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
          <Text style={styles.saveText}>Save Class</Text>
        </TouchableOpacity>
      </View>

      {activeModal === "date" && renderDateTimeModal("date", date, setDate)}
      {activeModal === "start" &&
        renderDateTimeModal("time", startTime, setStartTime)}
      {activeModal === "end" &&
        renderDateTimeModal("time", endTime, setEndTime)}
    </ScrollView>
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
  inputGroup: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  inputItem: {
    flex: 1,
  },
});
