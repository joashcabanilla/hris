import fetchRequest from "@/services/api/fetchrequest-api";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL! + "/account";
export type updateProfilePictureProps = FormData;
export const updateProfilePicture = (data: updateProfilePictureProps) =>
  fetchRequest(BASE_URL, "POST", "updateProfilePicture", data, true);
