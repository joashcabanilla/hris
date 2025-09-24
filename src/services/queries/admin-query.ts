import { useQuery } from "@tanstack/react-query";
import { RefreshTokenHook } from "@/hooks/use-refreshtoken";
import { getUsertypeList, getUserList, getEmployeeList } from "@/services/api/admin-api";

export const useGetUsertypeList = () => {
  return useQuery({
    queryKey: ["adminGetUsertypeList"],
    queryFn: () => getUsertypeList(),
    retry: (failureCount, error) => RefreshTokenHook(failureCount, error)
  });
};

export const useGetUserList = () => {
  return useQuery({
    queryKey: ["adminGetUserList"],
    queryFn: () => getUserList(),
    retry: (failureCount, error) => RefreshTokenHook(failureCount, error)
  });
};

export const useGetEmployeeList = () => {
  return useQuery({
    queryKey: ["adminGetEmployeeList"],
    queryFn: () => getEmployeeList(),
    retry: (failureCount, error) => RefreshTokenHook(failureCount, error)
  });
};
