import axiosInstance from "./axiosInstance";
import { handleApiError } from "../utils/apiError";
import {
  FETCH_ACTIVE_GAME_SESSION,
  FETCH_GAME_RESULT,
  FETCH_SINGLE_GAME_SESSION,
  FETCH_USER_STATS,
  JOIN_GAME_SESSION,
  PLAY_GAME,
} from "../utils/constants";
import {
  ActiveGameSessionResponse,
  DefaultApiResponse,
  GameResultResponse,
  UserStatsResponse,
} from "../interfaces/interface";

// Fetch active game session
export const fetchActiveGameSession =
  async (): Promise<ActiveGameSessionResponse> => {
    try {
      const { data } = await axiosInstance.get<ActiveGameSessionResponse>(
        FETCH_ACTIVE_GAME_SESSION
      );
      return data;
    } catch (error) {
      return handleApiError(error);
    }
  };

// Join active session
export const joinActiveSession = async (
  gameSessionId: string
): Promise<DefaultApiResponse> => {
  try {
    const { data } = await axiosInstance.post<DefaultApiResponse>(
      JOIN_GAME_SESSION,
      {
        gameSessionId,
      }
    );
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Fetch single game session
export const fetchAGameSession = async (
  gameId: string
): Promise<ActiveGameSessionResponse> => {
  try {
    const { data } = await axiosInstance.get<ActiveGameSessionResponse>(
      `${FETCH_SINGLE_GAME_SESSION}/${gameId}`
    );
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Submit selected number
export const submitSelectedNumber = async (
  gameSessionId: string,
  selectedNumber: number
): Promise<DefaultApiResponse> => {
  try {
    const { data } = await axiosInstance.put<DefaultApiResponse>(PLAY_GAME, {
      gameSessionId,
      selectedNumber,
    });
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Fetch game result
export const fetchGameResult = async (
  gameId: string
): Promise<GameResultResponse> => {
  const { data } = await axiosInstance.get<GameResultResponse>(
    `${FETCH_GAME_RESULT}/${gameId}`
  );
  return data;
};

// Fetch player stats
export const fetchUserStats = async (): Promise<UserStatsResponse> => {
  const { data } = await axiosInstance.get<UserStatsResponse>(FETCH_USER_STATS);
  return data;
};
