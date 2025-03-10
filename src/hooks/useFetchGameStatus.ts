import { useQuery } from "@tanstack/react-query";
import { GAME_STATUS_QUERY_KEY } from "../utils/constants";
import { fetchGameStatus } from "../api/game";

export const useFetchGameStatus = (gameId: string) => {
  return useQuery({
    queryKey: [GAME_STATUS_QUERY_KEY, gameId],
    queryFn: () => fetchGameStatus(gameId),
    enabled: !!gameId,
    select: (result) => (result.success ? result.data : null),
  });
};
