import React from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import { useTasksStore } from "../../store/useTaskStore";
import Header from "@/components/Header";
export default function HomeScreen() {
  const tasks = useTasksStore((state) => state.tasks);

  return (
    <View style={styles.container}>
      <Header title="homeScreen" />
      {tasks.length === 0 ? (
        <View style={styles.container}>
          <Image
            source={require("../../images/bg_home_2.png")}
            style={styles.image}
            resizeMode="contain"
          />
          <Image
            source={require("../../images/bg_radiant_home_2.png")}
            style={styles.imageBg1}
          />
          <Image
            source={require("../../images/bg_radiant_home_1.png")}
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
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.taskItem}>
              <Text>{item.title}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    position: "relative",
  },
  hasTasksContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  button: {
    backgroundColor: "#F9FAFB",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 24,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: "#F9FAFB",
  },
  buttonText: {
    color: "#000",
    fontWeight: "600",
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
  },
  taskItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});
