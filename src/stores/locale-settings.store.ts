import { create } from "zustand";

export type DateFormat = "dd/mm/yyyy" | "mm/dd/yyyy" | "yyyy-mm-dd";

interface LocaleSettings {
  dateFormat: DateFormat;
  timezone: string;
  is24HourFormat: boolean;
  showClock: boolean;
  setDateFormat: (format: DateFormat) => void;
  setTimezone: (tz: string) => void;
  setIs24HourFormat: (is24: boolean) => void;
  setShowClock: (value: boolean) => void;
}

export const useLocaleSettingsStore = create<LocaleSettings>((set) => ({
  dateFormat: "dd/mm/yyyy",
  timezone: "europe/paris",
  is24HourFormat: true,
  showClock: false,
  setDateFormat: (dateFormat) => set({ dateFormat }),
  setTimezone: (timezone) => set({ timezone }),
  setIs24HourFormat: (is24HourFormat) => set({ is24HourFormat }),
  setShowClock: (showClock) => set({ showClock }),
}));
