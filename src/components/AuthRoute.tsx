import { Navigate, Outlet } from "react-router";
import { useAppStore } from "../store/useAppStore";

export default function AuthRoute() {
  const { accessToken } = useAppStore();

  // If the user is authenticated, redirect to the home page
  if (accessToken) {
    return <Navigate to="/home" replace />;
  }

  // If the user is not authenticated, allow access to the login/register page
  return <Outlet />;
}
