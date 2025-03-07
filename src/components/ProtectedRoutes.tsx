import { Navigate, Outlet } from "react-router";
import { useAppStore } from "../store/useAppStore";

export default function ProtectedRoutes() {
  const { accessToken } = useAppStore();

  // If the user is not authenticated, redirect to the login page
  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  // If the user is authenticated, render the requested page
  return <Outlet />;
}
