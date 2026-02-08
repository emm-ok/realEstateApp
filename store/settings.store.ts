import { create } from "zustand";
import { persist } from "zustand/middleware";

type SettingsState = {
  data: Record<string, any>;
  dirty: boolean;
  saveStatus: "idle" | "saving" | "saved";
  update: (section: string, values: any) => void;
  reset: () => void;
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      data: {},
      dirty: false,
      saveStatus: "idle",

      update: (section, values) =>
        set((state) => ({
          data: { ...state.data, [section]: values },
          dirty: true,
        })),

      reset: () => set({ data: {}, dirty: false }),
    }),
    { name: "settings-storage" }
  )
);
