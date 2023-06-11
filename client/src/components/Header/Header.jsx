import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "../Dropdown/Dropdown";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";

const Header = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const logoutAcc = () => {
    logout();
  };

  const fetchCartCount = async () => {
    if (!user) return;

    const response = await fetch("http://localhost:2200/api/user/cartCount", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();
    setCartCount(json);
  };

  if (user) {
    fetchCartCount();
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white fixed w-full p-4 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link
                to={user && user.role === "admin" ? "/admin" : "/"}
                className="text-black text-2xl font-bold"
              >
                {user && user.role === "admin"
                  ? "Bookstore Admin 📚"
                  : "Bookstore 📚"}
              </Link>
            </div>
          </div>
          <div className="flex items-center ml-auto">
            <div className="hidden md:block">
              <div className="ml-4 flex items-center space-x-4">
                {user ? (
                  <>
                    {user.role === "admin" ? (
                      <>
                        <Link
                          to="/"
                          className="text-black hover:text-indigo-700  px-3 py-2 rounded-md text-lg font-medium"
                        >
                          Home 🏡
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/"
                          className="text-black hover:text-indigo-700  px-3 py-2 rounded-md text-lg font-medium"
                        >
                          Home 🏡
                        </Link>

                        <Link
                          to="/cart"
                          className="text-black hover:text-indigo-700  px-3 py-2 rounded-md text-lg font-medium"
                        >
                          Cart{" "}
                          <span className="px-1 rounded-full py-0 bg-indigo-800 text-white text-base">
                            {cartCount}
                          </span>
                        </Link>

                        <Link
                          to="/orders"
                          className="text-black hover:text-indigo-700  px-3 py-2 rounded-md text-lg font-medium"
                        >
                          Orders 📦
                        </Link>

                        <Link
                          to="/"
                          className="text-black hover:text-indigo-700  px-3 py-2 rounded-md text-lg font-medium"
                        >
                          Contact Us ☎️
                        </Link>
                      </>
                    )}

                    <Dropdown user={user} logoutAcc={logoutAcc} />
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-black hover:text-indigo-700  px-3 py-2 rounded-md text-lg font-medium"
                    >
                      Login
                    </Link>

                    <Link
                      to="/register"
                      className="text-black hover:text-indigo-700  px-3 py-2 rounded-md text-lg font-medium"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={toggleMenu}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
                aria-controls="mobile-menu"
                aria-expanded={isMenuOpen ? "true" : "false"}
              >
                <span className="sr-only">Open menu</span>
                <svg
                  className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
          {user ? (
            <>
              <Link
                to="/"
                className="text-black hover:text-indigo-700  px-3 py-2 rounded-md text-lg font-medium"
              >
                Home 🏡
              </Link>

              <Link
                to="/cart"
                className="text-black hover:text-indigo-700  px-3 py-2 rounded-md text-lg font-medium"
              >
                Cart 🛒
              </Link>

              <Link
                to="/orders"
                className="text-black hover:text-indigo-700  px-3 py-2 rounded-md text-lg font-medium"
              >
                Orders 📦
              </Link>

              <Link
                to="/"
                className="text-black hover:text-indigo-700  px-3 py-2 rounded-md text-lg font-medium"
              >
                Contact Us ☎️
              </Link>

              <div className="text-right">
                <Dropdown user={user} logoutAcc={logoutAcc} />
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-black hover:text-indigo-700  px-3 py-2 rounded-md text-lg font-medium"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="text-black hover:text-indigo-700  px-3 py-2 rounded-md text-lg font-medium"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
