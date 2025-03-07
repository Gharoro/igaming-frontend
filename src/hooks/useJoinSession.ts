import { useMutation, useQueryClient } from "@tanstack/react-query";
import { JOIN_GAME_QUERY_KEY } from "../utils/constants";
import { joinActiveSession } from "../api/game";

export const useJoinSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (gameSessionId: string) => joinActiveSession(gameSessionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [JOIN_GAME_QUERY_KEY] });
    },
  });
};
