import { useMutation } from "@tanstack/react-query";
import { login, loginData, lockedUser, lockedUserData } from "@/services/api/auth";

export const useLogin = () => {
  return useMutation({
    mutationKey: ["authLogin"],
    mutationFn: (data: loginData) => login(data)
  });
};

export const useLockedUser = () => {
  return useMutation({
    mutationKey: ["authLockedUser"],
    mutationFn: (data: lockedUserData) => lockedUser(data)
  });
};
