import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import BookCard from "./BookCard";
import useBooksContext from "../hooks/useBooksContext";
import { useAuthContext } from "../hooks/useAuthContext";
import Loader from "../components/Loader/Loader";
import { useCartContext } from "../hooks/useCartContext";

const Home = () => {
  const { books, dispatch } = useBooksContext();
  const { user } = useAuthContext();
  const [filteredBooks, setFilteredBooks] = useState([]);
  const { dispatch: setCartItems } = useCartContext();

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

    const fetchCartItems = async () => {
      if (!user) return;

      const response = await fetch("http://localhost:2200/api/user/cart", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();
      setCartItems({ type: "GET_CART_ITEMS", payload: json });
    };

    if (user) {
      fetchBooks();
      fetchCartItems();
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
