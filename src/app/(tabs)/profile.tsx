import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Switch,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
export default function ProfileScreen() {
  const [remindersEnabled, setRemindersEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity>
          <Ionicons name="create-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Avatar + Info */}
      <View style={styles.centered}>
        <Image source={require("@/images/avatar.png")} style={styles.avatar} />
        <Text style={styles.name}>Chau Loc</Text>
        <Text style={styles.email}>chauLoc2001@gmail.com</Text>
      </View>

      {/* Stats Grid */}
      <View style={styles.grid}>
        {[
          {
            icon: "eye-outline",
            label: "Pending Tasks",
            count: 0,
            color: "#FFF7D1",
          },
          {
            icon: "alert-circle-outline",
            label: "Overdue Tasks",
            count: 0,
            color: "#FFE2E2",
          },
          {
            icon: "checkmark-done-outline",
            label: "Task Complete",
            count: 0,
            color: "#D1FADF",
          },
          {
            icon: "flame-outline",
            label: "Your Steak",
            count: 0,
            color: "#FBEFFF",
          },
        ].map((item, index) => (
          <View
            key={index}
            style={[styles.statCard, { backgroundColor: item.color }]}
          >
            <Ionicons name={item.icon as keyof typeof Ionicons.glyphMap} size={20} color="#333" />
            <Text style={styles.statCount}>{item.count}</Text>
            <Text style={styles.statLabel}>{item.label}</Text>
            <Text style={styles.statSub}>Last 7 days</Text>
          </View>
        ))}
      </View>

      {/* Settings */}
      <View style={styles.settingsBlock}>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>Personal information</Text>
          <Ionicons name="chevron-forward" size={18} color="#999" />
        </TouchableOpacity>

        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Reminders</Text>
          <Switch
            value={remindersEnabled}
            onValueChange={setRemindersEnabled}
          />
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Notification</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7F8FF", paddingHorizontal: 20 },
  headerRow: {
    marginTop: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: { fontSize: 18, fontWeight: "600", color: "#000" },
  centered: { alignItems: "center", marginBottom: 24 },
  avatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 12 },
  name: { fontSize: 18, fontWeight: "bold", color: "#000" },
  email: { color: "#666", fontSize: 14 },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
  },
  statCard: {
    width: "48%",
    borderRadius: 12,
    padding: 12,
    backgroundColor: "#eee",
  },
  statCount: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 4,
  },
  statLabel: {
    fontSize: 13,
    color: "#333",
    marginTop: 2,
  },
  statSub: {
    fontSize: 11,
    color: "#999",
  },
  settingsBlock: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 16,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  settingText: {
    fontSize: 15,
    color: "#222",
  },
});
