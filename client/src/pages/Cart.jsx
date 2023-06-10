import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import EmptyCart from "../components/EmptyCart/EmptyCart";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchCartItems = async () => {
      const response = await fetch("http://localhost:2200/api/user/cart", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();
      setCartItems([json][0]);
    };

    if (user) {
      fetchCartItems();
    }
  }, []);

  return (
    <div className="pt-36">
      <>
        {cartItems && cartItems.length > 0 ? (
          <div className=" min-h-screen">
            <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cartItems.map((book) => {
                  return (
                    <div className="bg-white rounded-md p-4 shadow">
                      {/* Product image */}
                      <div className="aspect-w-3 aspect-h-2 mb-4">
                        <img
                          src={book.CartItems.imageURL}
                          alt={book.CartItems.title}
                          className="object-cover object-center rounded w-60 h-80"
                        />
                      </div>
                      {/* Product details */}
                      <div className="flex flex-col">
                        <h2 className="text-xl font-bold">
                          {book.CartItems.title}
                        </h2>
                        <p className="text-gray-600">{book.CartItems.author}</p>
                        <p className="text-gray-600 mt-2">
                          ${book.CartItems.price}
                        </p>
                        {/* Quantity and Remove buttons */}
                        <div className="flex items-center mt-4">
                          <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-4 py-2 rounded-l">
                            -
                          </button>
                          <input
                            type="number"
                            className="w-12 text-center bg-gray-200 text-gray-700 font-semibold px-2 py-2"
                            value={book.quantity}
                            min={1}
                          />
                          <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-4 py-2 rounded-r">
                            +
                          </button>
                          <button className="ml-auto text-red-500 hover:text-red-700">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Cart summary */}
              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Cart Summary</h2>
                <div className="bg-white rounded-md p-4 shadow">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-gray-600">Subtotal:</p>
                    <p className="font-semibold">$34.98</p>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-gray-600">Tax:</p>
                    <p className="font-semibold">$2.80</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-600">Total:</p>
                    <p className="font-semibold">$37.78</p>
                  </div>
                </div>
              </div>

              {/* Checkout button */}
              <div className="flex justify-center mt-8">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-md">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <EmptyCart />
        )}
      </>
    </div>
  );
};

export default Cart;
