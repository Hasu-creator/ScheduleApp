  import React from "react";
  import { View, StyleSheet } from "react-native";

  interface ProgressBarProps {
    progress: number; // 0 to 1
    color?: string;
  }

  export default function ProgressBar({ progress, color = "#3B82F6" }: ProgressBarProps) {
    return (
      <View style={styles.container}>
        <View style={[styles.bar, { width: `${progress * 100}%`, backgroundColor: color }]} />
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      height: 6,
      backgroundColor: "#E5E7EB",
      borderRadius: 6,
      overflow: "hidden",
      marginTop: 8,
    },
    bar: {
      height: "100%",
    },
  });
