import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import Loader from "../Loader/Loader";

const Popup = ({ showPopUp, book_id }) => {
  const { user } = useAuthContext();
  const [book, setBook] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(
        "https://bookstore-phi.vercel.app/api/admin/book/" + book_id,
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

  const addToCart = async (value) => {
    if (!user) return alert("You should login first!!");

    const response = await fetch(
      "https://bookstore-phi.vercel.app/api/user/addtocart/" + value,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    await response.json();
  };

  return (
    <>
      {book_id ? (
        <>
          <div className="hidden md:flex fixed z-40 inset-0  items-center justify-center bg-gray-900 bg-opacity-75">
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
                    <button
                      onClick={() => addToCart(book._id)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
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

          <div className="md:hidden flex fixed z-50 inset-0  items-center justify-center bg-gray-900 bg-opacity-75">
            <div
              className="relative bg-white rounded-lg p-8 "
              style={{ width: "400px" }}
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
                    className="w-40 h-auto"
                  />
                </div>
                <div className="w-full md:w-1/2 md:pl-8">
                  <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
                  <p className="text-gray-600 mb-2">{book.description}</p>
                  <p className="text-lg font-bold mb-2">₹{book.price}</p>
                  <p className="text-gray-600 mb-2">By {book.author}</p>
                  <div className="flex justify-between">
                    <button
                      onClick={() => addToCart(book._id)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="z-50 bg-white">
          <Loader />
        </div>
      )}
    </>
  );
};

export default Popup;
