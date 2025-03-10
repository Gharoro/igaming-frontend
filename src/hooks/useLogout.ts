import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../api/auth";
import { LOGOUT_QUERY_KEY } from "../utils/constants";

export const useLogoutUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LOGOUT_QUERY_KEY] });
    },
  });
};
