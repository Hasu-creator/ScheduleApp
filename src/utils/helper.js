import dayjs from "dayjs";
import { format, startOfWeek, addDays } from "date-fns";

export function formatTime(time) {
  return dayjs(time).format("h:mm A");
}
export function formatDate(time) {
  return dayjs(time).format("DD/MM/YYYY");
}

export function getCurrentWeekDates() {
  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 }); // Monday start

  const days = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(weekStart, i);
    return {
      date: format(date, "yyyy-MM-dd"),
      label: format(date, "d"),
      day: format(date, "EEE"), // e.g. Mon, Tue
    };
  });

  return days;
}
