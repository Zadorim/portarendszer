import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from '../components/AdminNavbar';

function AdminOldal() {
  const [tanulok, setTanulok] = useState([]);
  const [ujTanulo, setUjTanulo] = useState({
    nev: '',
    osztaly: '',
    terem: '',
    jogosultHazavivok: ''
  });

  useEffect(() => {
    tanulokatLeker();
  }, []);

  const tanulokatLeker = async () => {
    try {
      const res = await axios.get('/api/Tanulo');
      setTanulok(res.data);
    } catch (error) {
      console.error('Hiba a tanulók lekérésekor:', error);
    }
  };

  const handleValtozas = (e) => {
    setUjTanulo({ ...ujTanulo, [e.target.name]: e.target.value });
  };

  const handleUjTanulo = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/Tanulo', ujTanulo);
      setUjTanulo({ nev: '', osztaly: '', terem: '', jogosultHazavivok: '' });
      tanulokatLeker();
    } catch (error) {
      alert('Hiba új tanuló hozzáadásakor!');
    }
  };

  const handleTorles = async (id) => {
    if (!window.confirm('Biztosan törölni szeretnéd ezt a tanulót?')) return;
    try {
      await axios.delete(`/api/Tanulo/${id}`);
      setTanulok(tanulok.filter(t => t.id !== id));
    } catch (error) {
      alert('Hiba a tanuló törlésekor!');
    }
  };

  return (
    <div>
      <AdminNavbar />
      <div className="container mt-4">
        <h2>Tanulók kezelése</h2>

        <form onSubmit={handleUjTanulo} className="row g-3 mb-4">
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              name="nev"
              placeholder="Név"
              value={ujTanulo.nev}
              onChange={handleValtozas}
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              name="osztaly"
              placeholder="Osztály"
              value={ujTanulo.osztaly}
              onChange={handleValtozas}
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              name="terem"
              placeholder="Terem"
              value={ujTanulo.terem}
              onChange={handleValtozas}
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              name="jogosultHazavivok"
              placeholder="Jogosult személy(ek)"
              value={ujTanulo.jogosultHazavivok}
              onChange={handleValtozas}
              required
            />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-success w-100">Hozzáadás</button>
          </div>
        </form>

        <table className="table table-striped">
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
                  <button className="btn btn-danger btn-sm" onClick={() => handleTorles(tanulo.id)}>🗑️ Törlés</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminOldal;


