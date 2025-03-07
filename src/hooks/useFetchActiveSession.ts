import { useQuery } from "@tanstack/react-query";
import { ACTIVE_GAME_QUERY_KEY } from "../utils/constants";
import { fetchActiveGameSession } from "../api/game";

export const useFetchActiveSession = () => {
  return useQuery({
    queryKey: [ACTIVE_GAME_QUERY_KEY],
    queryFn: () => fetchActiveGameSession(),
  });
};
