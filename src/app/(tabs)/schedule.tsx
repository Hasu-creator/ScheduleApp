import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import TaskCard from "@/components/TaskCard";
import { useTasksStore } from "@/store/useTaskStore";
import { getCurrentWeekDates } from "@/utils/helper";
import { format } from "date-fns";
import DateSelector from "@/components/DateSelector";
import { formatTime } from "@/utils/helper";
import Header from "@/components/Header";

export default function TodayScreen() {
  const tasks = useTasksStore((state) => state.tasks);
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );
  const todayTasks = tasks.filter(
    (task) => format(new Date(task.date), "yyyy-MM-dd") === selectedDate
  );
  const dateList = getCurrentWeekDates();
  return (
    <View style={styles.container}>
      <Image
        source={require("@/images/bg_radiant_home_2.png")}
        style={styles.imageBg1}
      />
      <Image
        source={require("@/images/bg_radiant_home_1.png")}
        style={styles.imageBg2}
      />
      <Header isDate />

      <Text style={styles.todayLabel}>Today</Text>

      <View style={styles.weekDays}>
        <DateSelector
          dates={dateList}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
      </View>

      <ScrollView style={styles.taskList} showsVerticalScrollIndicator={false}>
        {todayTasks.map((task) => (
          <TaskCard
            key={task.id}
            id={task.id}
            title={task.title}
            time={`${formatTime(task.startTime)} - ${formatTime(task.endTime)}`}
            completed={task.completed}
            description={task.description}
            isContent
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    backgroundColor: "#F9FAFB",
    position: "relative",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateText: {
    fontSize: 16,
    fontFamily: "Inter_500Medium",
    color: "#111827",
  },
  todayLabel: {
    fontSize: 24,
    fontFamily: "Inter_700Bold",
    marginVertical: 16,
  },
  weekDays: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  day: {
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  dayActive: {
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: "#E0E7FF",
    borderRadius: 12,
  },
  dayText: {
    fontSize: 12,
    fontFamily: "Inter_500Medium",
    color: "#6B7280",
  },
  taskList: {
    flex: 1,
  },
  imageBg1: {
    position: "absolute",
    top: 75,
    left: 112,
    width: 274,
    height: 335,
    zIndex: 0,
  },
  imageBg2: {
    position: "absolute",
    width: 223,
    height: "100%",
    bottom: -100,
    left: 0,
  },
});
