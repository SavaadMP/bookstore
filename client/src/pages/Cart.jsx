import React, { useEffect, useState } from "react";
import EmptyCart from "../components/EmptyCart/EmptyCart";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCartContext } from "../hooks/useCartContext";
import Loader from "../components/Loader/Loader";
import CartItem from "../components/CartItem/CartItem";

const Cart = () => {
  const { user } = useAuthContext();
  const { cartItems, dispatch } = useCartContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!user) return;

      const response = await fetch("http://localhost:2200/api/user/cart", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();
      dispatch({ type: "GET_CART_ITEMS", payload: json });
      setLoading(false);
    };

    if (user) fetchCartItems();
  }, [dispatch, user]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="p-40">
          {cartItems &&
            cartItems.map((book) => {
              return <CartItem key={book.productId} bookID={book.productId} />;
            })}
        </div>
      )}
    </>
  );
};

export default Cart;
