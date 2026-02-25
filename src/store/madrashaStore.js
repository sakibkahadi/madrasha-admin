import { create } from "zustand";

export const useMadrashaStore = create((set, get) => ({
 

  madrashaId: null,
  setMadrashaId: (value) => set({ madrashaId: value }),


}));
