import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PLAY_GAME_QUERY_KEY } from "../utils/constants";
import { submitSelectedNumber } from "../api/game";

export const useSubmitNumber = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      gameSessionId,
      selectedNumber,
    }: {
      gameSessionId: string;
      selectedNumber: number;
    }) => submitSelectedNumber(gameSessionId, selectedNumber),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PLAY_GAME_QUERY_KEY] });
    },
  });
};
