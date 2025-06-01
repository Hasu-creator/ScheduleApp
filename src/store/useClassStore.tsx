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

  export type Class = {
    id: string;
    title: string;
    description: string;
    date: string;
    startTime: string;
    endTime: string;
    building: string;
    room: string;
    teacherName: string;
    completed: boolean,
    userId: string;
  };

  type ClassStore = {
    classes: Class[];
    setClasses: (classes: Class[]) => void;
    addClass: (classItem: Omit<Class, "id">) => Promise<void>;
    fetchClasses: () => Promise<void>;
    completeClass: (id: string) => Promise<void>;
    deleteClass: (id: string) => Promise<void>;
    resetClasses: () => void;
  };

  export const useClassesStore = create<ClassStore>((set, get) => ({
    classes: [],

    setClasses: (classes) => set({ classes }),

    addClass: async (classItem) => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return;

      try {
        const docRef = await addDoc(collection(db, "classes"), {
          ...classItem,
          userId: user.uid,
        });

        // set((state) => ({
        //   classes: [...state.classes, { ...classItem, id: docRef.id }],
        // }));
      } catch (error) {
        console.error("Failed to add class:", error);
      } finally {
      }
    },

    fetchClasses: async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return;
      set({ classes: [] });
      try {
        const q = query(
          collection(db, "classes"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);

        const fetchedClasses: Class[] = [];
        querySnapshot.forEach((docSnap) => {
          const data = docSnap.data() as Omit<Class, "id">;
          fetchedClasses.push({ ...data, id: docSnap.id });
        });

        set({ classes: fetchedClasses });
      } catch (error) {
        console.error("Failed to fetch classes:", error);
      } finally {
      }
    },

    completeClass: async (id) => {
      const currentClass = get().classes.find((classItem) => classItem.id === id);
      if (!currentClass) return;

      const updatedCompleted = !currentClass.completed;

      try {
        await updateDoc(doc(db, "classes", id), {
          completed: updatedCompleted,
        });

        set((state) => ({
          classes: state.classes.map((classItem) =>
            classItem.id === id
              ? { ...classItem, completed: updatedCompleted }
              : classItem
          ),
        }));
      } catch (error) {
        console.error("Failed to toggle class:", error);
      } finally {
      }
    },

    deleteClass: async (id) => {
      try {
        await deleteDoc(doc(db, "classes", id));
        set((state) => ({
          classes: state.classes.filter((classItem) => classItem.id !== id),
        }));
      } catch (error) {
        console.error("Failed to delete classItem:", error);
      } finally {
      }
    },

    resetClasses: () => set({ classes: [] }),
  }));
