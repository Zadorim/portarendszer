import React from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { DarkModeProvider } from './context/DarkModeContext';


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

function App() {
  return (
    <DarkModeProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <Navbar />          
            <Routes>
              <Route path="/" element={<KezdoOldal />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin" element={<AdminOldal />} />
              <Route path="/admin/tanulok" element={<TanulokOldal />} />
              <Route path="/admin/belepesek" element={<BelepesekOldal />} />
              <Route path="/admin/osztalyok" element={<OsztalyokOldal />} />
              <Route path="/admin/tanterem" element={<TanteremLista />} />
              <Route path="/admin/profil" element={<ProfilOldal />} />
              <Route path="/portas" element={<PortasOldal />} />           
            </Routes>          
          <Footer />
        </div>
      </Router>
    </DarkModeProvider>
  );
}


export default App;





