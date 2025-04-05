import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from '../components/AdminNavbar';

const TanulokOldal = () => {
  const [tanulok, setTanulok] = useState([]);
  const [ujTanulo, setUjTanulo] = useState({ nev: '', osztaly: '', azonosito: '', jogosult: '' });
  const [mutatModalt, setMutatModalt] = useState(false);

  useEffect(() => {
    betoltTanulok();
  }, []);

  const betoltTanulok = () => {
    axios.get('/api/Tanulo')
      .then(res => setTanulok(res.data))
      .catch(err => console.error('Hiba a lekérdezés során:', err));
  };

  const handleChange = (e) => {
    setUjTanulo({ ...ujTanulo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/Tanulo', ujTanulo)
      .then(() => {
        setMutatModalt(false);
        setUjTanulo({ nev: '', osztaly: '', azonosito: '', jogosult: '' });
        betoltTanulok();
      })
      .catch(err => alert('Hiba: ' + err.response?.data || err.message));
  };

  return (
    <>
      <AdminNavbar />
      <div className="container mt-5 pt-5">
        <h2>Tanulók kezelése</h2>
        <button className="btn btn-success mb-3" onClick={() => setMutatModalt(true)}>
          + Új tanuló
        </button>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>Név</th>
              <th>Osztály</th>
              <th>Azonosító</th>
              <th>Jogosult személy</th>
            </tr>
          </thead>
          <tbody>
            {tanulok.map((tanulo, index) => (
              <tr key={index}>
                <td>{tanulo.nev}</td>
                <td>{tanulo.osztaly}</td>
                <td>{tanulo.azonosito}</td>
                <td>{tanulo.jogosult}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {mutatModalt && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">Új tanuló hozzáadása</h5>
                  <button type="button" className="btn-close" onClick={() => setMutatModalt(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label>Név</label>
                    <input type="text" className="form-control" name="nev" onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label>Osztály</label>
                    <input type="text" className="form-control" name="osztaly" onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label>Azonosító</label>
                    <input type="text" className="form-control" name="azonosito" onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label>Jogosult személy</label>
                    <input type="text" className="form-control" name="jogosult" onChange={handleChange} />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setMutatModalt(false)}>Mégse</button>
                  <button type="submit" className="btn btn-primary">Hozzáadás</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TanulokOldal;


