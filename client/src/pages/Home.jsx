import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import BookCard from "./BookCard";
import useBooksContext from "../hooks/useBooksContext";
import { useAuthContext } from "../hooks/useAuthContext";
import Loader from "../components/Loader/Loader";

const Home = () => {
  const { books, dispatch } = useBooksContext();
  const { user } = useAuthContext();
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(
        "https://bookstore-phi.vercel.app/api/admin/books",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_BOOKS", payload: json });
        setFilteredBooks(json);
      }
    };

    if (user) {
      fetchBooks();
    }
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
        <div className="py-40">
          <SearchBar searchHandle={searchHandle} />

          {/* <Popup /> */}

          <div className="flex justify-center min-h-screen  mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {books && books.length > 0 ? (
                filteredBooks.map((book) => (
                  <BookCard key={book._id} book={book} />
                ))
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Home;
