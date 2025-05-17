import { create } from "zustand";

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

type TasksState = {
  tasks: Task[];
  addTask: (task: Task) => void;
  removeTask: (id: string) => void;
  toggleTask: (id: string) => void;
  clearTasks: () => void;
};

export const useTasksStore = create<TasksState>((set) => ({
  tasks: [],
  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),
  removeTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
  toggleTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    })),
  clearTasks: () => set({ tasks: [] }),
}));