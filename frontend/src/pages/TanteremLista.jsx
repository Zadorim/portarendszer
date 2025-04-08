import React, { useEffect, useState } from 'react';
import { getTanteremek } from '../api/tanteremApi';
import TanteremModal from '../components/TanteremModal'; // << fontos
import { Button } from 'react-bootstrap';

function TanteremLista() {
  const [tantermek, setTantermek] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [kivalasztottTanterem, setKivalasztottTanterem] = useState(null);

  useEffect(() => {
    frissitTantermeket();
  }, []);

  const frissitTantermeket = async () => {
    const data = await getTanteremek();
    setTantermek(data);
  };

  const ujTanteremHozzaadasa = () => {
    setKivalasztottTanterem(null); // új tanterem
    setShowModal(true);
  };

  return (
    <div className="container mt-4">
      <h2>Tanterem lista</h2>

      <div className="d-flex justify-content-between align-items-center my-3">
        <Button onClick={ujTanteremHozzaadasa}>
          ➕ Új tanterem hozzáadása
        </Button>
      </div>

      <ul className="list-group">
        {tantermek.map((tanterem) => (
          <li key={tanterem.id} className="list-group-item">
            {tanterem.nev}
          </li>
        ))}
      </ul>

      {/* MODAL használata */}
      {showModal && (
        <TanteremModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onSave={frissitTantermeket}
          tanterem={kivalasztottTanterem}
        />
      )}
    </div>
  );
}

export default TanteremLista;



