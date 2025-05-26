import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from './Navbar';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { DarkModeContext } from '../context/DarkModeContext';

describe('Navbar komponens', () => {
  const mockToggleDarkMode = jest.fn();
  const mockLogout = jest.fn();

  const renderNavbar = ({ isAuthenticated = false, role = null, username = '' }) => {
    render(
      <BrowserRouter>
        <DarkModeContext.Provider value={{ darkMode: false, toggleDarkMode: mockToggleDarkMode }}>
          <AuthContext.Provider value={{ role, username, logout: mockLogout }}>
            <Navbar />
          </AuthContext.Provider>
        </DarkModeContext.Provider>
      </BrowserRouter>
    );
  };

  test('megjelenik a cím és a bejelentkezés gomb, ha nincs bejelentkezve', () => {
    renderNavbar({ isAuthenticated: false });

    expect(screen.getByText(/PortaRendszer/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /bejelentkezés/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /regisztráció/i })).toBeInTheDocument();
  });

  test('megjelenik a felhasználónév és kijelentkezés gomb bejelentkezés után', () => {
    renderNavbar({ isAuthenticated: true, role: 'admin', username: 'admin1' });

    expect(screen.getByText('admin1')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /kijelentkezés/i })).toBeInTheDocument();
  });

  test('sötét mód gomb működik', () => {
    renderNavbar({ isAuthenticated: false });

    const toggleButton = screen.getByRole('button', { name: '' });
    fireEvent.click(toggleButton);

    expect(mockToggleDarkMode).toHaveBeenCalled();
  });

  test('kijelentkezés gomb meghívja a logout függvényt', () => {
    renderNavbar({ isAuthenticated: true, username: 'teszt', role: 'tanar' });

    const logoutButton = screen.getByRole('button', { name: /kijelentkezés/i });
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalled();
  });
});
