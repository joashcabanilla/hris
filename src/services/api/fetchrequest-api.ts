export type ValidationError = {
  message: string;
  errors?: Record<string, string[]>;
};

const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json"
};

export default async function fetchRequest(
  BASE_URL: string,
  method: string,
  endpoint: string,
  data?: unknown,
  isFormData: boolean = false
) {
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
    ...(!isFormData ? defaultHeaders : { Accept: "application/json" }),
    ...(token && { Authorization: `Bearer ${token}` })
  };

  const res = await fetch(`${BASE_URL}/${endpoint}`, {
    method: method,
    headers: headers,
    body: isFormData ? (data as FormData) : JSON.stringify(data)
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
}
