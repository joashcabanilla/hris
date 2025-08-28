import fetchRequest from "@/services/api/fetchrequest-api";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL! + "/admin";

//GET METHOD
export const getUsertypeList = () => fetchRequest(BASE_URL, "GET", "getUsertypeList");
export const getUserList = () => fetchRequest(BASE_URL, "GET", "getUserList");

export interface UserStatusProps {
  id: string;
  status: string;
}

//POST METHOD
export const updateUserStatus = (data: UserStatusProps) =>
  fetchRequest(BASE_URL, "POST", "updateUserStatus", data);
