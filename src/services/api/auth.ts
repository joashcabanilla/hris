const BASE_URL = process.env.NEXT_PUBLIC_API_URL! + "/auth";

const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json"
};

export interface loginData {
  username: string;
  password: string;
}

export const login = async (data: loginData) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    throw await res.json();
  } else {
    return res.json();
  }
};

export interface lockedUserData {
  id: string;
}
export const lockedUser = async (data: lockedUserData) => {
  const res = await fetch(`${BASE_URL}/lockeduser`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify(data)
  });

  return res.json();
};
