import { Routes, Route } from "react-router";
import { Register } from "../pages/auth/Register";
import { Login } from "../pages/auth/Login";
import { Home } from "../pages/Home";

export const AppRoute = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="home" element={<Home />} />
    </Routes>
  );
};
