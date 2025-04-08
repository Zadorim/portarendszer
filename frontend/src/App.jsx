import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';

import KezdoOldal from './pages/KezdoOldal';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminOldal from './pages/AdminOldal';
import TanulokOldal from './pages/TanulokOldal';
import PortasOldal from './pages/PortasOldal';
import BelepesekOldal from './pages/BelepesekOldal';
import ProfilOldal from './pages/ProfilOldal';
import OsztalyokOldal from './pages/OsztalyokOldal';
import TanteremLista from './pages/TanteremLista';

const RoleRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "admin") navigate("/admin");
    else if (role === "portas") navigate("/portas");
    else navigate("/");
  }, [navigate]);

  return null; // üres komponens csak átirányításhoz
};

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<KezdoOldal />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Automatikus átirányítás bejelentkezés után */}
          <Route path="/redirect" element={<RoleRedirect />} />

          {/* Admin oldalak */}
          <Route path="/admin" element={<AdminOldal />} />
          <Route path="/admin/tanulok" element={<TanulokOldal />} />
          <Route path="/admin/belepesek" element={<BelepesekOldal />} />
          <Route path="/admin/osztalyok" element={<OsztalyokOldal />} />
          <Route path="/admin/tanterem" element={<TanteremLista />} />
          <Route path="/admin/profil" element={<ProfilOldal />} />
          {/* Portás felület */}
          <Route path="/portas" element={<PortasOldal />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;




