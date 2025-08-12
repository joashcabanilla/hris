import { useAuthStore } from "@/store/auth-store";
import { refreshToken } from "@/services/api/auth-api";

export const RefreshTokenHook = (failureCount: number, error: { message: string }) => {
  const { setToken } = useAuthStore.getState();
  if (failureCount < 2 && error && error.message === "Unauthenticated.") {
    refreshToken().then((res) => {
      if (res?.token) {
        setToken(res.token);
      }
    });
    return true;
  }
  return false;
};
