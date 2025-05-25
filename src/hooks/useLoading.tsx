// store/useLoadingStore.ts
import { create } from "zustand";

type LoadingState = {
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
  withLoading: <T>(fn: () => Promise<T>) => Promise<T>;
};

export const useLoadingStore = create<LoadingState>((set) => ({
  isLoading: false,
  setIsLoading: (val) => set({ isLoading: val }),
  withLoading: async (fn) => {
    set({ isLoading: true });
    try {
      return await fn();
    } finally {
      set({ isLoading: false });
    }
  },
}));
