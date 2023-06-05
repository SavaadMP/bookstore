import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { BookContextProvider } from "./context/BookContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <BookContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </BookContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
