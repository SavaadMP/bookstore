import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white fixed w-full p-10 flex items-center justify-between shadow-lg">
      <div className="brandLogo">
        <h1 className="font-bold text-xl">BookStore 📚</h1>
      </div>

      <nav>
        <ul className="flex text-lg font-bold">
          <li className="mr-5">
            <Link to="/login">Login</Link>
          </li>

          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
