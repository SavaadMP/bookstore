import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddToCart = ({ bookID }) => {
  const { user } = useAuthContext();

  const addToCart = async () => {
    if (!user) return alert("You should login first!!");

    const response = await fetch(
      "https://bookstore-phi.vercel.app/api/user/addtocart/" + bookID,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    if (response.ok) {
      toast.success("Added to cart");
    }
  };

  return (
    <>
      <ToastContainer />
      <Link
        onClick={addToCart}
        to="/"
        className="text-center bg-indigo-600 text-white py-2 rounded-lg font-semibold mt-4 hover:bg-indigo-500 focus:scale-95 transition-all duration-200 ease-in-out"
      >
        Add to cart
      </Link>
    </>
  );
};

export default AddToCart;
