import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const AdminNavbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">PortaRendszer Admin</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#adminNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="adminNavbar">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
            <Link className="nav-link" to="/admin/tanulok">
              <i className="bi bi-people-fill me-1"></i> Tanulók
            </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/jelenlet">
                <i className="bi bi-door-open-fill me-1"></i> Belépések
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/profil">
                <i className="bi bi-person-circle me-1"></i> Profil
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
