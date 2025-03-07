import GamingImg from "../assets/gaming.svg";
import { IoMdArrowForward } from "react-icons/io";
import { Link } from "react-router";
import { useAppStore } from "../store/useAppStore";

export default function Landing() {
  const { accessToken } = useAppStore();
  return (
    <div className="flex flex-col space-y-12 lg:space-y-0 md:flex-row items-center w-full mx-auto">
      <div className="w-full md:w-1/2 py-8 space-y-12">
        <div className="space-y-4">
          <h1 className="text-secondary text-5xl font-semibold leading-none">
            Welcome to iGaming,
          </h1>
          <p className="text-tertiary">Let's play!</p>
        </div>

        <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:space-x-4 lg:items-center">
          {accessToken ? (
            <Link
              className="flex space-x-2 items-center px-6 py-4 md:w-fit text-center text-white bg-secondary border border-[#8b5cf6] rounded active:text-secondary hover:bg-transparent hover:text-secondary focus:outline-none focus:ring font-semibold"
              to="/home"
            >
              <span> Go Home</span>
              <IoMdArrowForward className="font-semibold" />
            </Link>
          ) : (
            <>
              <Link
                className="px-6 py-4 md:min-w-[220px] text-center text-white bg-secondary border border-[#8b5cf6] rounded active:text-secondary hover:bg-transparent hover:text-secondary focus:outline-none focus:ring font-semibold"
                to="/register"
              >
                Register
              </Link>

              <Link
                className="px-6 py-4 md:min-w-[220px] text-center text-white border border-white rounded hover:bg-secondary focus:outline-none focus:ring font-semibold"
                to="/login"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="w-full lg:w-1/2 py-8">
        <img src={GamingImg} className="g-image" loading="lazy" />
      </div>
    </div>
  );
}
