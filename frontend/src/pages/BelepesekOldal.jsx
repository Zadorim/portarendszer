import React from 'react';

function BelepesekOldal() {
  // Ide majd az API-ból jövő adatokat töltjük be később
  const belepesek = [
    { nev: 'Kiss Péter', szerepkor: 'admin', idopont: '2025-04-08 08:32' },
    { nev: 'Nagy Anna', szerepkor: 'portás', idopont: '2025-04-08 08:05' },
    { nev: 'Tóth Gábor', szerepkor: 'tanár', idopont: '2025-04-07 16:44' },
  ];

  return (
    <div className="container mt-5">
      <h2>Belépések megtekintése</h2>
      <p className="text-muted">Csak admin, portás és tanári belépések szerepelnek.</p>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Név</th>
            <th>Szerepkör</th>
            <th>Időpont</th>
          </tr>
        </thead>
        <tbody>
          {belepesek.map((b, index) => (
            <tr key={index}>
              <td>{b.nev}</td>
              <td>{b.szerepkor}</td>
              <td>{b.idopont}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BelepesekOldal;

