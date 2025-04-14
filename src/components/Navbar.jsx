import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import { useDarkMode } from "../context/DarkModeContext";
import "bootstrap-icons/font/bootstrap-icons.css";


const Navbar = () => {
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const storedUser = localStorage.getItem("username");
    if (storedRole !== role) setRole(storedRole);
    if (storedUser !== username) setUsername(storedUser);
  }, []);

  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "role" || e.key === "username") {
        setRole(localStorage.getItem("role"));
        setUsername(localStorage.getItem("username"));
      }
    };
  
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);  

  const handleLogout = () => {
    fetch("http://localhost:5072/api/Auth/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    localStorage.removeItem("role");
    localStorage.removeItem("username");
    localStorage.removeItem("token");

    setRole(null);
    setUsername(null);
    navigate("/");
  };

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg ${
          darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"
        } shadow-sm`}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <i className="bi bi-house-door-fill me-2"></i>PortaRendszer
          </Link>

          <div className="d-flex align-items-center ms-auto">
            <button
              onClick={toggleDarkMode}
              className={`btn btn-sm me-2 ${darkMode ? "btn-warning" : "btn-dark"}`}
              title="Téma váltás"
            >
              {darkMode ? (
                <i className="bi bi-sun-fill"></i>
              ) : (
                <i className="bi bi-moon-fill"></i>
              )}
            </button>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarContent"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
            <ul className="navbar-nav align-items-center">
              {!role && (
                <>
                  <li className="nav-item me-2">
                    <button
                      className="btn btn-outline-secondary btn-sm"
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
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin/osztalyok">
                      <i className="bi bi-building me-1"></i>Osztályok
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin/tanterem">
                      <i className="bi bi-door-closed me-1"></i>Tantermek
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin/belepesek">
                      <i className="bi bi-journal-text me-1"></i>Belépések
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
                    <li className="nav-item mx-3 text-nowrap text-info fw-bold">
                      👋 Üdv, <span className="fw-semibold">{username}</span>
                    </li>
                  )}
                  <li className="nav-item">
                    <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
                      <i className="bi bi-box-arrow-left me-1"></i>Kijelentkezés
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










