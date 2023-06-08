import React, { useState } from "react";
import "boxicons";
import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCartContext } from "../../hooks/useCartContext";
import Dropdown from "../Dropdown/Dropdown";
import { useEffect } from "react";
import Loader from "../Loader/Loader";

const Header = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const { cartItems, dispatch } = useCartContext();
  const [cartBooks, setCartBooks] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!user) return;

      const response = await fetch("http://localhost:2200/api/user/cart", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();
      setCartBooks(json);
    };

    if (user) fetchCartItems();
  }, [dispatch, cartBooks, user]);

  const logoutAcc = () => {
    logout();
  };

  return (
    <>
      {cartItems ? (
        <>
          <header
            className={`bg-white fixed w-full flex items-center justify-between shadow-lg z-40 ${
              user ? "p-7" : "p-10"
            }`}
          >
            <div className="brandLogo">
              <Link to="/admin" className="font-bold text-xl">
                {user && user.role === "admin"
                  ? "BookStore Admin 📚"
                  : "BookStore 📚"}
              </Link>
            </div>

            <nav>
              <ul className="flex text-lg font-bold">
                {!user && (
                  <div className="flex text-lg font-bold">
                    <li className="mr-5">
                      <Link to="/login">Login</Link>
                    </li>

                    <li className="mr-5">
                      <Link to="/register">Register</Link>
                    </li>
                  </div>
                )}

                {user && (
                  <div className="flex text-lg font-bold items-center">
                    {user.role === "admin" ? (
                      <li className="mr-5">
                        <Link to="/" className="text-red-600">
                          Home 🏠
                        </Link>
                      </li>
                    ) : (
                      <>
                        <li className="mr-5">
                          <Link to="/cart">
                            <box-icon name="cart-alt"></box-icon>
                            <h4 className="text-xs flex justify-center items-center absolute bg-red-700 text-white p-1 w-5 h-5 rounded-xl top-5 right-52">
                              {cartBooks && cartBooks.length}
                            </h4>
                          </Link>
                        </li>

                        <li className="mr-5">
                          <Link to="/">
                            <box-icon name="heart"></box-icon>
                          </Link>
                        </li>
                      </>
                    )}

                    <Dropdown user={user} logoutAcc={logoutAcc} />
                  </div>
                )}
              </ul>
            </nav>
          </header>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Header;
