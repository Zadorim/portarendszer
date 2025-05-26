import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import { DarkModeProvider } from './context/DarkModeContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './style.css';

// Oldalak
import KezdoOldal from './pages/KezdoOldal';
import AdminOldal from './pages/AdminOldal';
import TanulokOldal from './pages/TanulokOldal';
import Register from './pages/Register';
import BelepesekOldal from './pages/BelepesekOldal';
import OsztalyokOldal from './pages/OsztalyokOldal';
import TanteremLista from './pages/TanteremLista';
import PortasOldal from './pages/PortasOldal';
import ProfilOldal from './pages/ProfilOldal';
import TanariTabletOldal from './pages/TanariTabletOldal';
import ChangePassword from './pages/ChangePassword';

function App() {
  return (
    <DarkModeProvider>
      <AuthProvider>
        <Router>
          <div className="app-container d-flex flex-column min-vh-100">
            <Navbar />
            <main className="main-content flex-grow-1">
              <Routes>
                {/* Publikus oldalak */}
                <Route path="/" element={<KezdoOldal />} />
                <Route path="/login" element={<KezdoOldal />} />
                <Route path="/register" element={<KezdoOldal />} />

                {/* Admin oldalak */}
                <Route path="/admin" element={<AdminOldal />} />
                <Route path="/admin/tanulok" element={<TanulokOldal />} />
                <Route path="/admin/belepesek" element={<BelepesekOldal />} />
                <Route path="/admin/osztalyok" element={<OsztalyokOldal />} />
                <Route path="/admin/tanterem" element={<TanteremLista />} />
                <Route path="/admin/profil" element={<ProfilOldal />} />

                {/* Portás oldal */}
                <Route path="/portas" element={<PortasOldal />} />

                {/* Tanári és közös oldalak */}
                <Route path="/profil" element={<ProfilOldal />} />               
                <Route path="/tanar-tablet" element={<TanariTabletOldal />} />
                <Route path="/jelszocsere" element={<ChangePassword />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </DarkModeProvider>
  );
}

export default App;
