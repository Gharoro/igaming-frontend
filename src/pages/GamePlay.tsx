/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { FaRegClock } from "react-icons/fa";
import {
  GAME_NUMBERS,
  PLAYER_JOINED_EVENT,
  SESSION_UPDATE_EVENT,
} from "../utils/constants";
import { useAppStore } from "../store/useAppStore";
import CountDownTimer from "../components/CountDownTimer";
import { useFetchGameSession } from "../hooks/useFetchGameSession";
import Loader from "../components/Loader";
import { useWebSocket } from "../hooks/useWebSocket";
import { useSubmitNumber } from "../hooks/useSubmitNumber";
import { showSuccess } from "../utils/responses";
import Spinner from "../components/Spinner";

export default function GamePlay() {
  const [selectedNumber, setSelectedNumber] = useState<number>(-1);
  const [totalPlayers, setTotalPlayers] = useState<number | null>(null);
  const { timeLeft, setTimeLeft, setNextSessionIn } = useAppStore();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading } = useFetchGameSession(id as string);
  const { mutate, isPending } = useSubmitNumber();
  const { listen, unlisten } = useWebSocket();

  const handleGameSessionFetched = useCallback(() => {
    if (data && data.timeLeftInSeconds) setTimeLeft(data?.timeLeftInSeconds);
    if (data && data.totalPlayers) setTotalPlayers(data?.totalPlayers);
    if (data && data.nextSessionIn) {
      setNextSessionIn(data?.nextSessionIn);
      navigate("/home");
    }
  }, [data]);

  useEffect(() => {
    handleGameSessionFetched();
  }, [handleGameSessionFetched]);

  // Listen for WebSocket session updates
  useEffect(() => {
    listen(SESSION_UPDATE_EVENT, (data) => {
      if (data && data.timeLeftInSeconds) setTimeLeft(data?.timeLeftInSeconds);
      if (data && data.nextSessionIn) {
        setNextSessionIn(data?.nextSessionIn);
        navigate("/home");
      }
    });

    return () => {
      unlisten(SESSION_UPDATE_EVENT);
    };
  }, [listen, unlisten]);

  // Listen for WebSocket players joined
  useEffect(() => {
    listen(PLAYER_JOINED_EVENT, (data) => {
      if (data.totalPlayers) setTotalPlayers(data.totalPlayers);
    });

    return () => {
      unlisten(PLAYER_JOINED_EVENT);
    };
  }, [listen, unlisten]);

  const handleNumberSelect = (num: number) => {
    setSelectedNumber(num);
  };

  const handleSubmitNumber = () => {
    const payload = {
      gameSessionId: id as string,
      selectedNumber,
    };
    mutate(payload, {
      onSuccess: (response) => {
        setSelectedNumber(-1);
        showSuccess(response.message);
        navigate(`/game/${id}/result`);
      },
    });
  };

  if (isLoading) {
    return <Loader count={10} />;
  }

  return (
    <div className="flex flex-col my-12 justify-center items-center">
      <div className="space-y-4 text-center">
        <h1 className="text-white text-4xl">It's Game Time!</h1>
        <p className="text-tertiary">
          Pick a number to lock in. Results will be displayed when the session
          ends
        </p>
      </div>

      <div className="mt-8 text-center flex flex-col justify-center items-center space-y-4">
        <FaRegClock className="text-orange-400 text-2xl" />
        <h1 className="text-white text-3xl font-bold">Time Left</h1>
        <span className="text-orange-400 text-2xl font-bold">
          {timeLeft && <CountDownTimer countdownType="timeLeft" />}
        </span>
      </div>

      <div className="border border-[#9ba2ae] rounded light-bg w-full lg:w-fit p-8 space-y-8 mt-12 flex flex-col justify-center items-center">
        <h6 className="text-2xl font-bold text-white">Select your number</h6>
        <div className="grid grid-cols-5 gap-4">
          {GAME_NUMBERS.map((num) => (
            <button
              key={num.value}
              onClick={() => handleNumberSelect(num.value)}
              className={`${
                selectedNumber === num.value ? "bg-[#8b5cf6]" : "bg-[#374151]"
              }  text-white font-bold rounded-md w-12 h-12 flex justify-center items-center hover:bg-[#8b5cf6] mt-2`}
            >
              {num.text}
            </button>
          ))}
        </div>

        <button
          disabled={isPending}
          onClick={handleSubmitNumber}
          className={`flex justify-center items-center px-6 py-2 w-full text-center text-white font-bold bg-[#8b5cf6] border border-[#8b5cf6] rounded focus:outline-none focus:ring ${
            isPending && "opacity-30"
          }`}
        >
          {isPending ? <Spinner color="white" /> : "Submit"}
        </button>
      </div>

      <div className="flex justify-center items-center text-center mt-12">
        <p className="text-success font-semibold text-2xl">
          {totalPlayers} players joined
        </p>
      </div>
    </div>
  );
}
