import { lazy } from "react";
import { createBrowserRouter, Outlet } from "react-router";
import AuthRoute from "../components/AuthRoute";
import ProtectedRoutes from "../components/ProtectedRoutes";
import TopBar from "../components/TopBar";

const Landing = lazy(() => import("../pages/Landing"));
const Register = lazy(() => import("../pages/Register"));
const Login = lazy(() => import("../pages/Login"));
const Home = lazy(() => import("../pages/Home"));
const GamePlay = lazy(() => import("../pages/GamePlay"));
const Result = lazy(() => import("../pages/Result"));

const LayoutWithTopBar = () => (
  <>
    <TopBar />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    element: <LayoutWithTopBar />,
    children: [
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
        element: <ProtectedRoutes />, // Protects all routes inside
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
    ],
  },
]);

export default router;
