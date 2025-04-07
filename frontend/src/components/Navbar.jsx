import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';
import TanteremModal from './TanteremModal.jsx';
import TanteremLista from '../pages/TanteremLista';

const Navbar = () =>
{
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleLogout = () =>
  {
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    navigate('/');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <i className="bi bi-house-door-fill me-2"></i>PortaRendszer
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
            <ul className="navbar-nav align-items-center">
              {!role && (
                <>
                  <li className="nav-item me-2">
                    <button
                      className="btn btn-outline-light btn-sm me-2"
                      onClick={() => setShowLogin(true)}
                    >
                      <i className="bi bi-box-arrow-in-right me-1"></i>Bejelentkezés
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn btn-outline-info btn-sm"
                      onClick={() => setShowRegister(true)}
                    >
                      <i className="bi bi-person-plus-fill me-1"></i>Regisztráció
                    </button>
                  </li>
                </>
              )}

              {role === "admin" && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin/tanulok">
                      <i className="bi bi-people-fill me-1"></i>Tanulók
                    </Link>
                    <li className="nav-item">
                      <Link className="nav-link" to="/admin/tanterem">
                        <i className="bi bi-easel-fill me-1"></i>Tanteremek
                      </Link>
                    </li>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin/belepesek">
                      <i className="bi bi-journal-text me-1"></i>Belépések
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin/osztalyok">
                      <i className="bi bi-building me-1"></i>Osztályok
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin/profil">
                      <i className="bi bi-person-circle me-1"></i>Profil
                    </Link>
                  </li>
                </>
              )}

              {role === "portas" && (
                <li className="nav-item">
                  <Link className="nav-link" to="/portas">
                    <i className="bi bi-door-open-fill me-1"></i>Portás felület
                  </Link>
                </li>
              )}

              {role && (
                <>
                  {username && (
                    <li className="nav-item text-white mx-3">
                      👋 Üdv, <strong>{username}</strong>
                    </li>
                  )}
                  <li className="nav-item">
                    <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
                      <i className="bi bi-box-arrow-left me-1"></i> Kijelentkezés
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Modális ablakok */}
      <LoginModal show={showLogin} handleClose={() => setShowLogin(false)} />
      <RegisterModal show={showRegister} handleClose={() => setShowRegister(false)} />
    </>
  );
};

export default Navbar;
