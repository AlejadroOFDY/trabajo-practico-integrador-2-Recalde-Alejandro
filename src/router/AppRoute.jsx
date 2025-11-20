import { Routes, Route, Navigate } from "react-router";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { Register } from "../pages/auth/Register";
import { Login } from "../pages/auth/Login";
import { Home } from "../pages/Home";
import { Profile } from "../pages/Profile";
import { Tasks } from "../pages/Tasks";

export const AppRoute = ({ authStatus, onLogin, onLogout }) => {
  return (
    <Routes>
      {/* Rutas Públicas */}
      <Route element={<PublicRoute authStatus={authStatus} />}>
        <Route path="/login" element={<Login onLoginSuccess={onLogin} />} />
        <Route
          path="/register"
          element={<Register onLoginSuccess={onLogin} />}
        />
      </Route>

      {/* Rutas Privadas */}
      <Route element={<PrivateRoute authStatus={authStatus} />}>
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile onLogout={onLogout} />} />
        <Route path="/tasks" element={<Tasks />} />
      </Route>

      {/* Redirección por defecto */}
      <Route
        path="*"
        element={
          <Navigate to={authStatus === "authenticated" ? "/home" : "/login"} />
        }
      />
    </Routes>
  );
};
