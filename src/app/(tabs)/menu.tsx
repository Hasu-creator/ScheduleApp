import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";

const menuItems = [
  { label: "Task", image: require("../../images/task.png") },
  { label: "Class", image: require("../../images/class.png") },
  { label: "Exam", image: require("../../images/exam.png") },
  { label: "Vacation", image: require("../../images/vacation.png") },
];

export default function MenuScreen() {
  const renderItem = ({ item }: { item: (typeof menuItems)[0] }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={item.image} style={styles.icon} />
      <Text style={styles.label}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>
      <FlatList
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.label}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: "#F6F8FB",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
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
    alignItems: "center",
    marginBottom: 12,
    resizeMode: "contain",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
});
