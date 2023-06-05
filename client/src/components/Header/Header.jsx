import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";

const Header = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const logoutAcc = () => {
    logout();
  };

  return (
    <header className="bg-white fixed w-full p-10 flex items-center justify-between shadow-lg">
      <div className="brandLogo">
        <h1 className="font-bold text-xl">BookStore 📚</h1>
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
            <div className="flex text-lg font-bold">
              <li className="mr-5">
                <p className="text-red">{user.username}</p>
              </li>

              <button onClick={logoutAcc}>Logout</button>
            </div>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
