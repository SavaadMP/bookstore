import { useContext } from "react";
import { BookContext } from "../context/BookContext";

const useBooksContext = () => {
  const context = useContext(BookContext);

  if (!context) {
    throw Error("useBooksContext must be used inside BookContext");
  }

  return context;
};

export default useBooksContext;
