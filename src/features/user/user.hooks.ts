import { useQuery } from "@tanstack/react-query";
import type { User } from "./user.types";

export const useMe = () => {
  return useQuery<User>({
    queryKey: ["me"],
    queryFn: () => {
      throw new Error("User should be set via queryClient.setQueryData");
    },
    enabled: false,
    staleTime: Infinity,
  });
};
