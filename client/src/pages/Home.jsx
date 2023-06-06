import React, { useEffect } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import BookCard from "./BookCard";
import useBooksContext from "../hooks/useBooksContext";

const Home = () => {
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
    <div className="py-40">
      <SearchBar />

      {/* <Popup /> */}

      <div className="flex justify-center min-h-screen  mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {books && books.length > 0 ? (
            books.map((book) => <BookCard key={book._id} book={book} />)
          ) : (
            <p>Books Not Found!!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
