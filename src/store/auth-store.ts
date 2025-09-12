import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type User = {
  id: string;
  usertype_id: number;
  profile_picture: string | null;
  prefix: string;
  firstname: string;
  middlename: string | null;
  lastname: string;
  suffix: string | null;
  email: string;
};

interface AuthState {
  user: User | null;
  token: string | null;
  authenticated: boolean;
  resetUser: User | null;
}

interface AuthActions {
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setAuthenticated: (authenticated: boolean) => void;
  setResetUser: (resetUser: User | null) => void;
  setUserProfile: (newProfile: string) => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set): AuthStore => ({
      user: null,
      token: null,
      authenticated: false,
      resetUser: null,

      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      setAuthenticated: (authenticated) => set({ authenticated }),
      setResetUser: (resetUser) => set({ resetUser }),
      setUserProfile: (newProfile) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                profile_picture: newProfile
              }
            : null
        }))
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        authenticated: state.authenticated
      })
    }
  )
);
