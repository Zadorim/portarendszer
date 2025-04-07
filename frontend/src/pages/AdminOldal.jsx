import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from '../components/AdminNavbar';


function AdminOldal() {
  const [tanulok, setTanulok] = useState([]);
  const [ujTanulo, setUjTanulo] = useState({ nev: '', osztaly: '', terem: '', jogosultHazavivok: '' });
  const [szerkesztesTanulo, setSzerkesztesTanulo] = useState(null);

  const tanulokatLeker = async () => {
    try {
      const res = await axios.get('/api/Tanulo');
      setTanulok(res.data);
    } catch (err) {
      alert('Hiba a tanulók lekérdezésekor.');
    }
  };

  const handleTorles = async (id) => {
    if (!window.confirm('Biztosan törölni szeretnéd ezt a tanulót?')) return;
    try {
      await axios.delete(`/api/Tanulo/${id}`);
      tanulokatLeker();
    } catch (err) {
      alert('Hiba törléskor.');
    }
  };

  const handleUjTanulo = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/Tanulo', ujTanulo);
      setUjTanulo({ nev: '', osztaly: '', terem: '', jogosultHazavivok: '' });
      tanulokatLeker();
    } catch (err) {
      alert('Hiba hozzáadáskor.');
    }
  };

  useEffect(() => {
    tanulokatLeker();
  }, []);

  return (
    <div className="container mt-4">
      <AdminNavbar />
      <h2>Tanulók kezelése</h2>

      <form onSubmit={handleUjTanulo} className="mb-4">
        <div className="row g-2">
          <div className="col"><input type="text" className="form-control" placeholder="Név" value={ujTanulo.nev} onChange={(e) => setUjTanulo({ ...ujTanulo, nev: e.target.value })} required /></div>
          <div className="col"><input type="text" className="form-control" placeholder="Osztály" value={ujTanulo.osztaly} onChange={(e) => setUjTanulo({ ...ujTanulo, osztaly: e.target.value })} required /></div>
          <div className="col"><input type="text" className="form-control" placeholder="Terem" value={ujTanulo.terem} onChange={(e) => setUjTanulo({ ...ujTanulo, terem: e.target.value })} required /></div>
          <div className="col"><input type="text" className="form-control" placeholder="Jogosult hazavivők" value={ujTanulo.jogosultHazavivok} onChange={(e) => setUjTanulo({ ...ujTanulo, jogosultHazavivok: e.target.value })} required /></div>
          <div className="col"><button type="submit" className="btn btn-success w-100">Hozzáadás</button></div>
        </div>
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Név</th>
            <th>Osztály</th>
            <th>Terem</th>
            <th>Jogosult hazavivők</th>
            <th>Műveletek</th>
          </tr>
        </thead>
        <tbody>
          {tanulok.map((tanulo) => (
            <tr key={tanulo.id}>
              <td>{tanulo.nev}</td>
              <td>{tanulo.osztaly}</td>
              <td>{tanulo.terem}</td>
              <td>{tanulo.jogosultHazavivok}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => setSzerkesztesTanulo(tanulo)}>✏️ Szerkesztés</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleTorles(tanulo.id)}>🗑️ Törlés</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {szerkesztesTanulo && (
        <div className="modal d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={async (e) => {
                e.preventDefault();
                try {
                  await axios.put(`/api/Tanulo/${szerkesztesTanulo.id}`, szerkesztesTanulo);
                  setSzerkesztesTanulo(null);
                  tanulokatLeker();
                } catch (err) {
                  alert('Hiba a tanuló frissítésekor.');
                }
              }}>
                <div className="modal-header">
                  <h5 className="modal-title">Tanuló szerkesztése</h5>
                  <button type="button" className="btn-close" onClick={() => setSzerkesztesTanulo(null)}></button>
                </div>
                <div className="modal-body">
                  <input type="text" className="form-control mb-2" placeholder="Név"
                    value={szerkesztesTanulo.nev}
                    onChange={(e) => setSzerkesztesTanulo({ ...szerkesztesTanulo, nev: e.target.value })}
                    required />
                  <input type="text" className="form-control mb-2" placeholder="Osztály"
                    value={szerkesztesTanulo.osztaly}
                    onChange={(e) => setSzerkesztesTanulo({ ...szerkesztesTanulo, osztaly: e.target.value })}
                    required />
                  <input type="text" className="form-control mb-2" placeholder="Terem"
                    value={szerkesztesTanulo.terem}
                    onChange={(e) => setSzerkesztesTanulo({ ...szerkesztesTanulo, terem: e.target.value })}
                    required />
                  <input type="text" className="form-control mb-2" placeholder="Jogosult hazavivők"
                    value={szerkesztesTanulo.jogosultHazavivok}
                    onChange={(e) => setSzerkesztesTanulo({ ...szerkesztesTanulo, jogosultHazavivok: e.target.value })}
                    required />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setSzerkesztesTanulo(null)}>Mégse</button>
                  <button type="submit" className="btn btn-primary">Mentés</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminOldal;
