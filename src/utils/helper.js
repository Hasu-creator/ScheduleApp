import dayjs from "dayjs";

export function formatTime(time) {
  return dayjs(time).format("h:mm A");
}
