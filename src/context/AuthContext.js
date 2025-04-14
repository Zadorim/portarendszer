// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [username, setUsername] = useState(localStorage.getItem("username"));

  const login = (newUsername, newRole) => {
    localStorage.setItem("username", newUsername);
    localStorage.setItem("role", newRole);
    setUsername(newUsername);
    setRole(newRole);
  };

  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    setUsername(null);
    setRole(null);
  };

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
    setRole(localStorage.getItem("role"));
  }, []);

  return (
    <AuthContext.Provider value={{ username, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
