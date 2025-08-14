import { useMutation } from "@tanstack/react-query";
import { RefreshTokenHook } from "@/hooks/use-refreshtoken";
import {
  updateProfilePictureProps,
  updateProfilePicture,
  updateUserInfoProps,
  updateUserInfo
} from "@/services/api/account-api";

export const useUpdateProfilePicture = () => {
  return useMutation({
    mutationKey: ["accountUpdateProfilePicture"],
    mutationFn: (data: updateProfilePictureProps) => updateProfilePicture(data),
    retry: (failureCount, error) => RefreshTokenHook(failureCount, error)
  });
};

export const useUpdateUserInfo = () => {
  return useMutation({
    mutationKey: ["accountUpdateUserInfo"],
    mutationFn: (data: updateUserInfoProps) => updateUserInfo(data),
    retry: (failureCount, error) => RefreshTokenHook(failureCount, error)
  });
};
