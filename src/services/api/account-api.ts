import fetchRequest from "@/services/api/fetchrequest-api";

export type updateProfilePictureProps = FormData;
export interface updateUserInfoProps {
  id: string;
  firstname: string;
  middlename?: string;
  lastname: string;
  email: string;
  username?: string;
  password?: string;
  usertype?: number;
}
const BASE_URL = process.env.NEXT_PUBLIC_API_URL! + "/account";

export const updateProfilePicture = (data: updateProfilePictureProps) =>
  fetchRequest(BASE_URL, "POST", "updateProfilePicture", data, true);

export const updateUserInfo = (data: updateUserInfoProps) =>
  fetchRequest(BASE_URL, "POST", "updateUserInfo", data);
