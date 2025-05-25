// app/index.tsx or app/home.tsx
import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import { useTasksStore } from "@/store/useTaskStore";
import Header from "@/components/Header";
import TaskCard from "@/components/TaskCard";
import TaskCategoryCard from "@/components/TaskCategoryCard";
import { formatTime } from "@/utils/helper";

export default function HomeScreen() {
  const tasks = useTasksStore((state) => state.tasks);
  const fetchTasks = useTasksStore((state) => state.fetchTasks);
  useEffect(() => {
    fetchTasks();
  }, []);
  return (
    <View style={styles.container}>
      <Header />

      {tasks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Image
            source={require("@/images/bg_home_2.png")}
            style={styles.image}
            resizeMode="contain"
          />
          <Image
            source={require("@/images/bg_radiant_home_2.png")}
            style={styles.imageBg1}
          />
          <Image
            source={require("@/images/bg_radiant_home_1.png")}
            style={styles.imageBg2}
          />
          <Text style={styles.title}>
            No tasks, exams or classes left today
          </Text>
          <Text style={styles.subtitle}>
            No plans? Maybe it’s time to start that side project or revise a
            little.
          </Text>
        </View>
      ) : (
        <View style={styles.taskListContainer}>
          <Image
            source={require("@/images/bg_radiant_home_2.png")}
            style={styles.imageBg1}
          />
          <Image
            source={require("@/images/bg_radiant_home_1.png")}
            style={styles.imageBg2}
          />
          <View style={styles.scroll}>
            <Text style={styles.sectionTitle}>Manage Daily Task</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TaskCategoryCard
                title="UI Interface App"
                description="Design user interface using prototype"
                progress={0.6}
                color="#4F46E5"
              />
              <TaskCategoryCard
                title="Learn English"
                description="Do reading, listening & writing ielts tasks"
                progress={0.4}
                color="#F59E0B"
              />
            </ScrollView>
            {/* TODO: Task list here */}
          </View>
          <Text style={styles.todayLabel}>Today’s Tasks</Text>
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingTop: 12 }}
            renderItem={({ item }) => (
              <TaskCard
                id={item.id}
                title={item.title}
                time={`${formatTime(item.startTime)} - ${formatTime(
                  item.endTime
                )}`}
                completed={item.completed}
              />
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    position: "relative",
  },
  image: {
    width: 390,
    height: 418,
    marginBottom: 20,
    zIndex: 1,
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "Inter_700Bold",
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
    marginBottom: 30,
    fontFamily: "Inter_400Regular",
  },
  taskListContainer: {
    flex: 1,
    padding: 20,
  },
  todayLabel: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 8,
  },
  scroll: {
    padding: 0,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  cardScroll: {
    marginVertical: 10,
  },
});
