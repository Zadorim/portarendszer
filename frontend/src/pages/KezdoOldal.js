import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const KezdoOldal = () => {
  return (
    <div>
      {/* Navigációs sáv */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand">PortaRendszer</span>
        </div>
      </nav>

      {/* Fő tartalom */}
      <div className="container mt-5">
        <div className="text-center">
          <h1 className="mb-4">Üdvözlünk a PortaRendszerben!</h1>
          <p className="lead">
            Ez a rendszer lehetővé teszi a diákok, tanárok és portások számára a beléptetést és nyilvántartást.
          </p>

          <div className="d-grid gap-2 col-6 mx-auto mt-4">
            <button className="btn btn-primary btn-lg">Diákok kezelése</button>
            <button className="btn btn-secondary btn-lg">Belépések megtekintése</button>
            <button className="btn btn-outline-dark btn-lg">Profilom</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KezdoOldal;
