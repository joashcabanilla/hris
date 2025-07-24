"use client";

//react hooks
import { createContext, useContext, useReducer, useMemo } from "react";

//auth reducer
import { authReducer, initialAuthState, AuthState, AuthAction } from "@/context/auth/auth-reducer";

interface AuthContextProviderProps {
  children: React.ReactNode;
}

interface AuthContextType {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);
  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within authContextProvider");
  }

  return context;
}
