import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import AuthRoute from "../components/AuthRoute";
import ProtectedRoutes from "../components/ProtectedRoutes";

const Landing = lazy(() => import("../pages/Landing"));
const Register = lazy(() => import("../pages/Register"));
const Login = lazy(() => import("../pages/Login"));
const Home = lazy(() => import("../pages/Home"));
const GamePlay = lazy(() => import("../pages/GamePlay"));
const Result = lazy(() => import("../pages/Result"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    element: <AuthRoute />,
    children: [
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/game/:id/play",
        element: <GamePlay />,
      },
      {
        path: "/game/:id/result",
        element: <Result />,
      },
    ],
  },
]);

export default router;
