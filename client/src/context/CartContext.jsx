import React, { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Clear any existing cart data on first load to ensure clean start
    const localData = localStorage.getItem('cartItems');
    if (localData) {
      try {
        const parsed = JSON.parse(localData);
        // Only restore if it's a valid array and not empty
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (error) {
        console.error('Error parsing cart data:', error);
      }
    }
    // Start with empty cart
    localStorage.removeItem('cartItems');
    return [];
  });

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } else {
      localStorage.removeItem('cartItems');
    }
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product._id === product._id);
      const productWithPrice = { ...product, price: product.price || 0 }; // Ensure price exists

      if (existingItem) {
        return prevItems.map((item) =>
          item.product._id === productWithPrice._id
            ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [...prevItems, { product: productWithPrice, quantity }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product._id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems((prevItems) => {
      if (quantity <= 0) {
        return prevItems.filter((item) => item.product._id !== productId);
      }
      return prevItems.map((item) =>
        item.product._id === productId ? { ...item, quantity } : item
      );
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.product.price || 0) * item.quantity, 0);
  };

  const getItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
