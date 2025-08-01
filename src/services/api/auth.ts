const BASE_URL = process.env.NEXT_PUBLIC_API_URL! + "/auth";

const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json"
};

export type ValidationError = {
  message: string;
  errors?: Record<string, string[]>;
};

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

const fetchRequest = async (method: string, endpoint: string, data: unknown) => {
  const res = await fetch(`${BASE_URL}/${endpoint}`, {
    method: method,
    headers: defaultHeaders,
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    if (res?.status == 422) {
      const errorData: ValidationError = await res.json();
      throw errorData;
    }
  }
  return res.json();
};

export const login = (data: loginProps) => fetchRequest("POST", "login", data);
export const lockedUser = (data: userIdProps) => fetchRequest("POST", "lockeduser", data);
export const resendOtp = (data: userIdProps) => fetchRequest("POST", "resendOTP", data);
export const verifyEmail = (data: validateOtpProps) => fetchRequest("POST", "verifyEmail", data);
export const findAccount = (data: findAccountProps) => fetchRequest("POST", "findAccount", data);
export const validateOtp = (data: validateOtpProps) => fetchRequest("POST", "validateOtp", data);
export const updateUserCredential = (data: userCredentialProps) =>
  fetchRequest("PATCH", "updateUserCredential", data);
