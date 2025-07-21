const BASE_URL = process.env.NEXT_PUBLIC_API_URL! + "/auth";

const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json"
};

export interface loginProps {
  username: string;
  password: string;
}

export interface userIdProps {
  id: string;
}

const fetchRequest = async (method: string, endpoint: string, data: unknown) => {
  const res = await fetch(`${BASE_URL}/${endpoint}`, {
    method: method,
    headers: defaultHeaders,
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    throw await res.json();
  } else {
    return res.json();
  }
};

export const login = (data: loginProps) => fetchRequest("POST", "login", data);
export const lockedUser = (data: userIdProps) => fetchRequest("POST", "lockeduser", data);
export const resendOtp = (data: userIdProps) => fetchRequest("POST", "resendOTP", data);
