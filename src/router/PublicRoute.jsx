import { Navigate, Outlet } from "react-router";

export const PublicRoute = ({ authStatus }) => {
  return authStatus === "authenticated" ? <Navigate to="/home" /> : <Outlet />;
};
