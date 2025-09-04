import React, { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status and load cart items
  useEffect(() => {
    const checkAuthAndLoadCart = () => {
      const userId = localStorage.getItem('userId');
      const user = localStorage.getItem('user');
      
      if (userId && user) {
        setIsAuthenticated(true);
        // Load user's saved cart
        const localData = localStorage.getItem(`cartItems_${userId}`);
        if (localData) {
          try {
            const parsed = JSON.parse(localData);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setCartItems(parsed);
              return;
            }
          } catch (error) {
            console.error('Error parsing cart data:', error);
          }
        }
        setCartItems([]);
      } else {
        setIsAuthenticated(false);
        setCartItems([]);
      }
    };

    // Check on mount
    checkAuthAndLoadCart();

    // Listen for storage changes (when user logs in/out)
    const handleStorageChange = (e) => {
      if (e.key === 'userId' || e.key === 'user') {
        checkAuthAndLoadCart();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId && cartItems.length > 0) {
      localStorage.setItem(`cartItems_${userId}`, JSON.stringify(cartItems));
    } else if (userId) {
      localStorage.removeItem(`cartItems_${userId}`);
    }
  }, [cartItems]);

  const addToCart = (product, quantity = 1, navigate) => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      // Redirect to login page
      if (navigate) {
        navigate('/login');
      }
      return false; // Return false to indicate failure
    }

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
    return true; // Return true to indicate success
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
    // Intentionally do not remove persisted cart so it survives logout/login
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.product.price || 0) * item.quantity, 0);
  };

  const getItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Function to load cart items for a specific user
  const loadUserCart = (userId) => {
    if (userId) {
      const localData = localStorage.getItem(`cartItems_${userId}`);
      if (localData) {
        try {
          const parsed = JSON.parse(localData);
          if (Array.isArray(parsed)) {
            setCartItems(parsed);
            return;
          }
        } catch (error) {
          console.error('Error parsing cart data:', error);
        }
      }
    }
    setCartItems([]);
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
        loadUserCart,
        isAuthenticated,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
