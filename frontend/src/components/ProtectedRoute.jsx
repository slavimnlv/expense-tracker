import React from 'react';
import { Navigate } from 'react-router-dom';
import { hasValidToken } from '../utils/validateJwt';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = hasValidToken();

  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }

  return children;
};

export default ProtectedRoute;
