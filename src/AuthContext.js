import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Vérifiez l'état d'authentification dans localStorage lors de l'initialisation
    const isAuth = localStorage.getItem('isAuthenticated');
    return isAuth === 'true'; // Convertissez la chaîne en booléen
  });

  const login = () => {
    localStorage.setItem('isAuthenticated', 'true'); // Stockez l'état dans localStorage
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.setItem('isAuthenticated', 'false'); // Mettez à jour localStorage
    setIsAuthenticated(false);
  };

  // Optionnellement, nettoyez localStorage lorsque le composant se démonte
  useEffect(() => {
    return () => {
      localStorage.removeItem('isAuthenticated');
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
