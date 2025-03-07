import { useQuery } from "@tanstack/react-query";
import { GAME_QUERY_KEY } from "../utils/constants";
import { fetchAGameSession } from "../api/game";

export const useFetchGameSession = (gameId: string) => {
  return useQuery({
    queryKey: [GAME_QUERY_KEY, gameId],
    queryFn: () => fetchAGameSession(gameId),
    enabled: !!gameId,
    select: (result) => (result.success ? result.data : null),
  });
};
