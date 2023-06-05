import React, { useEffect } from "react";
import useBooksContext from "../../hooks/useBooksContext";

const Main = () => {
  const { books, dispatch } = useBooksContext();

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
      {books && books.length ? (
        books.map((book) => {
          return (
            <div key={book._id} className="border-b border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img src={book.imageURL} alt={book.title} />
                </div>
                <div className="ml-4">
                  <h3 className="text-gray-900">{book.title}</h3>
                  <p className="text-gray-500">{book.author}</p>
                </div>
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

export default Main;
