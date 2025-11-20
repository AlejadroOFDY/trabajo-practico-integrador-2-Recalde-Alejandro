import { Navigate, Outlet } from "react-router";

export const PrivateRoute = ({ authStatus }) => {
  return authStatus === "authenticated" ? <Outlet /> : <Navigate to="/login" />;
};
