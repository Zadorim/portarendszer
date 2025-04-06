import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../App.css';

const KezdoOldal = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-vh-100 text-white"
      style={{
        backgroundImage: "url('/iskola_hatter.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <nav className="navbar navbar-dark bg-dark bg-opacity-75">
        <div className="container-fluid">
          <span className="navbar-brand">
            <i className="bi bi-house-door-fill me-2"></i>PortaRendszer
          </span>
        </div>
      </nav>

      <div className="d-flex justify-content-center align-items-center flex-column text-center p-4" style={{ minHeight: 'calc(100vh - 56px)' }}>
        <motion.div
          className="p-4 p-md-5 bg-dark bg-opacity-75 rounded shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="display-6 text-shadow mb-4">
            Üdvözlünk a Miskolci Szilágyi Dezső Általános Iskola portarendszerében!
          </h1>
          <p className="fs-5">
            Ez egy egyedül álló hívó és jelzőrendszer, ami megkönnyíti az itt dolgozók, a tanulók és a szülők mindennapját.
            <br />
            Bátran kérj segítséget!
          </p>
          <h4 className="mt-4 fw-bold">Legyen szép napod!<br />Üdvözöl a <span className="text-warning">SZIDIPORT</span>!</h4>

          <div className="d-grid gap-3 col-12 col-md-8 mx-auto mt-5">
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/admin/tanulok')}>
              <i className="bi bi-people-fill me-2"></i>Diákok kezelése
            </button>

            <button className="btn btn-secondary btn-lg" onClick={() => navigate('/admin/belepesek')}>
              <i className="bi bi-journal-text me-2"></i>Belépések megtekintése
            </button>

            <button className="btn btn-outline-light btn-lg" onClick={() => navigate('/admin/profil')}>
              <i className="bi bi-person-circle me-2"></i>Profilom
            </button>
            <button className="btn btn-outline-light btn-lg" onClick={() => navigate('/login')}>
            <i className="bi bi-box-arrow-in-right me-2"></i>Bejelentkezés
            </button>

            <button className="btn btn-outline-info btn-lg" onClick={() => navigate('/register')}>
              <i className="bi bi-person-plus-fill me-2"></i>Regisztráció
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default KezdoOldal;
