// Navbar.jsx

import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useDarkMode } from '../context/DarkModeContext';
import { Button } from 'react-bootstrap';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal'; // <-- Ez is kell!

const Navbar = () => {
  const { isAuthenticated, username, logout } = useContext(AuthContext);
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <nav className="navbar d-flex justify-content-between align-items-center px-4 py-2">
        <div className="d-flex align-items-center gap-3">
          <Link to="/" className="navbar-brand">
            <i className="bi bi-house-door"></i> PortaRendszer
          </Link>
        </div>

        <div className="d-flex align-items-center gap-3">
          {/* Dark Mode gomb */}
          <Button
            variant={darkMode ? 'dark' : 'light'}
            onClick={toggleDarkMode}
            className="rounded-circle p-2"
          >
            <i className={`bi ${darkMode ? 'bi-moon' : 'bi-brightness-high'}`}></i>
          </Button>

          {/* Jogosultságok kezelése */}
          {isAuthenticated ? (
            <>
              <div className="admin-info d-flex align-items-center gap-2">
                <span className="admin-icon">
                  <i className="bi bi-person-circle"></i>
                </span>
                <span>{username}</span>
              </div>
              <Button variant="outline-danger" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right"></i> Kijelentkezés
              </Button>
            </>
          ) : (
            <>
              <Button variant="primary" onClick={() => setShowLoginModal(true)}>
                <i className="bi bi-box-arrow-in-right"></i> Bejelentkezés
              </Button>
              <Button variant="success" onClick={() => setShowRegisterModal(true)}>
                <i className="bi bi-person-plus"></i> Regisztráció
              </Button>
            </>
          )}
        </div>
      </nav>

      {/* Modális ablakok */}
      <LoginModal show={showLoginModal} handleClose={() => setShowLoginModal(false)} />
      <RegisterModal show={showRegisterModal} handleClose={() => setShowRegisterModal(false)} />
    </>
  );
};

export default Navbar;
