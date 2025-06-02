import { create } from "zustand";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../FirebaseConfig";
import { getAuth } from "firebase/auth";

export type Task = {
  id: string;
  title: string;
  description: string;
  type: string;
  date: string;
  startTime: string;
  endTime: string;
  completed: boolean;
  userId: string;
};

type TaskStore = {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Omit<Task, "id">) => Promise<void>;
  fetchTasks: () => Promise<void>;
  completeTask: (id: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  resetTasks: () => void;
};

export const useTasksStore = create<TaskStore>((set, get) => ({
  tasks: [],

  setTasks: (tasks) => set({ tasks }),

  addTask: async (task) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    try {
      const docRef = await addDoc(collection(db, "tasks"), {
        ...task,
        userId: user.uid,
      });

      set((state) => ({
        tasks: [...state.tasks, { ...task, id: docRef.id }],
      }));
    } catch (error) {
      console.error("Failed to add task:", error);
    } finally {
    }
  },

  fetchTasks: async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;
    set({tasks: []})
    try {
      const q = query(collection(db, "tasks"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);

      const fetchedTasks: Task[] = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data() as Omit<Task, "id">;
        fetchedTasks.push({ ...data, id: docSnap.id });
      });

      set({ tasks: fetchedTasks });
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    } finally {
    }
  },

  completeTask: async (id) => {
    const currentTask = get().tasks.find((task) => task.id === id);
    if (!currentTask) return;

    const updatedCompleted = !currentTask.completed;

    try {
      await updateDoc(doc(db, "tasks", id), {
        completed: updatedCompleted,
      });

      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id ? { ...task, completed: updatedCompleted } : task
        ),
      }));
    } catch (error) {
      console.error("Failed to toggle task:", error);
    } finally {
    }
  },

  deleteTask: async (id) => {
    try {
      await deleteDoc(doc(db, "tasks", id));
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
      }));
    } catch (error) {
      console.error("Failed to delete task:", error);
    } finally {
    }
  },

  resetTasks: () => set({ tasks: [] }),
}));
