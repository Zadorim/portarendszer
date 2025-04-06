import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PortasOldal() {
  const [tanulok, setTanulok] = useState([]);
  const [osztalySzuro, setOsztalySzuro] = useState('');

  useEffect(() => {
    axios.get('/api/Tanulo')
      .then(res => setTanulok(res.data))
      .catch(err => console.error('Hiba a tanulók lekérésekor:', err));
  }, []);

  const osztalyok = [...new Set(tanulok.map(t => t.osztaly))];
  const tanulokSzurt = osztalySzuro
    ? tanulok.filter(t => t.osztaly === osztalySzuro)
    : tanulok;

  const jelzesKuldese = (tanulo) => {
    if (tanulo.csakJogosult) {
      const elfogad = window.confirm(
        `${tanulo.nev} csak jogosult személlyel távozhat. Ellenőrizted?`
      );
      if (!elfogad) return;
    }
    console.log(`Jelzés: ${tanulo.nev} (${tanulo.osztaly}) tanulóért megérkeztek.`);
    // Itt lehet majd WebSocket vagy API hívás
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Portás felület</h2>

      {!osztalySzuro && (
        <div className="row row-cols-2 row-cols-md-4 g-4 my-4">
          {osztalyok.map((o, i) => (
            <div className="col" key={i}>
              <div
                className="card h-100 text-center bg-light border border-primary shadow"
                style={{ cursor: 'pointer' }}
                onClick={() => setOsztalySzuro(o)}
              >
                <div className="card-body">
                  <h5 className="card-title">{o}</h5>
                  <p className="card-text">Tanár: <strong>Ismeretlen</strong></p>
                  <p className="card-text">Terem: <strong>---</strong></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {osztalySzuro && (
        <div className="mt-4">
          <button className="btn btn-outline-secondary mb-3" onClick={() => setOsztalySzuro('')}>
            ← Vissza az osztályokhoz
          </button>
          <h4 className="mb-3">{osztalySzuro} osztály tanulói:</h4>
          <table className="table table-bordered table-hover bg-white">
            <thead>
              <tr>
                <th>Név</th>
                <th>Szakkör</th>
                <th>Jogosult elvitel</th>
                <th>Jelzés</th>
              </tr>
            </thead>
            <tbody>
              {tanulokSzurt.map((t) => (
                <tr key={t.id}>
                  <td>{t.nev}</td>
                  <td>
                    {t.szakkor ? (
                      <span className="badge bg-info">Szakkörön van</span>
                    ) : '-'}
                  </td>
                  <td>
                    {t.csakJogosult ? (
                      <span className="text-danger fw-bold">🔒 Ellenőrzés szükséges</span>
                    ) : '✔️'}
                  </td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => jelzesKuldese(t)}
                    >
                      🔔 Jelzés
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default PortasOldal;
