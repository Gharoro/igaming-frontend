import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { User } from "../interfaces/interface";

interface AppState {
  accessToken: string | null;
  nextSessionIn: number | null;
  timeLeft: number | null;
  user: User | null;
  setAccessToken: (token: string) => void;
  setNextSessionIn: (num: number | null) => void;
  setTimeLeft: (num: number | null) => void;
  setUser: (user: User) => void;
  clearAuth: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      accessToken: null,
      nextSessionIn: null,
      timeLeft: null,
      user: null,
      setAccessToken: (token) => set({ accessToken: token }),
      setNextSessionIn: (num: number | null) => set({ nextSessionIn: num }),
      setTimeLeft: (num: number | null) => set({ timeLeft: num }),
      setUser: (user) => set({ user }),
      clearAuth: () => set({ accessToken: null, user: null }),
    }),
    {
      name: "auth-token",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
