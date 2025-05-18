import { create } from "zustand";

export type Task = {
  id: string;
  title: string;
  description: string;
  type: string;
  date: string;
  startTime: string;
  endTime: string;
  completed: boolean;
};

type TasksState = {
  tasks: Task[];
  addTask: (task: Task) => void;
  completeTask: (id: string) => void;
};

export const useTasksStore = create<TasksState>((set) => ({
  tasks: [],
  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),
  completeTask: (id: string) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    })),
}));
