import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useNavigate } from 'react-router-dom';

const KezdoOldal = () => {
  const navigate = useNavigate();

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand">PortaRendszer</span>
        </div>
      </nav>

      <div className="container mt-5 text-center">
        <h1 className="mb-4">Üdvözlünk a PortaRendszerben!</h1>
        <p className="lead">
          Ez a rendszer lehetővé teszi a szülők, tanárok és portások számára a beléptetést és nyilvántartást.
        </p>

        <div className="d-grid gap-2 col-6 mx-auto mt-4">
          <button
            className="btn btn-primary btn-lg"
            onClick={() => navigate('/admin/tanulok')}
          >
            Diákok kezelése
          </button>

          <button
            className="btn btn-secondary btn-lg"
            onClick={() => navigate('/admin/belepesek')}
          >
            Belépések megtekintése
          </button>

          <button
            className="btn btn-outline-dark btn-lg"
            onClick={() => navigate('/admin/profil')}
          >
            Profilom
          </button>
        </div>
      </div>
    </div>
  );
};

export default KezdoOldal;

