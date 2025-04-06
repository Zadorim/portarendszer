import React, { useEffect, useState } from 'react';
import axios from 'axios';

function OsztalyokOldal() {
  const [osztalyok, setOsztalyok] = useState([]);
  const [hiba, setHiba] = useState('');

  useEffect(() => {
    axios.get('/api/Osztaly')
      .then(res => setOsztalyok(res.data))
      .catch(() => setHiba('Hiba az osztályok lekérésekor.'));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Osztálykezelő felület</h2>

      {hiba && <div className="alert alert-danger">{hiba}</div>}

      <div className="table-responsive">
        <table className="table table-bordered table-hover bg-white">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Osztály neve</th>
              <th>Egyedi azonosító</th>
              <th>Osztályfőnök</th>
              <th>Műveletek</th>
            </tr>
          </thead>
          <tbody>
            {osztalyok.map((o, index) => (
              <tr key={o.id}>
                <td>{index + 1}</td>
                <td>{o.nev}</td>
                <td>{o.egyediAzonosito || '-'}</td>
                <td>{o.osztalyfonokNev || <span className="text-muted">Ismeretlen</span>}</td>
                <td>
                  <button className="btn btn-sm btn-outline-primary me-2">
                    ✏️ Szerkesztés
                  </button>
                  <button className="btn btn-sm btn-outline-danger">
                    🗑️ Törlés
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="btn btn-success mt-3">
        ➕ Új osztály hozzáadása
      </button>
    </div>
  );
}

export default OsztalyokOldal;
