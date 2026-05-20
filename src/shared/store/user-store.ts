import { create } from "zustand";
import { UserInterface } from "../interfaces/user";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface SessionInterface {
  user: UserInterface;
  token: string;
  refreshToken: string;
}

interface UpdateTokenInterface {
  token: string;
  refreshToken: string;
}

export interface UserStore {
  user: UserInterface | null;
  token: string | null;
  refreshToken: string | null;
  setSession: (session: SessionInterface) => void;
  logout: () => void;
  updateToken: ({ token, refreshToken }: UpdateTokenInterface) => void;
  updateUser: (updatedUserData: Partial<UserInterface>) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      refreshToken: null,
      logout: () => set({ user: null, token: null, refreshToken: null }),
      setSession: (session: SessionInterface) => set({ ...session }),
      updateToken: (params: UpdateTokenInterface) => set(params),
      updateUser: (updatedUserData: Partial<UserInterface>) =>
        set((state) => {
          return {
            user: state.user ? { ...state.user, ...updatedUserData } : null,
          };
        }),
    }),
    {
      name: "marketplace@user-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
