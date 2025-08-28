import { useMutation } from "@tanstack/react-query";
import { RefreshTokenHook } from "@/hooks/use-refreshtoken";
import { updateUserStatus, type UserStatusProps } from "@/services/api/admin-api";

export const useUpdateUserStatus = () => {
  return useMutation({
    mutationKey: ["adminUpdateUserStatus"],
    mutationFn: (data: UserStatusProps) => updateUserStatus(data),
    retry: (failureCount, error) => RefreshTokenHook(failureCount, error)
  });
};
