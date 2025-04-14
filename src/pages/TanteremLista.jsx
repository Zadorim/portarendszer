import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, InputGroup, FormControl } from 'react-bootstrap';
import { getTantermek, createTanterem, updateTanterem, deleteTanterem } from '../api/tanteremApi';
import { useDarkMode } from '../context/DarkModeContext';
import AdminVisszaGomb from '../components/AdminVisszaGomb';
import AdminBreadcrumb from '../components/AdminBreadcrumb';

function TanteremLista() {
  const { darkMode } = useDarkMode();
  const [tantermek, setTantermek] = useState([]);
  const [szuro, setSzuro] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [kivalasztott, setKivalasztott] = useState(null);
  const [formData, setFormData] = useState({ nev: '' });

  useEffect(() => {
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
    <div className={`container mt-4 p-4 rounded shadow-sm ${darkMode ? 'bg-dark text-light' : 'bg-white text-dark'}`}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center">
          <AdminVisszaGomb />
          <AdminBreadcrumb className="ms-3" />
        </div>
        <h2 className="fw-bold text-center mb-0" style={{ textShadow: darkMode ? '1px 1px 3px rgba(0,0,0,0.5)' : 'none' }}>
          Tantermek kezelése
        </h2>
        <Button variant="success" onClick={kezelesUj}>
          ➕ Új terem
        </Button>
      </div>

      <InputGroup className="mb-3">
        <FormControl
          placeholder="Keresés tanterem neve alapján..."
          value={szuro}
          onChange={(e) => setSzuro(e.target.value)}
          className={darkMode ? 'bg-dark text-light border-secondary' : ''}
        />
      </InputGroup>

      <Table bordered hover responsive className={darkMode ? 'table-dark' : 'table-light'}>
        <thead>
          <tr>
            <th>#</th>
            <th>Név</th>
            <th>Műveletek</th>
          </tr>
        </thead>
        <tbody>
          {szurtTantermek.map((terem, index) => (
            <tr key={terem.id}>
              <td>{index + 1}</td>
              <td>{terem.nev}</td>
              <td>
                <Button
                  size="sm"
                  variant="info"
                  className="me-2"
                  onClick={() => kezelesSzerkesztes(terem)}
                >
                  <i className="bi bi-pencil-square" />
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => torles(terem.id)}
                >
                  <i className="bi bi-trash" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal ablak */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className={darkMode ? 'bg-dark text-light' : ''}>
          <Modal.Title>{kivalasztott ? 'Tanterem szerkesztése' : 'Új tanterem'}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={darkMode ? 'bg-dark text-light' : ''}>
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
        <Modal.Footer className={darkMode ? 'bg-dark text-light' : ''}>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Mégse
          </Button>
          <Button variant="primary" onClick={mentes}>
            Mentés
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TanteremLista;
