import React from 'react';
import { Navigate } from 'react-router-dom';
import { hasValidToken } from '../utils/validateJwt';

const PublicRoute = ({ children }) => {
  const isAuthenticated = hasValidToken();

  if (isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }

  return children;
};

export default PublicRoute;
