import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// * Components
import Header from "./components/Header/Header";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AddProduct from "./pages/admin/AddProduct";
import Main from "./pages/admin/Main";
import Books from "./pages/admin/Books";
import Footer from "./components/Footer/Footer";
import EditProduct from "./pages/admin/EditProduct";
import Cart from "./pages/Cart";
import OrderPage from "./pages/OrderPage";
import ViewOrders from "./pages/ViewOrders";
import OrderProducts from "./pages/OrderProducts";
import Contact from "./pages/Contact";
import Inbox from "./pages/admin/Inbox";
import AllOrders from "./pages/admin/AllOrders";
import AdminOrderProducts from "./pages/admin/OrderProducts";

const App = () => {
  const { user } = useAuthContext();

  return (
    <>
      <div>
        <Header />
        <Routes>
          <Route
            index
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/cart"
            element={user ? <Cart /> : <Navigate to="/login" />}
          />
          <Route
            path="/placeOrder"
            element={user ? <OrderPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/orders"
            element={user ? <ViewOrders /> : <Navigate to="/login" />}
          />
          <Route
            path="/orders/:id"
            element={user ? <OrderProducts /> : <Navigate to="/login" />}
          />
          <Route
            path="/contact"
            element={user ? <Contact /> : <Navigate to="/login" />}
          />

          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />

          {user ? (
            <>
              <Route
                path="/admin"
                element={user.role == "admin" ? <Main /> : <Navigate to="/" />}
              />
              <Route
                path="/admin/viewproducts"
                element={user.role == "admin" ? <Books /> : <Navigate to="/" />}
              />
              <Route
                path="/admin/addproduct"
                element={
                  user.role == "admin" ? <AddProduct /> : <Navigate to="/" />
                }
              />
              <Route
                path="/admin/editproduct/:id"
                element={
                  user.role == "admin" ? <EditProduct /> : <Navigate to="/" />
                }
              />
              <Route
                path="/admin/inbox"
                element={user.role == "admin" ? <Inbox /> : <Navigate to="/" />}
              />
              <Route
                path="/admin/allOrders"
                element={
                  user.role == "admin" ? <AllOrders /> : <Navigate to="/" />
                }
              />
              <Route
                path="/admin/viewOrderProduct/:id"
                element={
                  user.role == "admin" ? (
                    <AdminOrderProducts />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
            </>
          ) : null}
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default App;
