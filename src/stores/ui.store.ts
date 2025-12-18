import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UiStore {
  tasksViewMode: "card" | "table";
  setTasksViewMode: (mode: "card" | "table") => void;
}

export const useUiStore = create<UiStore>()(
  persist(
    (set) => ({
      tasksViewMode: "card",
      setTasksViewMode: (mode) => set({ tasksViewMode: mode }),
    }),
    { name: "ui-store" }
  )
);
