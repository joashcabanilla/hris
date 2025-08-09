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

const fetchRequest = async (method: string, endpoint: string, data?: unknown) => {
  let token: string | null = null;

  if (typeof window !== "undefined") {
    const authData = sessionStorage.getItem("auth-store");
    if (authData) {
      try {
        const parsed = JSON.parse(authData);
        token = parsed?.state?.token ?? null;
      } catch (error) {
        console.error("Failed to parse auth-store from sessionStorage", error);
      }
    }
  }

  const headers = {
    ...defaultHeaders,
    ...(token && { Authorization: `Bearer ${token}` })
  };

  const res = await fetch(`${BASE_URL}/${endpoint}`, {
    method: method,
    headers: headers,
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    if (res?.status == 422) {
      const errorData: ValidationError = await res.json();
      throw errorData;
    }

    if (res?.status == 401 && res?.statusText == "Unauthorized") {
      const errorData: { message: string } = await res.json();
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
export const logout = () => fetchRequest("POST", "logout");
export const refreshToken = () => fetchRequest("POST", "refreshToken");
