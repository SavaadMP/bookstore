import React, { useState } from "react";
import { Link } from "react-router-dom";
import Popup from "../components/PopUp/PopUp";
import AddToCart from "../components/AddToCart/AddToCart";

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
          <AddToCart bookID={book._id} />
        </div>
      </div>
    </>
  );
};

export default BookCard;
