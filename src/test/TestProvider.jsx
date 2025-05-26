// src/test/TestProviders.jsx
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { DarkModeProvider } from '../context/DarkModeContext';

export const TestProviders = ({ children }) => (
  <MemoryRouter>
    <DarkModeProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </DarkModeProvider>
  </MemoryRouter>
);
