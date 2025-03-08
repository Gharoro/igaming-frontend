import { FaRegClock } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useCallback, useEffect, useState } from "react";
import { useAppStore } from "../store/useAppStore";
import { formatNumber } from "../utils/formatNumber";
import { GameSession, SessionUpdate } from "../interfaces/interface";
import { useFetchActiveSession } from "../hooks/useFetchActiveSession";
import Loader from "../components/Loader";
import CountDownTimer from "../components/CountDownTimer";
import { useWebSocket } from "../hooks/useWebSocket";
import { useJoinSession } from "../hooks/useJoinSession";
import { showSuccess } from "../utils/responses";
import Spinner from "../components/Spinner";
import { SESSION_UPDATE_EVENT } from "../utils/constants";
import { useFetchUserStats } from "../hooks/useFetchUserStats";

export default function Home() {
  const { setNextSessionIn, timeLeft, setTimeLeft } = useAppStore();
  const [gameSession, setGameSession] = useState<GameSession | null>(null);

  const { data, isPending } = useFetchActiveSession();
  const { data: userStats, isPending: isLoading } = useFetchUserStats();
  const { mutate, isPending: isJoining } = useJoinSession();
  const { listen, unlisten } = useWebSocket();
  const navigate = useNavigate();

  const updateSession = useCallback(
    (sessionData: SessionUpdate) => {
      setNextSessionIn(sessionData?.nextSessionIn ?? null);
      setGameSession(sessionData?.session ?? null);
      setTimeLeft(sessionData?.timeLeftInSeconds ?? null);
    },
    [setNextSessionIn, setGameSession, setTimeLeft]
  );

  // Fetch initial session data from API
  useEffect(() => {
    if (data?.data) {
      updateSession(data?.data);
    }
  }, [data, updateSession]);

  // Listen for WebSocket session updates
  useEffect(() => {
    listen(SESSION_UPDATE_EVENT, (data) => {
      updateSession(data);
    });

    return () => {
      unlisten(SESSION_UPDATE_EVENT);
    };
  }, [listen, unlisten, updateSession]);

  const handleJoinSession = () => {
    if (gameSession) {
      mutate(gameSession?.id, {
        onSuccess: (response) => {
          showSuccess(response.message);
          navigate(`/game/${gameSession.id}/play`);
        },
      });
    }
  };

  if (isLoading) return <Loader count={10} />;

  return (
    <div className="flex flex-col mt-12">
      <div className="space-y-4">
        <h1 className="text-white text-4xl">
          Hi, {userStats?.data?.username}!
        </h1>
        <p className="text-tertiary">Welcome back to your gaming session</p>
      </div>

      <div className="mt-12 flex flex-col lg:flex-row w-full space-x-0 space-y-8 lg:space-y-0 lg:space-x-8 items-center">
        <div className="border border-[#9ba2ae] rounded light-bg w-full p-6 space-y-2">
          <h2 className="text-success font-bold text-xl">Total Wins</h2>
          <h3 className="text-3xl font-bold text-white">
            {formatNumber(userStats?.data?.wins || 0)}
          </h3>
        </div>
        <div className="border border-[#9ba2ae] rounded light-bg w-full p-6 space-y-2">
          <h2 className="text-error font-bold text-xl">Total Loses</h2>
          <h3 className="text-3xl font-bold text-white">
            {userStats?.data?.losses || 0}
          </h3>
        </div>
      </div>

      {isPending ? (
        <Loader count={4} />
      ) : (
        <div className="border border-[#9ba2ae] rounded light-bg w-full p-6 space-y-8 mt-12 flex flex-col justify-center items-center">
          {timeLeft ? (
            <>
              <FaRegClock className="text-orange-400 text-3xl" />
              <p className="text-white text-center">
                There's an active session you can join in{" "}
                <CountDownTimer countdownType="timeLeft" />
              </p>

              <button
                className="flex justify-center items-center px-6 py-4 md:min-w-[220px] text-center text-white bg-secondary border border-[#8b5cf6] rounded active:text-secondary hover:bg-transparent hover:text-secondary focus:outline-none focus:ring font-semibold"
                disabled={isJoining}
                onClick={handleJoinSession}
              >
                {isJoining ? <Spinner color="white" /> : "Join Now"}
              </button>
            </>
          ) : (
            <p className="text-white">Waiting for next game session...</p>
          )}
        </div>
      )}
    </div>
  );
}
