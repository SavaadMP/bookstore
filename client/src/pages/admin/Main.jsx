import React from "react";
import AdminBtns from "../../components/AdminBtns/AdminBtns";

const Main = () => {
  return (
    <div className="py-40 ">
      <div className="flex items-center justify-center">
        <ul className=" font-bold text-white  text-center">
          <div className="flex">
            <AdminBtns text="View Books 📚" link="/admin/viewproducts" />
            <AdminBtns text="Add Books 📕" link="/admin/addproduct" />
          </div>

          <div className="flex">
            <AdminBtns text="View Messages 🧑‍🤝‍🧑" link="/admin/inbox" />
            <AdminBtns text="View Orders 📦" link="/admin/allOrders" />
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Main;
