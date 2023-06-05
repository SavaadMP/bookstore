import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// * Components
import Header from "./components/Header/Header";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AddProduct from "./pages/admin/addProduct";
import Main from "./pages/admin/Main";

const App = () => {
  const { user } = useAuthContext();

  return (
    <div>
      <Header />
      <Routes>
        <Route
          exact
          path="/"
          element={user ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />

        <Route path="/admin" element={<Main />} />
        <Route path="/admin/addproduct" element={<AddProduct />} />
      </Routes>
    </div>
  );
};

export default App;
