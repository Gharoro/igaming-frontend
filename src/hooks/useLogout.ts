import { useMutation } from "@tanstack/react-query";
import { logout } from "../api/auth";
import { useAppStore } from "../store/useAppStore";

export const useLogoutUser = () => {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      const { clearAuth } = useAppStore.getState();
      clearAuth();
      window.location.href = "/login";
    },
  });
};
