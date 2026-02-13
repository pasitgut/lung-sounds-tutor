import { create } from "zustand";

interface UserState {
  uid: string | null;
  email: string | null;
  displayName: string | null;
  progress: {
    pretestDone: boolean;
    simulationDone: boolean;
    posttestDone: boolean;
    certificate: boolean;
  };

  setAuth: (uid: string, email: string, displayName: string) => void;
  setProgress: (
    type: "pretestDone" | "simulationDone" | "posttestDone" | "certificate",
    isDone: boolean,
  ) => void;
  clearAuth: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  uid: null,
  email: null,
  displayName: null,
  progress: {
    pretestDone: false,
    simulationDone: false,
    posttestDone: false,
    certificate: false,
  },

  setAuth: (uid, email, displayName) => set({ uid, email, displayName }),
  setProgress: (type, isDone) =>
    set((state) => ({
      progress: { ...state.progress, [`${type}`]: isDone },
    })),
  clearAuth: () =>
    set({
      uid: null,
      email: null,
      progress: {
        pretestDone: false,
        simulationDone: false,
        posttestDone: false,
        certificate: false,
      },
    }),
}));
