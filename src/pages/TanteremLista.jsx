import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, InputGroup, FormControl, Card } from 'react-bootstrap';
import { getTantermek, createTanterem, updateTanterem, deleteTanterem } from '../api/tanteremApi';
import { useDarkMode } from '../context/DarkModeContext';
import AdminVisszaGomb from '../components/AdminVisszaGomb';
import AdminBreadcrumb from '../components/AdminBreadcrumb';
import '../style.css';

function TanteremLista() {
  const { darkMode } = useDarkMode();
  const [tantermek, setTantermek] = useState([]);
  const [szuro, setSzuro] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [kivalasztott, setKivalasztott] = useState(null);
  const [formData, setFormData] = useState({ nev: '' });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // lap tetejére ugrás
    betoltTantermeket();
  }, []);

  const betoltTantermeket = async () => {
    try {
      const adatok = await getTantermek();
      setTantermek(adatok);
    } catch (error) {
      alert('Hiba a tantermek betöltésekor!');
      console.error(error);
    }
  };

  const kezelesUj = () => {
    setKivalasztott(null);
    setFormData({ nev: '' });
    setShowModal(true);
  };

  const kezelesSzerkesztes = (terem) => {
    setKivalasztott(terem);
    setFormData({ nev: terem.nev });
    setShowModal(true);
  };

  const mentes = async () => {
    try {
      if (kivalasztott?.id) {
        await updateTanterem(kivalasztott.id, formData);
      } else {
        await createTanterem(formData);
      }
      setShowModal(false);
      betoltTantermeket();
    } catch (error) {
      alert('Mentés sikertelen!');
    }
  };

  const torles = async (id) => {
    if (window.confirm('Biztosan törlöd ezt a tantermet?')) {
      try {
        await deleteTanterem(id);
        betoltTantermeket();
      } catch (error) {
        alert('Törlés sikertelen!');
      }
    }
  };

  const szurtTantermek = tantermek.filter((t) =>
    t.nev.toLowerCase().includes(szuro.toLowerCase())
  );

  return (
    <div className="admin-page container my-4 p-4 rounded shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center">
          <AdminVisszaGomb />
          <AdminBreadcrumb className="ms-3" />
        </div>
        <h2 className="fw-bold text-center">Tantermek kezelése</h2>
        <Button variant="success" onClick={kezelesUj}>➕ Új terem</Button>
      </div>

      <InputGroup className="mb-4">
        <FormControl
          placeholder="Keresés tanterem neve alapján..."
          value={szuro}
          onChange={(e) => setSzuro(e.target.value)}
        />
      </InputGroup>

      <div className="tanterem-grid">
        {szurtTantermek.map((terem) => (
          <Card key={terem.id} className={`tanterem-card border-0 ${darkMode ? 'dark-card' : 'bg-white shadow-sm'}`}>
            <Card.Body>
              <Card.Title>{terem.nev}</Card.Title>
              <div className="d-flex justify-content-end gap-2">
                <Button size="sm" variant="info" onClick={() => kezelesSzerkesztes(terem)}>
                  <i className="bi bi-pencil-square" />
                </Button>
                <Button size="sm" variant="danger" onClick={() => torles(terem.id)}>
                  <i className="bi bi-trash" />
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{kivalasztott ? 'Tanterem szerkesztése' : 'Új tanterem'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Tanterem neve</Form.Label>
              <Form.Control
                type="text"
                value={formData.nev}
                onChange={(e) => setFormData({ nev: e.target.value })}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Mégse</Button>
          <Button variant="primary" onClick={mentes}>Mentés</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TanteremLista;