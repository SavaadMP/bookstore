import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import EmptyCart from "../components/EmptyCart/EmptyCart";
import CartItem from "../components/CartItem/CartItem";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartPrice, setCartPrice] = useState(0);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchCartItems = async () => {
      const response = await fetch(
        "https://bookstore-phi.vercel.app/api/user/cart",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const json = await response.json();
      setCartItems([json][0]);
    };

    const getCartPrice = async () => {
      const response = await fetch(
        "https://bookstore-phi.vercel.app/api/user/getCartPrice",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const json = await response.json();
      setCartPrice(json.total);
    };

    if (user) {
      fetchCartItems();
      getCartPrice();
    }
  }, [cartItems]);

  return (
    <div className="pt-36">
      <>
        {cartItems && cartItems.length > 0 ? (
          <div className=" min-h-screen">
            <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cartItems.map((book) => {
                  return (
                    <CartItem
                      key={book.CartItems._id}
                      Quantity={book.quantity}
                      book={book}
                    />
                  );
                })}
              </div>

              {/* Cart summary */}
              <div className="mt-8 flex justify-end">
                <div className="bg-white rounded-md p-4 px-6 shadow ">
                  <div className="flex items-start justify-around">
                    <p className="text-gray-600 mr-5">Total:</p>
                    <p className="font-semibold text-orange-600">
                      ₹{cartPrice}
                    </p>
                  </div>
                </div>
              </div>

              {/* Checkout button */}
              <div className="flex justify-end mt-8">
                <Link
                  to="/placeOrder"
                  className="px-4 py-2 bg-indigo-700 hover:bg-indigo-600 text-white rounded-md focus:outline-none"
                >
                  Proceed to Checkout
                </Link>
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
