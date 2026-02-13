import { db } from "@/lib/firebase/db";
import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";

interface ProgressState {
  isPretestDone: boolean;
  isSimulationDone: boolean;
  isPosttestDone: boolean;
  isLoading: boolean;

  fetchProgress: (uid: string) => Promise<void>;

  markAsDone: (module: "pretest" | "simulation" | "posttest") => void;
}

export const useProgressStore = create<ProgressState>((set) => ({
  isPosttestDone: false,
  isSimulationDone: false,
  isPretestDone: false,
  isLoading: false,

  fetchProgress: async (uid: string) => {
    set({ isLoading: true });

    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        set({
          isPretestDone: data.isPretestDone || false,
          isSimulationDone: data.isSimulationDone || false,
          isPosttestDone: data.isPosttestDone || false,
        });
      }
    } catch (error) {
      console.error("Error fetching progress: ", error);
    } finally {
      set({ isLoading: false });
    }
  },

  markAsDone: (module: string) => {
    if (module === "pretest") set({ isPretestDone: true });
    if (module === "simulation") set({ isSimulationDone: true });
    if (module === "posttest") set({ isPosttestDone: true });
  },
}));
