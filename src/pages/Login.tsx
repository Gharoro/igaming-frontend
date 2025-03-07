import { useState } from "react";
import GamingImg from "../assets/gaming.svg";
import { Link, useNavigate } from "react-router";
import { useLoginUser } from "../hooks/useLogin";
import { showSuccess } from "../utils/responses";
import Spinner from "../components/Spinner";
import { useAppStore } from "../store/useAppStore";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const { mutate, isPending } = useLoginUser();
  const { setAccessToken, setUser } = useAppStore();
  const navigate = useNavigate();

  const handleLogin = () => {
    mutate(username, {
      onSuccess: (response) => {
        if (response.data) {
          const { accessToken, user } = response.data;
          setAccessToken(accessToken);
          setUser(user);

          showSuccess(response.message);
          navigate("/home");
        }
      },
    });
  };

  return (
    <div className="flex flex-col space-y-12 lg:space-y-0 md:flex-row items-center w-full mx-auto">
      <div className="w-full md:w-1/2 py-8 space-y-12">
        <div className="space-y-4">
          <h1 className="text-secondary text-5xl font-semibold leading-none">
            Login
          </h1>
          <p className="text-tertiary">
            Welcome back, login to continue playing
          </p>
        </div>

        <div className="max-w-full lg:max-w-0 lg:min-w-[400px]">
          <label
            htmlFor="username"
            className="block text-base font-medium text-white"
          >
            Username
          </label>
          <div className="flex items-center mt-2">
            <input
              type="text"
              id="username"
              name="username"
              className="w-full h-12 px-3 text-sm text-white border border-r-0 rounded-r-none border-white focus:outline-none rounded shadow-sm"
              placeholder="Enter your registered username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <button
              disabled={isPending}
              onClick={handleLogin}
              className="h-12 px-4 text-sm bg-white border border-l-0 border-white rounded-r shadow-sm text-dark focus:outline-none"
            >
              {isPending ? <Spinner color="black" /> : "Login"}
            </button>
          </div>

          <p className="text-tertiary mt-4">
            New to iGaming,{" "}
            <Link className="text-white font-bold underline" to="/register">
              Register
            </Link>
          </p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 py-8">
        <img src={GamingImg} className="g-image" loading="lazy" />
      </div>
    </div>
  );
}
