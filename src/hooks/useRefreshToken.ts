import { useMutation, useQueryClient } from "@tanstack/react-query";
import { callRefreshToken } from "../api/auth";
import { REFRESH_TOKEN_QUERY_KEY } from "../utils/constants";
import { useAppStore } from "../store/useAppStore";

export const useRefreshToken = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => callRefreshToken(),
    onSuccess: (response) => {
      const { setAccessToken, setUser } = useAppStore.getState();

      if (response?.data) {
        setAccessToken(response.data.accessToken);
        setUser(response.data.user);
      }

      queryClient.invalidateQueries({ queryKey: [REFRESH_TOKEN_QUERY_KEY] });
    },
    onError: () => {
      const { clearAuth } = useAppStore.getState();
      clearAuth();
      window.location.href = "/login";
    },
  });
};
