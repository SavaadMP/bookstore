import React from "react";
import "boxicons";
import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import Dropdown from "../Dropdown/Dropdown";

const Header = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const logoutAcc = () => {
    logout();
  };

  return (
    <header
      className={`bg-white fixed w-full flex items-center justify-between shadow-lg ${
        user ? "p-7" : "p-10"
      }`}
    >
      <div className="brandLogo">
        <Link to="/" className="font-bold text-xl">
          BookStore 📚
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
              <li className="mr-5">
                <Link to="/" className="text-red">
                  <box-icon name="heart"></box-icon>
                </Link>
              </li>

              <li className="mr-5">
                <Link to="/" className="text-red">
                  <box-icon name="cart-alt"></box-icon>
                </Link>
              </li>

              <Dropdown user={user} logoutAcc={logoutAcc} />
            </div>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
