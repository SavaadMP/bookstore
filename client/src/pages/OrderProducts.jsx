import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const OrderProducts = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchOrderedProducts = async () => {
      if (!user) return;
      const response = await fetch(
        "https://bookstore-phi.vercel.app/api/user/orderedProducts/" + id,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const json = await response.json();
      setProducts(json);
    };

    if (user) fetchOrderedProducts();
  }, []);

  return (
    <div className="p-40 flex">
      {products &&
        products.map((product, index) => {
          return (
            <div key={index} className="p-2 bg-white m-2">
              <img
                className="w-64 mr-2 h-80 mb-2"
                src={product.CartItems.imageURL}
                alt=""
              />
              <h1 className="text-lg mb-1">{product.CartItems.title}</h1>
              <p className="text-gray-500 mb-1">{product.CartItems.author}</p>
              <p className="text-gray-500 mb-1">₹{product.CartItems.price}</p>
              <p className="mb-2">Quanity: {product.quantity}</p>
              <p className="text-red-600">
                Total: {product.quantity * product.CartItems.price}
              </p>
            </div>
          );
        })}
    </div>
  );
};

export default OrderProducts;
