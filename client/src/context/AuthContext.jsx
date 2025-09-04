import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      // Store userId for cart management
      if (userData._id) {
        localStorage.setItem('userId', userData._id);
      }
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', userData.token);
    // Store userId for cart management
    if (userData._id) {
      localStorage.setItem('userId', userData._id);
    }
    
    // Trigger a storage event to notify CartContext to load user's cart
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'userId',
      newValue: userData._id
    }));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    
    // Trigger a storage event to notify CartContext to clear cart
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'userId',
      newValue: null
    }));
  };

  // Check if user is admin
  const isAdmin = user && user.role === 'Admin';

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
