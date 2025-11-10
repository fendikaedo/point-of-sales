import { createContext, useContext, useReducer } from "react";

// --- Inisialisasi Context ---
const CartContext = createContext();

// --- Reducer untuk Cart Logic ---
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.find(
        (item) => item.id === action.payload.id && item.type === action.payload.type
      );
      if (existingItem) {
        return state.map((item) =>
          item.id === action.payload.id && item.type === action.payload.type
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...state, { ...action.payload, quantity: 1 }];
      }
    }

    case "REMOVE_FROM_CART":
      return state.filter(
        (item) => !(item.id === action.payload.id && item.type === action.payload.type)
      );

    case "INCREASE_QUANTITY":
      return state.map((item) =>
        item.id === action.payload.id && item.type === action.payload.type
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

    case "DECREASE_QUANTITY":
      return state
        .map((item) =>
          item.id === action.payload.id && item.type === action.payload.type
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
};

// --- Provider Component ---
export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const addToCart = (product, type) => {
    dispatch({ type: "ADD_TO_CART", payload: { ...product, type } });
  };

  const removeFromCart = (id, type) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { id, type } });
  };

  const increaseQuantity = (id, type) => {
    dispatch({ type: "INCREASE_QUANTITY", payload: { id, type } });
  };

  const decreaseQuantity = (id, type) => {
    dispatch({ type: "DECREASE_QUANTITY", payload: { id, type } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// --- Custom Hook ---
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
