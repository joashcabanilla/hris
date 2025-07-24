"use client";

import { createContext, useContext, useMemo, useState } from "react";

type typeUser = {
  id: string;
  usertype_id: number;
  firstname: string;
  middlename: string | null;
  lastname: string;
  email: string;
  username: string;
  status: string;
};

type authContextProvider = {
  user?: typeUser;
  setUser: React.Dispatch<React.SetStateAction<typeUser | undefined>>;
};

type authContextProviderProps = {
  children: React.ReactNode;
};

const authContext = createContext<authContextProvider | null>(null);

export default function AuthContextProvider({ children }: authContextProviderProps) {
  const [user, setUser] = useState<typeUser | undefined>(undefined);

  const value = useMemo(() => ({ user, setUser }), [user]);

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("useAuthContext must be used within authContextProvider");
  }

  return context;
}
