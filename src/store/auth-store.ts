import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type User = {
  id: string;
  usertype_id: number;
  firstname: string;
  middlename: string | null;
  lastname: string;
  email: string;
  email_verified: Date | null;
  username: string;
  status: string;
};

interface AuthState {
  user: User | null;
  token: string | null;
  usertype: number | null;
  authenticated: boolean;
  resetUser: User | null;
}

interface AuthActions {
  setUser: (user: User) => void;
  setToken: (token: string | null) => void;
  setUsertype: (usertype: number | null) => void;
  setAuthenticated: (authenticated: boolean) => void;
  setResetUser: (resetUser: User | null) => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set): AuthStore => ({
      user: null,
      token: null,
      usertype: null,
      authenticated: false,
      resetUser: null,

      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      setUsertype: (usertype) => set({ usertype }),
      setAuthenticated: (authenticated) => set({ authenticated }),
      setResetUser: (resetUser) => set({ resetUser })
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        token: state.token,
        usertype: state.usertype,
        authenticated: state.authenticated
      })
    }
  )
);
