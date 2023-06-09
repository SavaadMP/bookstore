import React from "react";
import { Link } from "react-router-dom";

const AddToCart = () => {
  return (
    <Link
      to="/"
      className="text-center bg-indigo-600 text-white py-2 rounded-lg font-semibold mt-4 hover:bg-indigo-500 focus:scale-95 transition-all duration-200 ease-in-out"
    >
      Add to cart
    </Link>
  );
};

export default AddToCart;
