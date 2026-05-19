import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Frontpage from "./frontpage.jsx"
import Signuppage from "./Signuppage.jsx"
import Home from "./Home.jsx";
import Cart from "./Cart.jsx";
import WishlistPage from "./WishlistPage.jsx";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
