import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AccessibilityState {
  screenReaderMode: boolean;
  toggleScreenReaderMode: () => void;
  setScreenReaderMode: (value: boolean) => void;
}

export const useAccessibilityStore = create<AccessibilityState>()(
  persist(
    (set) => ({
      screenReaderMode: false,
      toggleScreenReaderMode: () =>
        set((state) => ({ screenReaderMode: !state.screenReaderMode })),
      setScreenReaderMode: (screenReaderMode) => set({ screenReaderMode }),
    }),
    {
      name: "accessibility-store",
    }
  )
);
