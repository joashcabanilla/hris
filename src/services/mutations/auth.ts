import { useMutation } from "@tanstack/react-query";
import {
  loginProps,
  userIdProps,
  validateOtpProps,
  findAccountProps,
  userCredentialProps,
  login,
  lockedUser,
  resendOtp,
  verifyEmail,
  findAccount,
  validateOtp,
  updateUserCredential,
  logout
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

export const useVerifyEmail = () => {
  return useMutation({
    mutationKey: ["authVerifyEmail"],
    mutationFn: (data: validateOtpProps) => verifyEmail(data)
  });
};

export const useFindAccount = () => {
  return useMutation({
    mutationKey: ["authFindAccount"],
    mutationFn: (data: findAccountProps) => findAccount(data)
  });
};

export const useValidateOtp = () => {
  return useMutation({
    mutationKey: ["authValidateOtp"],
    mutationFn: (data: validateOtpProps) => validateOtp(data)
  });
};

export const useUpdateUserCredential = () => {
  return useMutation({
    mutationKey: ["authUpdateUserCredential"],
    mutationFn: (data: userCredentialProps) => updateUserCredential(data)
  });
};

export const useLogout = () => {
  return useMutation({
    mutationKey: ["authLogout"],
    mutationFn: () => logout()
  });
};
