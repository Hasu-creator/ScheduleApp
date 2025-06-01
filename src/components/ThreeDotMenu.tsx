import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  onDelete: () => void;
};

const ThreeDotMenu = ({ onDelete }: Props) => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <Ionicons name="ellipsis-vertical" size={20} color="#888" />
      </TouchableOpacity>

      <Modal transparent visible={visible} animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setVisible(false)}
        >
          <View style={styles.menu}>
            <TouchableOpacity
              onPress={() => {
                setVisible(false);
                onDelete();
              }}
            >
              <Text style={styles.menuItem}>Delete</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  menu: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  menuItem: {
    fontSize: 16,
    color: "red",
    paddingVertical: 6,
  },
});

export default ThreeDotMenu;
