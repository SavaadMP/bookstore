import React from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

const AdminOrderTable = ({ order }) => {
  const changeStatus = () => {
    var status = prompt("Change Status");
    console.log(status);
  };

  return (
    <tr className="">
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        {formatDistanceToNow(new Date(order.date), { addSuffix: true })}
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        {order.name}
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        {order.address}
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        {order.pinCode}
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        Malappuram
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
          onClick={changeStatus}
          className={`p-1.5  text-green-800  bg-green-200 text-xs font-medium uppercase tracking-wider  rounded-lg bg-opacity-50`}
        >
          {order.status}
        </span>
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        <Link
          to={`/admin/viewOrderProduct/${order._id}`}
          className="p-2 bg-indigo-700 text-white rounded shadow"
        >
          View Products
        </Link>
      </td>
    </tr>
  );
};

export default AdminOrderTable;
