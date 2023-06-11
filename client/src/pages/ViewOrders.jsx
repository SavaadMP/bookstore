import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import TableHead from "../components/TableHead/TableHead";
import TableBody from "../components/TableBody/TableBody";
import "./pages.scss";

const ViewOrders = () => {
  const { user } = useAuthContext();
  const [orderProducts, setOrderProducts] = useState([]);

  useEffect(() => {
    const fetchOrderProducts = async () => {
      if (!user) return;

      const response = await fetch("http://localhost:2200/api/user/orders", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();
      setOrderProducts(json);
    };

    if (user) {
      fetchOrderProducts();
    }
  }, []);

  return (
    <div className="py-40 p-5 h-screen bg-gray-100">
      {orderProducts && orderProducts.length > 0 ? (
        <>
          <h1 className="text-xl mb-2">Your orders</h1>
          <div className="overflow-auto rounded-lg shadow">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <TableHead />
              </thead>
              <tbody className="divide-y divide-gray-100 tableElement">
                {orderProducts &&
                  orderProducts.map((order) => {
                    return <TableBody key={order._id} order={order} />;
                  })}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center text-center flex-col">
          <h1 className="font-bold text-3xl tracking-wider underline mb-5">
            Nothing Ordered Yet!!
          </h1>

          <p className="text-gray-500">go to home for order books</p>
        </div>
      )}
    </div>
  );
};

export default ViewOrders;
