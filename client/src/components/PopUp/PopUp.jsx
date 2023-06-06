import React, { useEffect, useState } from "react";

const Popup = ({ showPopUp, book_id }) => {
  const [book, setBook] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(
        "http://localhost:2200/api/admin/book/" + book_id
      );
      const json = await response.json();
      setBook(json);
    };

    fetchBooks();
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
      <div
        className="relative bg-white rounded-lg p-8 "
        style={{ width: "600px" }}
      >
        <button
          className="absolute top-0 right-0 mt-4 mr-4 text-gray-600 hover:text-gray-800"
          onClick={() => showPopUp(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <img
              src={book.imageURL}
              alt={book.title}
              className="w-full h-auto"
            />
          </div>
          <div className="w-full md:w-1/2 md:pl-8">
            <h2 className="text-2xl font-bold mb-4">{book.title}</h2>
            <p className="text-gray-600 mb-4">{book.description}</p>
            <p className="text-lg font-bold mb-4">₹{book.price}</p>
            <p className="text-gray-600 mb-4">By {book.author}</p>
            <div className="flex justify-between">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Add to Cart
              </button>
              <button className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded">
                Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
