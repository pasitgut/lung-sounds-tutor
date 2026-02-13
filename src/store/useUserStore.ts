import { User } from "firebase/auth";
import { UserProfile } from "firebase/auth/web-extension";
import { create } from "zustand";

interface UserState {
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;

  setUser: (user: User | null) => void;
  setProfile: (profile: UserProfile | null) => void;
  setLoading: (loading: boolean) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  profile: null,
  isLoading: true,

  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),
  setLoading: (isLoading) => set({ isLoading }),
  clearUser: () => set({ user: null, profile: null, isLoading: false }),
}));
