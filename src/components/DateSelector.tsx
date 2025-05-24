import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

interface DateItem {
  date: string;
  label: string;
  day: string;
}

interface Props {
  dates: DateItem[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

export default function DateSelector({
  dates,
  selectedDate,
  onSelectDate,
}: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {dates.map((d) => {
        const isSelected = selectedDate === d.date;
        return (
          <TouchableOpacity
            key={d.date}
            onPress={() => onSelectDate(d.date)}
            style={[styles.dateItem, isSelected && styles.dateItemSelected]}
          >
            <Text
              style={[styles.dateLabel, isSelected && styles.dateLabelSelected]}
            >
              {d.label}
            </Text>
            <Text
              style={[styles.dayLabel, isSelected && styles.dayLabelSelected]}
            >
              {d.day}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  dateItem: {
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginRight: 8,
  },
  dateItemSelected: {
    backgroundColor: "#E0E7FF",
  },
  dateLabel: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    color: "#6B7280",
  },
  dayLabel: {
    fontSize: 12,
    fontFamily: "Inter_500Medium",
    color: "#9CA3AF",
  },
  dateLabelSelected: {
    color: "#1D4ED8",
  },
  dayLabelSelected: {
    color: "#1D4ED8",
  },
});
