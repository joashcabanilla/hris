"use client";
//hooks
import { useLayoutEffect } from "react";
import { useRouter } from "next/navigation";

//zustand global state
import { useAuthStore } from "@/store/auth-store";

interface AuthenticationProviderProps {
  children: React.ReactNode;
}

export function EmployeeProvider({ children }: AuthenticationProviderProps) {
  const { authenticated, user } = useAuthStore();
  const router = useRouter();

  useLayoutEffect(() => {
    if (!authenticated || user?.usertype_id != 5) {
      router.replace("/");
    }
  }, [authenticated, user, router]);

  if (!authenticated || user?.usertype_id != 5) {
    return null;
  }
  return children;
}
