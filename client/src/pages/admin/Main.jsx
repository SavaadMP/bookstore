import React from "react";
import { Link } from "react-router-dom";
import AdminBtns from "../../components/AdminBtns/AdminBtns";

const Main = () => {
  return (
    <div className="py-40 ">
      <div className="flex items-center justify-center">
        <ul className=" font-bold text-white  text-center">
          <AdminBtns text="Dashboard 📊" link="/admin" />
          <AdminBtns text="View Books 📚" link="/admin/viewproducts" />
          <AdminBtns text="Add Books 📕" link="/admin/addproduct" />
          <AdminBtns text="View Users 🧑‍🤝‍🧑" link="/admin" />
          <AdminBtns text="View Orders 📦" link="/admin" />
        </ul>
      </div>
    </div>
  );
};

export default Main;
