import React from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { useAuthContext } from "../../hooks/useAuthContext";

const AdminOrderTable = ({ order }) => {
  const { user } = useAuthContext();

  const changeStatus = async () => {
    var status = prompt("Change Status");

    console.log(status);

    if (!status == "") {
      console.log("ok");
      if (!user) return;

      const response = await fetch(
        "https://bookstore-phi.vercel.app/api/admin/updateStatus/" + order._id,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            status: status,
          }),
        }
      );

      const json = await response.json();
      console.log(json);

      if (response.ok) {
        window.location.reload();
      }
    }
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
          className={`p-1.5 ${
            order.status === "completed"
              ? " text-green-800  bg-green-200"
              : "text-yellow-800  bg-yellow-200"
          } cursor-pointer text-xs font-medium uppercase tracking-wider  rounded-lg bg-opacity-50`}
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
