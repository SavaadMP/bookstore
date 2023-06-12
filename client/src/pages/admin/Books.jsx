import React, { useEffect, useState } from "react";
import useBooksContext from "../../hooks/useBooksContext";
import SearchBar from "../../components/SearchBar/SearchBar";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

const Books = () => {
  const { books, dispatch } = useBooksContext();
  const { user } = useAuthContext();
  const [filteredBooks, setFilteredBooks] = useState([]);

  const navigate = useNavigate();

  const deleteBook = async (id) => {
    if (!user) {
      return;
    }

    const response = await fetch(
      "http://localhost:2200/api/admin/deletebook/" + id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();

    if (response.ok) {
      dispatch({
        type: "DELETE_BOOK",
        payload: json,
      });

      navigate("/admin/");
    }
  };

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch("http://localhost:2200/api/admin/books", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_BOOKS", payload: json });
        setFilteredBooks(json);
      }
    };

    fetchBooks();
  }, [dispatch, user]);

  const searchHandle = (value) => {
    const response = books.filter((book) =>
      book.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredBooks(response);
  };

  return (
    <>
      {filteredBooks ? (
        <div className="py-40 px-16">
          <SearchBar text="Search Books.." searchHandle={searchHandle} />

          {books && books.length > 0 ? (
            filteredBooks.map((book) => {
              return (
                <div
                  key={book._id}
                  className="border-b border-gray-200 mb-5 bg-white p-5 rounded-sm"
                >
                  <div className="flex items-center flex-col lg:flex-row">
                    <div className="flex-shrink-0">
                      <img
                        className="w-28"
                        src={book.imageURL}
                        alt={book.title}
                      />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-red-900 font-bold">{book.title}</h3>
                      <p className="text-gray-700">{book.author}</p>
                      <p className="text-gray-900">₹{book.price}</p>
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
      ) : null}
    </>
  );
};

export default Books;
