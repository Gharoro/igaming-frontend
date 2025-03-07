import { useState } from "react";
import GamingImg from "../assets/gaming.svg";
import { Link, useNavigate } from "react-router";
import { useRegisterUser } from "../hooks/useRegister";
import { showSuccess } from "../utils/responses";
import Spinner from "../components/Spinner";

export default function Register() {
  const [username, setUsername] = useState<string>("");
  const { mutate, isPending } = useRegisterUser();
  const navigate = useNavigate();

  const handleRegister = () => {
    mutate(username, {
      onSuccess: (response) => {
        showSuccess(response.message);
        navigate("/login");
      },
    });
  };

  return (
    <div className="flex flex-col space-y-12 lg:space-y-0 md:flex-row items-center w-full mx-auto">
      <div className="w-full md:w-1/2 py-8 space-y-12">
        <div className="space-y-4">
          <h1 className="text-secondary text-5xl font-semibold leading-none">
            Register
          </h1>
          <p className="text-tertiary">
            New to iGaming, create a free account to play!
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
              className="w-full h-12 px-3 text-sm text-white border border-r-0 rounded-r-none border-violet-600 focus:outline-none rounded shadow-sm"
              placeholder="johndoe123"
              onChange={(e) => setUsername(e.target.value)}
            />
            <button
              onClick={handleRegister}
              disabled={isPending}
              className="h-12 px-4 text-sm bg-secondary border border-l-0 border-[#8b5cf6] rounded-r shadow-sm text-white focus:outline-none"
            >
              {isPending ? <Spinner /> : "Register"}
            </button>
          </div>

          <p className="text-tertiary mt-4">
            Already have an account?{" "}
            <Link className="text-white font-bold underline" to="/login">
              Login
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
