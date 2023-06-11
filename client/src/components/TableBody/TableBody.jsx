import React from "react";
import { Link } from "react-router-dom";

const TableBody = ({ order }) => {
  return (
    <tr className="">
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        {order.date}
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        {order.address}
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        {order.pinCode}
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        {order.phone}
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        ₹{order.totalPrice}
      </td>
      <td className={`p-3 text-sm  text-gray-700 whitespace-nowrap`}>
        {order.paymentMethod}
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        <span
          className={`p-1.5 ${
            order.status === "Pending"
              ? "text-yellow-800  bg-yellow-200"
              : " text-green-800  bg-green-200"
          } text-xs font-medium uppercase tracking-wider  rounded-lg bg-opacity-50`}
        >
          {order.status}
        </span>
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        <Link
          to={`/orders/${order._id}`}
          className="p-2 bg-indigo-700 text-white rounded shadow"
        >
          View Products
        </Link>
      </td>
    </tr>
  );
};

export default TableBody;
