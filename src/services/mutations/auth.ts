import { useMutation } from "@tanstack/react-query";
import {
  login,
  loginProps,
  lockedUser,
  userIdProps,
  resendOtp,
  validateOtp
} from "@/services/api/auth";

export const useLogin = () => {
  return useMutation({
    mutationKey: ["authLogin"],
    mutationFn: (data: loginProps) => login(data)
  });
};

export const useLockedUser = () => {
  return useMutation({
    mutationKey: ["authLockedUser"],
    mutationFn: (data: userIdProps) => lockedUser(data)
  });
};

export const useResendOtp = () => {
  return useMutation({
    mutationKey: ["authResendOtp"],
    mutationFn: (data: userIdProps) => resendOtp(data)
  });
};

export const useValidateOtp = () => {
  return useMutation({
    mutationKey: ["authValidateOtp"],
    mutationFn: (data: userIdProps) => validateOtp(data)
  });
};
