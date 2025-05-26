import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import { useDarkMode } from "../context/DarkModeContext";
import { AuthContext } from "../context/AuthContext";
import "bootstrap-icons/font/bootstrap-icons.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { role, username, logout } = useContext(AuthContext);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className={`navbar navbar-expand-lg ${darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"}`}>
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
        <i className="bi bi-house-door-fill me-2"></i>
          PortaRendszer
        </Link>

        <div className="d-flex align-items-center">
          <button onClick={toggleDarkMode} className="btn btn-outline-secondary me-2" title="Sötét/Világos mód">
            <i className={`bi ${darkMode ? "bi-sun-fill" : "bi-moon-fill"}`}></i>
          </button>

          {role === "admin" && (
            <Link to="/admin" className="btn btn-outline-info me-2">
              <i className="bi bi-speedometer2"></i> Vezérlőpult
            </Link>
          )}

          {username ? (
            <>
              <span className="me-2 fw-semibold">{username}</span>
              <button className="btn btn-outline-danger" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right"></i> Kijelentkezés
              </button>
            </>
          ) : (
            <>
               <button className="btn btn-outline-primary me-2" onClick={() => setShowLogin(true)}>
               <i className="bi bi-box-arrow-in-right"></i>Bejelentkezés
              </button>
              <button className="btn btn-outline-success" onClick={() => setShowRegister(true)}>
              <i className="bi bi-person-plus"></i> Regisztráció
              </button>
            </>
          )}
        </div>
      </div>

      <LoginModal show={showLogin} handleClose={() => setShowLogin(false)} />
      <RegisterModal show={showRegister} handleClose={() => setShowRegister(false)} />
    </nav>
  );
};

export default Navbar;
