import { createContext, useReducer } from "react";

export const BookContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "SET_BOOKS":
      return {
        books: action.payload,
      };

    case "CREATE_BOOK":
      console.log(state, action.payload);
      console.log(state.books);
      return {
        books: action.payload,
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
