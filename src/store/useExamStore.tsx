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

export type Exam = {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  completed: boolean;
  duringTime: string;
  building: string;
  room: string;
  userId: string;
};

type ExamStore = {
  exams: Exam[];
  setExams: (exams: Exam[]) => void;
  addExam: (exam: Omit<Exam, "id">) => Promise<void>;
  fetchExams: () => Promise<void>;
  completeExam: (id: string) => Promise<void>;
  deleteExam: (id: string) => Promise<void>;
  resetExams: () => void;
};

export const useExamsStore = create<ExamStore>((set, get) => ({
  exams: [],

  setExams: (exams) => set({ exams }),

  addExam: async (exam) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    try {
      const docRef = await addDoc(collection(db, "exams"), {
        ...exam,
        userId: user.uid,
      });

      set((state) => ({
        exams: [...state.exams, { ...exam, id: docRef.id }],
      }));
    } catch (error) {
      console.error("Failed to add exam:", error);
    } finally {
    }
  },

  fetchExams: async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;
    set({ exams: [] });
    try {
      const q = query(collection(db, "exams"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);

      const fetchedExams: Exam[] = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data() as Omit<Exam, "id">;
        fetchedExams.push({ ...data, id: docSnap.id });
      });

      set({ exams: fetchedExams });
    } catch (error) {
      console.error("Failed to fetch exams:", error);
    } finally {
    }
  },

  completeExam: async (id) => {
    const currentExam = get().exams.find((exam) => exam.id === id);
    if (!currentExam) return;

    const updatedCompleted = !currentExam.completed;

    try {
      await updateDoc(doc(db, "exams", id), {
        completed: updatedCompleted,
      });

      set((state) => ({
        exams: state.exams.map((exam) =>
          exam.id === id ? { ...exam, completed: updatedCompleted } : exam
        ),
      }));
    } catch (error) {
      console.error("Failed to toggle exam:", error);
    } finally {
    }
  },

  deleteExam: async (id) => {
    try {
      await deleteDoc(doc(db, "exams", id));
      set((state) => ({
        exams: state.exams.filter((exam) => exam.id !== id),
      }));
    } catch (error) {
      console.error("Failed to delete exam:", error);
    } finally {
    }
  },

  resetExams: () => set({ exams: [] }),
}));
