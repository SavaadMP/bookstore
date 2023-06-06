import React, { useState } from "react";
import { Link } from "react-router-dom";
import Popup from "../components/PopUp/PopUp";

const BookCard = ({ book }) => {
  const [showPopUp, setShowPopUp] = useState(false);
  const popupHandler = () => {
    setShowPopUp(!showPopUp);
  };

  return (
    <>
      {showPopUp && <Popup showPopUp={setShowPopUp} book_id={book._id} />}
      <div className="rounded-xl shadow-lg">
        <div className="p-5 flex flex-col">
          <div
            className="rounded-xl overflow-hidden cursor-pointer"
            onClick={() => popupHandler(book._id)}
          >
            <img className="w-60 h-80" src={book.imageURL} alt={book.title} />
          </div>
          <Link
            to="/"
            className="text-center bg-indigo-600 text-white py-2 rounded-lg font-semibold mt-4 hover:bg-indigo-500 focus:scale-95 transition-all duration-200 ease-in-out"
          >
            Add to cart
          </Link>
        </div>
      </div>
    </>
  );
};

export default BookCard;
