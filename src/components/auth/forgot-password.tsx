"use client";

//hooks
import { useEffect } from "react";
import { useRouter } from "next/navigation";

//global state
import { useAuthStore } from "@/store/auth-store";

//components
import { FindAccount } from "@/components/auth/find-account";
import { ResetPassowrd } from "@/components/auth/reset-password";

export function ForgotPassword() {
  //router variable
  const router = useRouter();

  //global state variable
  const { resetUser, authenticated } = useAuthStore();

  useEffect(() => {
    if (authenticated) {
      router.replace("/");
    }
  }, [authenticated, router]);

  if (authenticated) {
    return null;
  }

  return !resetUser ? <FindAccount /> : <ResetPassowrd />;
}
