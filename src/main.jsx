import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { AppRoute } from "./router/AppRoute.jsx";
import { Loading } from "./components/Loading.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  </StrictMode>
);
