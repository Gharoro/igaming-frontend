import { useQuery } from "@tanstack/react-query";
import { USER_STATS_QUERY_KEY } from "../utils/constants";
import { fetchUserStats } from "../api/game";
import { useAppStore } from "../store/useAppStore";

export const useFetchUserStats = () => {
  const { setUser } = useAppStore();

  return useQuery({
    queryKey: [USER_STATS_QUERY_KEY],
    queryFn: async () => {
      const result = await fetchUserStats();
      if (result.success && result.data) {
        setUser(result.data);
      }
      return result;
    },
    placeholderData: (previousData) => previousData,
    refetchOnWindowFocus: true,
  });
};
