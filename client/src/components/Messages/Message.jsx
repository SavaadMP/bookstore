import React from "react";
import { Navigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { useAuthContext } from "../../hooks/useAuthContext";

const Message = ({ message }) => {
  const { user } = useAuthContext();

  const deleteMessage = async () => {
    console.log(message._id);

    const response = await fetch(
      "http://localhost:2200/api/admin/deleteMessage/" + message._id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();

    if (response.ok) {
      console.log(json);
      Navigate("/admin");
    } else {
      console.log(json);
      console.log(json.error);
    }
  };

  return (
    <div className="z-10 relative cursor-pointer bg-white w-full lg:w-3/5 p-5 mb-2 hover:bg-gray-300">
      <div className="p-4">
        <h4 className="absolute top-3 left-4">{message.email}</h4>
        <p className="absolute top-3 right-4 text-right text-gray-500">
          {formatDistanceToNow(new Date(message.createdAt), {
            addSuffix: true,
          })}
        </p>
      </div>

      <div>
        <p>{message.message}</p>

        <button
          onClick={deleteMessage}
          className="mt-5 bg-red-600 rounded-md text-white py-1 px-5"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Message;
