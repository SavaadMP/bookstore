import React, { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

const CartItem = ({ book, Quantity }) => {
  const { user } = useAuthContext();
  const [cartCount, setCartCount] = useState(parseInt(Quantity));

  const changeQuantity = async (productID, count) => {
    const response = await fetch(
      "http://localhost:2200/api/user/changeQuantity",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ productID, count }),
      }
    );

    const json = await response.json();

    if (!cartCount === 1) {
      return;
    }
    setCartCount(cartCount + count);
  };

  const deleteCartItem = async (productID) => {
    const response = await fetch(
      "http://localhost:2200/api/user/deleteCartItem/" + productID,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();
  };

  return (
    <div
      key={book.CartItems._id}
      className="bg-white rounded-md p-4 shadow flex"
    >
      {/* Product image */}
      <div className="aspect-w-3 aspect-h-2 mb-4 mr-5">
        <img
          src={book.CartItems.imageURL}
          alt={book.CartItems.title}
          className="object-cover object-center rounded w-28 "
        />
      </div>
      {/* Product details */}
      <div className="flex flex-col">
        <h2 className="text-xl font-bold">{book.CartItems.title}</h2>
        <p className="text-gray-600">{book.CartItems.author}</p>
        <p className="text-gray-600 mt-2">₹{book.CartItems.price}</p>
        {/* Quantity and Remove buttons */}
        <div className="flex items-center mt-4">
          <button
            disabled={cartCount === 1 ? true : false}
            onClick={() => changeQuantity(book.CartItems._id, -1)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-4 py-2 rounded-l"
          >
            -
          </button>
          <input
            type="number"
            readOnly
            className="w-12 text-center bg-gray-200 text-gray-700 font-semibold px-2 py-2"
            value={cartCount}
            min={1}
          />
          <button
            onClick={() => changeQuantity(book.CartItems._id, 1)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-4 py-2 rounded-r"
          >
            +
          </button>
        </div>
        <div className="mt-5">
          <button
            onClick={() => deleteCartItem(book.CartItems._id)}
            className="ml-auto text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
