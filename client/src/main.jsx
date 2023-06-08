import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { BookContextProvider } from "./context/BookContext.jsx";
import { CartContextProvider } from "./context/CartContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <BookContextProvider>
        <AuthContextProvider>
          <CartContextProvider>
            <App />
          </CartContextProvider>
        </AuthContextProvider>
      </BookContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
