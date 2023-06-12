import React from "react";
import { Link } from "react-router-dom";

const AdminBtns = ({ text, link }) => {
  return (
    <li className="bg-indigo-600 px-6 py-2 mb-6 rounded-md mr-5">
      <Link to={link}>{text}</Link>
    </li>
  );
};

export default AdminBtns;
