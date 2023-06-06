import React from "react";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div className="py-40 ">
      <div className="flex items-center justify-center">
        <ul className=" font-bold text-white  text-center">
          <li className="bg-indigo-600 px-6 py-2 mb-6 rounded-md">
            <Link to="/admin/viewproducts">View Books 📚</Link>
          </li>

          <li className="bg-indigo-600 px-6 py-2 mb-6 rounded-md">
            <Link to="/admin/addproduct">Add Books 📕</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Main;
