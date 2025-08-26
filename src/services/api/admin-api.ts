import fetchRequest from "@/services/api/fetchrequest-api";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL! + "/admin";

export const getUsertypeList = () => fetchRequest(BASE_URL, "GET", "getUsertypeList");
export const getUserList = () => fetchRequest(BASE_URL, "GET", "getUserList");
