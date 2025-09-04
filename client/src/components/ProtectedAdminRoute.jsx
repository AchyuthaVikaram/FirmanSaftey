import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedAdminRoute = ({ children }) => {
  const { user, isAdmin } = useAuth();

  if (!user) {
    // User not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    // User is logged in but not an admin, redirect to homepage or unauthorized page
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;
