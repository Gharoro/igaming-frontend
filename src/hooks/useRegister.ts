import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerUser } from "../api/auth";
import { REGISTER_QUERY_KEY } from "../utils/constants";

export const useRegisterUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (username: string) => registerUser(username),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [REGISTER_QUERY_KEY] });
    },
  });
};
