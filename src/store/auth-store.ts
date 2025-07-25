import { create } from "zustand";

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
  isAuthenticated: boolean;
  login: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set(() => ({ user, isAuthenticated: true }))
}));
