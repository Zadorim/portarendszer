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
    console.log(`Jelzés: ${tanulo.nev} (${tanulo.osztaly}) tanulóért megérkeztek.`);
    // Később WebSocket vagy POST API hívás
  };

  return (
    <div className="container mt-5">
      <h2>Portás felület</h2>

      <div className="mb-3">
        <label className="form-label">Osztály szűrés:</label>
        <select className="form-select w-25" value={osztalySzuro} onChange={(e) => setOsztalySzuro(e.target.value)}>
          <option value="">Összes osztály</option>
          {osztalyok.map((o, i) => (
            <option key={i} value={o}>{o}</option>
          ))}
        </select>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Név</th>
            <th>Osztály</th>
            <th>Terem</th>
            <th>Jelzés</th>
          </tr>
        </thead>
        <tbody>
          {tanulokSzurt.map((t) => (
            <tr key={t.id}>
              <td>{t.nev}</td>
              <td>{t.osztaly}</td>
              <td>{t.terem}</td>
              <td>
                <button className="btn btn-primary btn-sm" onClick={() => jelzesKuldese(t)}>🔔 Jelzés</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PortasOldal;
