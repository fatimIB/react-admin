import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ element: Component }) => {
  const isLoggedIn = !!localStorage.getItem('token');
  return isLoggedIn ? <Navigate to="/home" /> : <Component />;
};

export default PublicRoute;
