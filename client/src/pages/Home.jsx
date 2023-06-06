import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import BookCard from "./BookCard";
import useBooksContext from "../hooks/useBooksContext";

const Home = () => {
  const { books, dispatch } = useBooksContext();
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch("http://localhost:2200/api/admin/books");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_BOOKS", payload: json });
        setFilteredBooks(json);
      }
    };

    fetchBooks();
  }, [dispatch]);

  const searchHandle = (value) => {
    const response = books.filter((book) =>
      book.title.toLowerCase().includes(value.toLowerCase())
    );
    console.log(value);
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
                <p>Books Not Found!!</p>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Home;
