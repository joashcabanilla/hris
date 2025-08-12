import { useMutation } from "@tanstack/react-query";
import { RefreshTokenHook } from "@/hooks/use-refreshtoken";
import { updateProfilePictureProps, updateProfilePicture } from "@/services/api/account-api";

export const useUpdateProfilePicture = () => {
  return useMutation({
    mutationKey: ["accountUpdateProfilePicture"],
    mutationFn: (data: updateProfilePictureProps) => updateProfilePicture(data),
    retry: (failureCount, error) => RefreshTokenHook(failureCount, error)
  });
};
