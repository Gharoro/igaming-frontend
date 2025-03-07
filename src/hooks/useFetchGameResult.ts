import { useQuery } from "@tanstack/react-query";
import { GAME_RESULT_QUERY_KEY } from "../utils/constants";
import { fetchGameResult } from "../api/game";

export const useFetchGameSessionResult = (gameId: string) => {
  return useQuery({
    queryKey: [GAME_RESULT_QUERY_KEY, gameId],
    queryFn: () => fetchGameResult(gameId),
    enabled: !!gameId,
    select: (result) => (result.success ? result.data : null),
  });
};
