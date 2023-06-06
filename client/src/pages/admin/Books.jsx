import React, { useEffect } from "react";
import useBooksContext from "../../hooks/useBooksContext";
import SearchBar from "../../components/SearchBar/SearchBar";
import { Link } from "react-router-dom";

const Books = () => {
  const { books, dispatch } = useBooksContext();

  const deleteBook = async (id) => {
    const response = await fetch(
      "http://localhost:2200/api/admin/deletebook/" + id,
      {
        method: "DELETE",
      }
    );

    const json = await response.json();

    if (response.ok) {
      dispatch({
        type: "DELETE_BOOK",
        payload: json,
      });
    }
  };

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch("http://localhost:2200/api/admin/books");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_BOOKS", payload: json });
      }
    };

    fetchBooks();
  }, [dispatch]);

  return (
    <div className="p-40">
      <SearchBar text="Search Books.." />

      {books && books.length ? (
        books.map((book) => {
          return (
            <div
              key={book._id}
              className="border-b border-gray-200 mb-5 bg-white p-5 rounded-sm"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img className="w-28" src={book.imageURL} alt={book.title} />
                </div>
                <div className="ml-4">
                  <h3 className="text-red-900 font-bold">{book.title}</h3>
                  <p className="text-gray-700">{book.author}</p>
                  <p className="text-gray-500">{book.description}</p>
                </div>
              </div>

              <div className="text-right">
                <Link
                  to={`/admin/editproduct/${book._id}`}
                  className="mr-5 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-5 rounded"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteBook(book._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-5 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <p>No Books Foundd!!</p>
      )}
    </div>
  );
};

export default Books;
