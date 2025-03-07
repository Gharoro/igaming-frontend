import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "../api/auth";
import { LOGIN_QUERY_KEY } from "../utils/constants";

export const useLoginUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (username: string) => loginUser(username),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LOGIN_QUERY_KEY] });
    },
  });
};
