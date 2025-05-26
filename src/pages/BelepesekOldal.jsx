import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDarkMode } from '../context/DarkModeContext';
import AdminVisszaGomb from '../components/AdminVisszaGomb';

const BelepesekOldal = () => {
  const [felhasznalok, setFelhasznalok] = useState([]);
  const { darkMode } = useDarkMode();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // lap tetejére ugrás
    axios.get('http://localhost:5072/api/Felhasznalo')
      .then(res => setFelhasznalok(res.data))
      .catch(err => {
        console.error(err);
        alert("Hiba a belépési adatok lekérésekor.");
      });
  }, []);

  const formatDatum = (ido) => {
    if (!ido) return "---";
    const datum = new Date(ido);
    return datum.toLocaleString("hu-HU", {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit'
    });
  };

  return (  
    <div className={`admin-page belepesek-oldal container mt-4 ${darkMode ? 'dark-mode' : ''}`}>
      <AdminVisszaGomb />
      <h2 className="text-center mb-4">Belépési napló</h2>

      <div className="table-responsive">
        <table className={`table table-bordered ${darkMode ? 'table-dark' : 'table-light'}`}>
          <thead>
            <tr>
              <th>Név</th>
              <th>Szerepkör</th>
              <th>Belépési idő</th>
              <th>Kilépési idő</th>
              <th>Utolsó aktivitás</th>
            </tr>
          </thead>
          <tbody>
            {felhasznalok.map(f => (
              <tr key={f.id}>
                <td>{f.nev}</td>
                <td>{f.beosztas}</td>
                <td>{formatDatum(f.belepesIdopontok?.[0]?.belepesi_ido)}</td>
                <td>{formatDatum(f.belepesIdopontok?.[0]?.kilepesi_ido)}</td>
                <td>{formatDatum(f.belepesIdopontok?.[0]?.utolso_aktivitas)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>  
  );
};

export default BelepesekOldal;



