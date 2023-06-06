import { createContext, useReducer } from "react";

export const BookContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "SET_BOOKS":
      return {
        books: action.payload,
      };

    case "CREATE_BOOK":
      return {
        books: action.payload,
      };

    case "UPDATE_BOOK":
      return {
        books: action.payload,
      };

    case "DELETE_BOOK":
      return {
        books: state.books.filter((book) => {
          return book._id !== action.payload._id;
        }),
      };

    default:
      return state;
  }
};

export const BookContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    books: null,
  });

  return (
    <BookContext.Provider value={{ ...state, dispatch }}>
      {children}
    </BookContext.Provider>
  );
};
