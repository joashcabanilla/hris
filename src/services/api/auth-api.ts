import fetchRequest from "@/services/api/fetchrequest-api";

export interface loginProps {
  username: string;
  password: string;
}

export interface userIdProps {
  id: string;
}

export interface validateOtpProps {
  id: string;
  otp: string;
}

export interface findAccountProps {
  email: string;
}

export interface userCredentialProps {
  id: string;
  username: string;
  password: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL! + "/auth";

export const login = (data: loginProps) => fetchRequest(BASE_URL, "POST", "login", data);
export const lockedUser = (data: userIdProps) => fetchRequest(BASE_URL, "POST", "lockeduser", data);
export const resendOtp = (data: userIdProps) => fetchRequest(BASE_URL, "POST", "resendOTP", data);
export const verifyEmail = (data: validateOtpProps) =>
  fetchRequest(BASE_URL, "POST", "verifyEmail", data);
export const findAccount = (data: findAccountProps) =>
  fetchRequest(BASE_URL, "POST", "findAccount", data);
export const validateOtp = (data: validateOtpProps) =>
  fetchRequest(BASE_URL, "POST", "validateOtp", data);
export const updateUserCredential = (data: userCredentialProps) =>
  fetchRequest(BASE_URL, "POST", "updateUserCredential", data);
export const logout = () => fetchRequest(BASE_URL, "POST", "logout");
export const refreshToken = () => fetchRequest(BASE_URL, "POST", "refreshToken");
