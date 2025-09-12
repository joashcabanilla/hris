import { useQuery } from "@tanstack/react-query";
import { RefreshTokenHook } from "@/hooks/use-refreshtoken";
import { getPrefixSuffixList } from "@/services/api/account-api";

export const useGetPrefixSuffixList = () => {
  return useQuery({
    queryKey: ["accountGetPrefixSuffixList"],
    queryFn: () => getPrefixSuffixList(),
    retry: (failureCount, error) => RefreshTokenHook(failureCount, error)
  });
};
