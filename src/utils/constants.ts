// React Query
export const REGISTER_QUERY_KEY = "register";
export const LOGIN_QUERY_KEY = "login";
export const REFRESH_TOKEN_QUERY_KEY = "refresh_token";
export const LOGOUT_QUERY_KEY = "logout";
export const ACTIVE_GAME_QUERY_KEY = "active_game";
export const GAME_QUERY_KEY = "game_session";
export const JOIN_GAME_QUERY_KEY = "join_game";
export const PLAY_GAME_QUERY_KEY = "play_game";
export const GAME_RESULT_QUERY_KEY = "game_result";
export const USER_STATS_QUERY_KEY = "user_stats";

// Api Endpoint
export const REGISTER = "/auth/register";
export const LOGIN = "/auth/login";
export const LOGOUT = "/auth/logout";
export const REFRESH_TOKEN = "/auth/refresh-token";
export const FETCH_ACTIVE_GAME_SESSION = "/game/active";
export const FETCH_SINGLE_GAME_SESSION = "/game/session";
export const JOIN_GAME_SESSION = "/game/join";
export const PLAY_GAME = "/game/play";
export const FETCH_GAME_RESULT = "/game/result";
export const FETCH_USER_STATS = "/game/user-stats";

export const GAME_NUMBERS = [
  {
    text: "1",
    value: 1,
  },
  {
    text: "2",
    value: 2,
  },
  {
    text: "3",
    value: 3,
  },
  {
    text: "4",
    value: 4,
  },
  {
    text: "5",
    value: 5,
  },
  {
    text: "6",
    value: 6,
  },
  {
    text: "7",
    value: 7,
  },
  {
    text: "8",
    value: 8,
  },
  {
    text: "9",
    value: 9,
  },
  {
    text: "10",
    value: 10,
  },
];

// Websocket
export const GAME_RESULT_MESSAGE = "getGameResult";
export const GAME_RESULT_EVENT = "gameResult";
export const PLAYER_JOINED_EVENT = "playerJoined";
export const SESSION_UPDATE_EVENT = "sessionUpdate";
