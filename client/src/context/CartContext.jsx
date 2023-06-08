import { createContext, useReducer } from "react";

export const CartContext = createContext();

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      console.log(state);
      return {
        cartItems: action.payload,
      };

    case "GET_CART_ITEMS":
      console.log(state);
      return {
        cartItems: action.payload,
      };

    default:
      return state;
  }
};

export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    cartItems: null,
  });

  return (
    <CartContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
