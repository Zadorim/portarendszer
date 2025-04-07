import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';

function TanteremLista() {
  const [termek, setTermek] = useState([]);
  const [kereses, setKereses] = useState('');
  const [ujTerem, setUjTerem] = useState('');
  const [szerkesztettTerem, setSzerkesztettTerem] = useState(null);
  const [ujNev, setUjNev] = useState('');

  useEffect(() => {
    betoltTermek();
  }, []);

  const betoltTermek = () => {
    axios.get('/api/Tanterem')
      .then(res => setTermek(res.data))
      .catch(err => console.error('Hiba a tantermek betöltésekor:', err));
  };

  const teremHozzaadas = () => {
    if (!ujTerem.trim()) return;
    axios.post('/api/Tanterem', { nev: ujTerem, aktiv: true })
      .then(() => {
        setUjTerem('');
        betoltTermek();
      })
      .catch(err => alert('Hiba a terem hozzáadásakor: ' + err));
  };

  const teremTorles = (id) => {
    if (window.confirm('Biztosan törlöd ezt a tantermet?')) {
      axios.delete(`/api/Tanterem/${id}`)
        .then(() => betoltTermek())
        .catch(err => alert('Hiba a törléskor: ' + err));
    }
  };

  const teremSzerkesztes = (terem) => {
    setSzerkesztettTerem(terem);
    setUjNev(terem.nev);
  };

  const mentes = () => {
    axios.put(`/api/Tanterem/${szerkesztettTerem.id}`, {
      ...szerkesztettTerem,
      nev: ujNev
    }).then(() => {
      setSzerkesztettTerem(null);
      setUjNev('');
      betoltTermek();
    }).catch(err => alert('Hiba a mentés során: ' + err));
  };

  const szurtTermek = termek.filter(t =>
    t.nev.toLowerCase().includes(kereses.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Tanterem lista</h2>

      <div className="d-flex mb-3">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Új terem neve"
          value={ujTerem}
          onChange={(e) => setUjTerem(e.target.value)}
        />
        <Button variant="success" onClick={teremHozzaadas}>
          ➕ Hozzáadás
        </Button>
      </div>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="🔎 Keresés tantermek között..."
          value={kereses}
          onChange={(e) => setKereses(e.target.value)}
        />
      </div>

      <table className="table table-striped table-bordered">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Név</th>
            <th>Műveletek</th>
          </tr>
        </thead>
        <tbody>
          {szurtTermek.map(t => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.nev}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => teremSzerkesztes(t)} className="me-2">✏️ Szerkesztés</Button>
                <Button variant="danger" size="sm" onClick={() => teremTorles(t.id)}>🗑️ Törlés</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={!!szerkesztettTerem} onHide={() => setSzerkesztettTerem(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Tanterem szerkesztése</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Új név</Form.Label>
            <Form.Control
              type="text"
              value={ujNev}
              onChange={(e) => setUjNev(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSzerkesztettTerem(null)}>Mégse</Button>
          <Button variant="primary" onClick={mentes}>Mentés</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TanteremLista;



