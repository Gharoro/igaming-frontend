export interface User {
  id: string;
  username: string;
  wins: number;
  losses: number;
  createdAt: string;
}

export interface GameSession {
  id: string;
  winningNumber: number;
  isActive: boolean;
  startedAt: string;
  endedAt: string;
  duration: number;
  sessionToken: string;
}

export interface LoginResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data?: {
    user: User;
    accessToken: string;
  };
}

export interface RegisterResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data?: {
    user: User;
  };
}

export interface RefreshTokenResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data?: {
    user: User;
    accessToken: string;
  };
}

export interface DefaultApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
}

export interface ActiveGameSessionResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data?: SessionUpdate;
}

export interface PlayerStatusResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data?: {
    session: GameSession | null;
    selectedNumber: number;
  };
}

export interface GameResultResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data?: {
    winningNumber: number;
    totalPlayers: number;
    totalWins: number;
    winners: { user: { username: string } }[];
    nextSessionIn: number;
  };
}

export interface SessionUpdate {
  session: GameSession | null;
  timeLeftInSeconds: number | null;
  nextSessionIn: number | null;
  status: string;
  totalPlayers: number | null;
}

export interface JoinedSessionUpdate {
  totalPlayers: number;
  lastJoinedPlayer: string;
}

export interface PlayerStatusResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data?: {
    session: GameSession | null;
    selectedNumber: number;
  };
}

export interface GameResultSocketResponse {
  winningNumber: number;
  totalPlayers: number;
  totalWins: number;
  winners: { user: { username: string } }[];
  nextSessionIn: number;
}

export interface UserStatsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data?: User;
}
