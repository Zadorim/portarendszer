import React, { useEffect, useState } from 'react';
import { getOsztalyok, createOsztaly, updateOsztaly, deleteOsztaly } from '../api/osztalyApi';
import { Button, Table, Modal, Form, InputGroup, FormControl } from 'react-bootstrap';
import { useDarkMode } from '../context/DarkModeContext';
import AdminVisszaGomb from '../components/AdminVisszaGomb';
import '../style.css';

function OsztalyokOldal() {
  const { isDarkMode } = useDarkMode();
  const [osztalyok, setOsztalyok] = useState([]);
  const [szuro, setSzuro] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [kivalasztott, setKivalasztott] = useState(null);
  const [formData, setFormData] = useState({
    nev: '',
    egyediAzonosito: '',
    osztalyfonokNev: ''
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // lap tetejére ugrás
    betoltOsztalyokat();
  }, []);

  const betoltOsztalyokat = async () => {
    try {
      const adatok = await getOsztalyok();
      setOsztalyok(adatok);
    } catch (err) {
      alert('Hiba az osztályok betöltésekor!');
    }
  };

  const kezelesUj = () => {
    setKivalasztott(null);
    setFormData({ nev: '', egyediAzonosito: '', osztalyfonokNev: '' });
    setShowModal(true);
  };

  const kezelesSzerkesztes = (osztaly) => {
    setKivalasztott(osztaly);
    setFormData({
      nev: osztaly.nev,
      egyediAzonosito: osztaly.egyediAzonosito || '',
      osztalyfonokNev: osztaly.osztalyfonokNev || ''
    });
    setShowModal(true);
  };

  const mentes = async () => {
    try {
      if (kivalasztott?.id) {
        await updateOsztaly(kivalasztott.id, formData);
      } else {
        await createOsztaly(formData);
      }
      setShowModal(false);
      betoltOsztalyokat();
    } catch (err) {
      alert('Mentés sikertelen!');
      console.error(err);
    }
  };

  const torles = async (id) => {
    if (window.confirm('Biztosan törlöd ezt az osztályt?')) {
      try {
        await deleteOsztaly(id);
        betoltOsztalyokat();
      } catch (err) {
        alert('Törlés sikertelen!');
      }
    }
  };

  const szurtLista = osztalyok.filter((o) =>
    o.nev.toLowerCase().includes(szuro.toLowerCase()) ||
    (o.osztalyfonokNev || '').toLowerCase().includes(szuro.toLowerCase())
  );

  return (
  <div className="admin-page"> 
    <div className={`admin-page p-4 ${isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`} style={{ minHeight: '100vh' }}>
      <AdminVisszaGomb />
      <h2 className="text-center mb-4">Osztályok kezelése</h2>

      <InputGroup className="mb-3">
        <FormControl
          placeholder="Keresés osztály vagy osztályfőnök alapján..."
          value={szuro}
          onChange={(e) => setSzuro(e.target.value)}
          className={isDarkMode ? 'bg-dark text-light border-secondary' : ''}
        />
        <Button variant="success" onClick={kezelesUj}>➕ Új osztály</Button>
      </InputGroup>

      <Table striped bordered hover responsive className={isDarkMode ? 'table-dark' : ''}>
        <thead>
          <tr>
            <th>Név</th>
            <th>Azonosító</th>
            <th>Osztályfőnök</th>
            <th>Műveletek</th>
          </tr>
        </thead>
        <tbody>
          {szurtLista.map((o) => (
            <tr key={o.id}>
              <td>{o.nev}</td>
              <td>{o.egyediAzonosito}</td>
              <td>{o.osztalyfonokNev || '-'}</td>
              <td>
                <Button size="sm" variant="primary" className="me-2" onClick={() => kezelesSzerkesztes(o)}>✏️</Button>
                <Button size="sm" variant="danger" onClick={() => torles(o.id)}>🗑️</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal ablak */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered dialogClassName={isDarkMode ? 'modal-dark' : ''}>
        <Modal.Header closeButton>
          <Modal.Title>{kivalasztott ? 'Osztály szerkesztése' : 'Új osztály'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Osztály neve</Form.Label>
              <Form.Control
                type="text"
                value={formData.nev}
                onChange={(e) => setFormData({ ...formData, nev: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Egyedi azonosító</Form.Label>
              <Form.Control
                type="text"
                value={formData.egyediAzonosito}
                onChange={(e) => setFormData({ ...formData, egyediAzonosito: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Osztályfőnök neve</Form.Label>
              <Form.Control
                type="text"
                value={formData.osztalyfonokNev}
                onChange={(e) => setFormData({ ...formData, osztalyfonokNev: e.target.value })}
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
  </div>
  );
}

export default OsztalyokOldal;
