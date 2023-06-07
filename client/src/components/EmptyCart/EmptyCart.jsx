import React from "react";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-28 w-28 text-gray-400 mb-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3.6 7h16.8a.6.6 0 01.6.6v1.2a.6.6 0 01-.6.6H3.6a.6.6 0 01-.6-.6V7.6a.6.6 0 01.6-.6z" />
        <path d="M5 7V6c0-2.209 1.791-4 4-4s4 1.791 4 4v1" />
        <path d="M15 7V6c0-2.209-1.791-4-4-4s-4 1.791-4 4v1" />
        <path d="M21 10v9a2 2 0 01-2 2H5a2 2 0 01-2-2v-9" />
        <path d="M18 10h-3" />
        <path d="M6 10h3" />
        <path d="M6 14h12v-4H6v4z" />
      </svg>

      <h2 className="text-3xl font-bold mb-2 ">Your cart is empty</h2>
      <p className="text-gray-500 text-lg">
        Add some books to your cart to continue shopping.
      </p>
      <Link
        to="/"
        className="bg-indigo-900 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Browse Books
      </Link>
    </div>
  );
};

export default EmptyCart;
