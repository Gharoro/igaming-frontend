import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { FaRegClock } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
import { useWebSocket } from "../hooks/useWebSocket";
import { GameResultSocketResponse } from "../interfaces/interface";
import { useAppStore } from "../store/useAppStore";
import CountDownTimer from "../components/CountDownTimer";
import { useFetchGameSessionResult } from "../hooks/useFetchGameResult";
import { showError } from "../utils/responses";
import { getInitials } from "../utils/getInitials";
import { GAME_RESULT_EVENT, GAME_RESULT_MESSAGE } from "../utils/constants";
import { formatNumber } from "../utils/formatNumber";

export default function Result() {
  const { listen, unlisten, socket } = useWebSocket();
  const { timeLeft } = useAppStore();
  const { id } = useParams<{ id: string }>();
  const [gameResult, setGameResult] = useState<GameResultSocketResponse | null>(
    null
  );
  const { data, error } = useFetchGameSessionResult(id as string);

  const handleGameResultFetched = useCallback(() => {
    if (data) setGameResult(data);
    if (error) return showError(error.message);
  }, [data, error]);

  useEffect(() => {
    handleGameResultFetched();
  }, [handleGameResultFetched]);

  // Listen for WebSocket game result
  useEffect(() => {
    listen(GAME_RESULT_EVENT, (data) => {
      setGameResult(data);
    });

    return () => {
      unlisten(GAME_RESULT_EVENT);
    };
  }, [listen, unlisten]);

  const getGameResult = () => {
    if (socket) {
      // Send request for game result
      socket.emit(GAME_RESULT_MESSAGE, { gameId: id });
    }
  };

  return (
    <div className="flex flex-col my-12">
      <Link
        className="flex space-x-2 items-center px-6 py-4 md:w-fit text-center text-white bg-secondary border border-[#8b5cf6] rounded active:text-secondary hover:bg-transparent hover:text-secondary focus:outline-none focus:ring font-semibold"
        to="/home"
      >
        <IoMdArrowBack className="font-semibold" />
        <span>Play Again</span>
      </Link>
      {!gameResult && (
        <>
          <h2 className="text-white text-xl text-center my-8">
            Waiting for game result. Hang tight!
          </h2>

          <div className="mt-8 text-center flex flex-col justify-center items-center space-y-4">
            <FaRegClock className="text-orange-400 text-xl" />
            <h1 className="text-white text-xl font-bold">Time Left</h1>
            <span className="text-orange-400 text-xl font-bold">
              {timeLeft && (
                <CountDownTimer
                  countdownType="timeLeft"
                  onComplete={() => getGameResult()}
                />
              )}
            </span>
          </div>
        </>
      )}

      <div className="border border-[#9ba2ae] rounded light-bg w-full p-6 space-y-4 mt-12 flex flex-col justify-center items-center">
        <h1 className="text-tertiary text-2xl font-semibold">Winning Number</h1>
        <h1 className="text-success font-bold text-4xl">
          {gameResult?.winningNumber || "-"}
        </h1>
      </div>

      <div className="mt-12 flex w-full space-x-8 items-center">
        <div className="border border-[#9ba2ae] rounded light-bg w-full p-6 space-y-2">
          <h2 className="text-tertiary font-bold text-xl">Total Players</h2>
          <h3 className="text-3xl font-bold text-white">
            {formatNumber(gameResult?.totalPlayers || 0) || "-"}
          </h3>
        </div>
        <div className="border border-[#9ba2ae] rounded light-bg w-full p-6 space-y-2">
          <h2 className="text-tertiary font-bold text-xl">Total Wins</h2>
          <h3 className="text-3xl font-bold text-success">
            {formatNumber(gameResult?.totalWins || 0) || "-"}
          </h3>
        </div>
      </div>

      <div className="border border-[#9ba2ae] rounded light-bg w-full p-6 space-y-4 mt-12 flex flex-col">
        <div className="border-b border-b-[#9ba2ae] pb-4 flex justify-between items-center">
          <h1 className="text-tertiary text-2xl font-semibold">Winners</h1>

          <h1 className="text-white text-2xl font-semibold">Selected Number</h1>
        </div>
        {gameResult?.winners.map((winner, i) => (
          <div
            key={i}
            className="flex justify-between items-center w-full border-b border-b-[#9ba2ae] pb-4"
          >
            <div className="flex space-x-4 items-center">
              <div className="inline-flex items-center justify-center w-10 h-10 text-xl text-white bg-[#8b5cf6] rounded-full">
                {getInitials(winner.user.username)}
              </div>
              <h1 className="text-white font-semibold text-2xl">
                {winner.user.username}
              </h1>
            </div>

            <h3 className="text-3xl font-bold text-success">
              {gameResult.winningNumber}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
