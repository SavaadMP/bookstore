import React, { useState } from "react";
import { Link } from "react-router-dom";

const Dropdown = ({ user, logoutAcc }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="px-4 py-2 bg-indigo-700 hover:bg-indigo-600 text-white rounded-md focus:outline-none"
      >
        {user.username} 🔽
      </button>
      {isOpen && (
        <div className="absolute top-10 right-0 bg-white w-40 shadow-md">
          <ul className="py-2">
            <li>
              <Link
                to="/"
                onClick={logoutAcc}
                className="block px-4 py-2 hover:bg-gray-200"
              >
                Log Out ➡️
              </Link>
            </li>

            <li
              onClick={toggleDropdown}
              className="block px-4 py-2 hover:bg-gray-200 cursor-pointer"
            >
              Close ❎
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
