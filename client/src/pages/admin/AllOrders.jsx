import React, { useEffect, useState } from "react";
import AdminOrderTable from "../../components/AdminOrderTable/AdminOrderTable";
import { useAuthContext } from "../../hooks/useAuthContext";

const AllOrders = () => {
  const { user } = useAuthContext();
  const [orderProducts, setOrderProducts] = useState([]);

  useEffect(() => {
    const fetchOrderProducts = async () => {
      if (!user) return;

      const response = await fetch("http://localhost:2200/api/admin/orders", {
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
    <div className="p-40">
      <>
        <h1 className="text-xl mb-2">Your orders</h1>
        <div className="overflow-auto rounded-lg shadow">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                  Date:{" "}
                </th>
                <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                  Name:{" "}
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Address:{" "}
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  PinCode:{" "}
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  District:{" "}
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Mobile:{" "}
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Amount:{" "}
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Payment:{" "}
                </th>
                <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                  Status:{" "}
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Products:{" "}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 tableElement">
              {orderProducts && orderProducts.length > 0
                ? orderProducts.map((order) => {
                    return <AdminOrderTable key={order._id} order={order} />;
                  })
                : null}
            </tbody>
          </table>
        </div>
      </>
    </div>
  );
};

export default AllOrders;
