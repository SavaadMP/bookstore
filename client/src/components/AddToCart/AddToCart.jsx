import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

const AddToCart = ({ bookID }) => {
  const { user } = useAuthContext();

  const addToCart = async () => {
    if (!user) return alert("You should login first!!");

    const response = await fetch(
      "http://localhost:2200/api/user/addtocart/" + bookID,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();
    console.log(json);
  };

  return (
    <Link
      onClick={addToCart}
      to="/"
      className="text-center bg-indigo-600 text-white py-2 rounded-lg font-semibold mt-4 hover:bg-indigo-500 focus:scale-95 transition-all duration-200 ease-in-out"
    >
      Add to cart
    </Link>
  );
};

export default AddToCart;
