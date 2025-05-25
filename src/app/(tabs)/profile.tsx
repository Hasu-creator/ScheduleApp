import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Switch,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { signOut, getAuth } from "firebase/auth";

export default function ProfileScreen() {
  const [remindersEnabled, setRemindersEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const router = useRouter();
  const logout = async () => {
    const auth = getAuth();
    await signOut(auth);
    router.replace("/login");
  };
  return (
    <LinearGradient colors={["#C5D1FC", "#F7F8FF"]} style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.editBtn}>
          <Ionicons name="create-outline" size={20} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.centered}>
        <Image source={require("@/images/avatar.png")} style={styles.avatar} />
        <Text style={styles.name}>Chau Loc</Text>
        <Text style={styles.email}>chauLoc2001@gmail.com</Text>
      </View>

      <View style={styles.grid}>
        {[
          {
            icon: "eye-outline",
            label: "Pending Tasks",
            count: 0,
            color: "#FFF7D1",
            sub: "Last 7 days",
          },
          {
            icon: "alert-circle-outline",
            label: "Overdue Tasks",
            count: 0,
            color: "#FFE2E2",
            sub: "Last 7 days",
          },
          {
            icon: "checkmark-done-outline",
            label: "Task Complete",
            count: 0,
            color: "#D1FADF",
            sub: "Last 7 days",
          },
          {
            icon: "flame-outline",
            label: "Your Steak",
            count: 0,
            color: "#FBEFFF",
            sub: "Total steak",
          },
        ].map((item, index) => (
          <LinearGradient
            colors={["#fff", item.color]}
            start={{ x: 0, y: 0.75 }}
            end={{ x: 1, y: 0.25 }}
            key={index}
            style={[styles.statCard, { backgroundColor: item.color }]}
          >
            <Ionicons
              name={item.icon as keyof typeof Ionicons.glyphMap}
              size={20}
              color="#333"
              style={{ marginBottom: 4 }}
            />
            <Text style={styles.statCount}>{item.count}</Text>
            <Text style={styles.statLabel}>{item.label}</Text>
            <Text style={styles.statSub}>{item.sub}</Text>
          </LinearGradient>
        ))}
      </View>

      <ScrollView>
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
              trackColor={{ true: "#4F46E5", false: "#ccc" }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Notification</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ true: "#4F46E5", false: "#ccc" }}
              thumbColor="#fff"
            />
          </View>
          <TouchableOpacity style={styles.settingItem} onPress={logout}>
            <Text style={styles.settingText}>Log out</Text>
            <Ionicons name="chevron-forward" size={18} color="#999" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 60 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  editBtn: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  centered: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  email: {
    color: "#666",
    fontSize: 14,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
  },
  statCard: {
    width: "48%",
    borderRadius: 16,
    padding: 12,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 1,
  },
  statCount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 13,
    color: "#333",
    marginBottom: 2,
  },
  statSub: {
    fontSize: 11,
    color: "#999",
  },
  settingsBlock: {
    marginTop: 24,
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderWidth: 1,
    borderColor: "#BBC8F8",
    borderRadius: 12,
  },
  settingText: {
    fontSize: 14,
    color: "#222",
  },
});
