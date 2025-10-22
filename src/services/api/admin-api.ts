import fetchRequest from "@/services/api/fetchrequest-api";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL! + "/admin";

//GET METHOD
export const getUsertypeList = () => fetchRequest(BASE_URL, "GET", "getUsertypeList");
export const getUserList = () => fetchRequest(BASE_URL, "GET", "getUserList");
export const getEmployeeList = (queryParams: string | null) =>
  fetchRequest(BASE_URL, "GET", "getEmployeeList" + (queryParams === null ? "" : queryParams));
export const getDepartmentList = () => fetchRequest(BASE_URL, "GET", "getDepartmentList");
export const getPositionList = () => fetchRequest(BASE_URL, "GET", "getPositionList");
export const getEmploymentStatusList = () =>
  fetchRequest(BASE_URL, "GET", "getEmploymentStatusList");
export const getCivilStatusList = () => fetchRequest(BASE_URL, "GET", "getCivilStatusList");
export const getRegionList = () => fetchRequest(BASE_URL, "GET", "getRegionList");
export const getProvinceList = () => fetchRequest(BASE_URL, "GET", "getProvinceList");
export const getCityList = () => fetchRequest(BASE_URL, "GET", "getCityList");
export const getBarangayList = () => fetchRequest(BASE_URL, "GET", "getBarangayList");

export interface UserStatusProps {
  id: string;
  status: string;
}

//POST METHOD
export const updateUserStatus = (data: UserStatusProps) =>
  fetchRequest(BASE_URL, "POST", "updateUserStatus", data);
