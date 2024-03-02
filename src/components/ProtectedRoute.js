import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Rediriger vers la page de connexion ou la page d'accueil
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute
