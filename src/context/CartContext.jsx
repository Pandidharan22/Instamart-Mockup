import { createContext, useContext, useReducer, useMemo } from 'react';

// The context object that holds cart state and actions for the whole app.
const CartContext = createContext(null);

// Initial reducer state — an empty cart.
const initialState = { items: [] };

// Pure reducer: maps the current state + an action to the next state. No side effects.
function cartReducer(state, action) {
  switch (action.type) {
    // Add a product to the cart, or bump its quantity if it's already there.
    case 'ADD_ITEM': {
      const product = action.payload;
      // Guard: never add an out-of-stock product.
      if (product.inStock === false) return state;

      const existing = state.items.find((item) => item.id === product.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { ...state, items: [...state.items, { ...product, quantity: 1 }] };
    }

    // Remove a product from the cart entirely, regardless of its quantity.
    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    }

    // Increase the quantity of a product by 1.
    case 'INCREMENT': {
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    }

    // Decrease the quantity of a product by 1, dropping it from the cart if it hits 0.
    case 'DECREMENT': {
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0),
      };
    }

    // Empty the cart completely.
    case 'CLEAR_CART': {
      return { ...state, items: [] };
    }

    default:
      return state;
  }
}

// Provider component that exposes cart state, actions, and derived values to all children.
function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { items } = state;

  // Add a product to the cart (no-op if it's out of stock).
  const addToCart = (product) => dispatch({ type: 'ADD_ITEM', payload: product });

  // Remove a product from the cart by its id.
  const removeFromCart = (productId) =>
    dispatch({ type: 'REMOVE_ITEM', payload: productId });

  // Increase a product's quantity by 1.
  const incrementQuantity = (productId) =>
    dispatch({ type: 'INCREMENT', payload: productId });

  // Decrease a product's quantity by 1 (removes it at 0).
  const decrementQuantity = (productId) =>
    dispatch({ type: 'DECREMENT', payload: productId });

  // Empty the entire cart.
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  // Whether a given product currently exists in the cart.
  const isInCart = (productId) => items.some((item) => item.id === productId);

  // The current quantity for a product, or 0 if it isn't in the cart.
  const getQuantity = (productId) => {
    const item = items.find((i) => i.id === productId);
    return item ? item.quantity : 0;
  };

  // Derived values, recomputed only when items change.
  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const totalPrice = useMemo(
    () =>
      Math.round(
        items.reduce((sum, item) => sum + item.price * item.quantity, 0) * 100
      ) / 100,
    [items]
  );

  const isEmpty = items.length === 0;

  const value = {
    items,
    addToCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    clearCart,
    isInCart,
    getQuantity,
    totalItems,
    totalPrice,
    isEmpty,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Custom hook for consuming the cart; throws if used outside a CartProvider.
function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}

export { CartProvider, useCart };
