import { BiLogOutCircle } from "react-icons/bi";
import { FaRegClock } from "react-icons/fa";
import { useAppStore } from "../store/useAppStore";
import { useLogoutUser } from "../hooks/useLogout";
import Spinner from "./Spinner";
import CountDownTimer from "./CountDownTimer";

export default function TopBar() {
  const { accessToken, nextSessionIn } = useAppStore();
  const { mutate, isPending } = useLogoutUser();

  const handleLogout = () => {
    mutate();
  };

  return (
    <div className="fixed top-0 left-0 right-0 light-bg shadow-lg z-50 px-4">
      <div className="container mx-auto space-y-4 lg:space-y-0">
        <div className="flex flex-row justify-between items-center space-y-4 lg:space-y-0 py-4">
          <a
            href="/"
            className="text-4xl lg:text-2xl font-bold text-secondary hover:text-white"
          >
            iGaming
          </a>

          {accessToken && nextSessionIn && (
            <div className="lg:flex justify-center items-center space-x-4 hidden">
              <FaRegClock className="text-orange-400 text-xl" />
              <p className="text-white text-xl">Next session starts in </p>
              <span className="text-orange-400 font-bold text-xl">
                <CountDownTimer countdownType="nextSessionIn" />
              </span>
            </div>
          )}

          {accessToken && (
            <button
              disabled={isPending}
              onClick={handleLogout}
              className="flex items-center text-white border border-white py-2 gap-2 rounded w-fit"
            >
              {isPending ? (
                <Spinner color="white" />
              ) : (
                <>
                  <BiLogOutCircle />
                  <span>Logout</span>
                </>
              )}
            </button>
          )}
        </div>
        {accessToken && nextSessionIn && (
          <div className="lg:hidden justify-center items-center space-x-4 flex pb-8">
            <FaRegClock className="text-orange-400 text-2xl" />
            <p className="text-white text-2xl">Next session starts in </p>
            <CountDownTimer countdownType="nextSessionIn" />
          </div>
        )}
      </div>
    </div>
  );
}
