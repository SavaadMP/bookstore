import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

const CartItem = ({ bookID }) => {
  const { user } = useAuthContext();
  const [book, setBook] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(
        "http://localhost:2200/api/admin/book/" + bookID,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();
      setBook(json);
    };

    fetchBooks();
  }, []);

  return (
    <div className="border-b border-gray-200 mb-5 bg-white p-5 rounded-sm">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <img className="w-28" src={book.imageURL} alt={book.title} />
        </div>
        <div className="ml-4">
          <h3 className="text-red-900 font-bold">{book.title}</h3>
          <p className="text-gray-700">{book.author}</p>
          <p className="text-gray-900">₹{book.price}</p>
          <p className="text-gray-500">{book.description}</p>
        </div>
      </div>

      <div className="text-right">
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-5 rounded">
          Delete
        </button>
      </div>
    </div>
  );
};

export default CartItem;
