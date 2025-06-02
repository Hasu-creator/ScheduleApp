import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  onDelete: () => void;
};

const ThreeDotMenu = ({ onDelete }: Props) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={() => setVisible(true)}>
          <Ionicons name="ellipsis-vertical" size={20} color="#888" />
        </TouchableOpacity>
      </View>

      {visible && (
        <View style={styles.overlay}>
          <Pressable
            style={styles.backdrop}
            onPress={() => setVisible(false)}
          />

          <View style={styles.popup}>
            <TouchableOpacity
              onPress={() => {
                setVisible(false);
                onDelete();
              }}
            >
              <Text style={styles.menuItem}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingTop: 38,
    paddingRight: 10,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  popup: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
    minWidth: 100,
  },
  menuItem: {
    fontSize: 14,
    paddingVertical: 6,
    color: "red",
  },
});

export default ThreeDotMenu;
