import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [role, setRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedRole = localStorage.getItem('role');
    const storedToken = localStorage.getItem('token');

    if (storedUsername && storedRole && storedToken) {
      setUsername(storedUsername);
      setRole(storedRole);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (username, role) => {
    setUsername(username);
    setRole(role);
    setIsAuthenticated(true);
    localStorage.setItem('username', username);
    localStorage.setItem('role', role);
  };

  const logout = () => {
    setUsername(null);
    setRole(null);
    setIsAuthenticated(false);
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ username, role, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

