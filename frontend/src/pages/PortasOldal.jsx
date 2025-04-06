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

  // Osztálykártyák előkészítése egyedi osztálynév szerint (tanterem + tanár is jön)
  const osztalyok = [
    ...new Map(
      tanulok.map(t => [
        t.osztalyNev,
        {
          osztalyNev: t.osztalyNev,
          osztalyfonokNev: t.osztalyfonokNev || 'Ismeretlen',
          terem: t.terem || '---',
        },
      ])
    ).values(),
  ];

  const tanulokSzurt = osztalySzuro
    ? tanulok.filter(t => t.osztalyNev === osztalySzuro).sort((a, b) => a.nev.localeCompare(b.nev))
    : tanulok;

  const jelzesKuldese = (tanulo) => {
    if (tanulo.specHazavitel) {
      const elfogad = window.confirm(
        `${tanulo.nev} csak jogosult személlyel távozhat. Ellenőrizted?`
      );
      if (!elfogad) return;
    }
    console.log(`Jelzés: ${tanulo.nev} (${tanulo.osztalyNev}) tanulóért megérkeztek.`);
    // Később WebSocket vagy POST hívás is lehet itt
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Portás felület</h2>

      {!osztalySzuro && (
        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4 my-4">
          {osztalyok.map((o, i) => (
            <div className="col" key={i}>
              <div
                className="card h-100 text-center bg-light border border-primary shadow-lg"
                style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                onClick={() => setOsztalySzuro(o.osztalyNev)}
              >
                <div className="card-body">
                  <i className="bi bi-door-closed display-4 text-primary mb-3"></i>
                  <h5 className="card-title">{o.osztalyNev}</h5>
                  <p className="card-text">Tanár: <strong>{o.osztalyfonokNev}</strong></p>
                  <p className="card-text">Terem: <strong>{o.terem}</strong></p>
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
            <thead className="table-light">
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
                    {t.tanszobas ? (
                      <span className="badge bg-info">Szakkörön van</span>
                    ) : '-'}
                  </td>
                  <td>
                    {t.specHazavitel ? (
                      <span className="text-danger fw-bold">🔒 Ellenőrzés szükséges</span>
                    ) : '✔️'}
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary"
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

