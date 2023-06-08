import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

const AddToCart = ({ bookID }) => {
  const { user } = useAuthContext();

  const addToCart = async (bookId) => {
    if (!user) {
      return;
    }

    const response = await fetch(
      "http://localhost:2200/api/user/addToCart/" + bookId,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();
    console.log(json);
  };

  return (
    <Link
      onClick={() => addToCart(bookID)}
      to="/"
      className="text-center bg-indigo-600 text-white py-2 rounded-lg font-semibold mt-4 hover:bg-indigo-500 focus:scale-95 transition-all duration-200 ease-in-out"
    >
      Add to cart
    </Link>
  );
};

export default AddToCart;
