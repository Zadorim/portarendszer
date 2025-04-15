import React, { useEffect, useState } from 'react';
import { getOsztalyok, createOsztaly, updateOsztaly, deleteOsztaly } from '../api/osztalyApi';
import { Button, Modal, Form, InputGroup, FormControl, Card, Container } from 'react-bootstrap';
import { useDarkMode } from '../context/DarkModeContext';
import AdminVisszaGomb from '../components/AdminVisszaGomb';
import AdminBreadcrumb from '../components/AdminBreadcrumb';
import '../style.css';

function OsztalyokOldal() {
  const { darkMode } = useDarkMode();
  const [osztalyok, setOsztalyok] = useState([]);
  const [szuro, setSzuro] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [kivalasztott, setKivalasztott] = useState(null);
  const [formData, setFormData] = useState({ nev: '', egyediAzonosito: '', osztalyfonokNev: '' });

  useEffect(() => {
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
    <Container className={`tablet-page py-4 ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
      <div className=" d-flex align-items-center mb-3">
        <AdminVisszaGomb />
        <AdminBreadcrumb className="ms-3" />
      </div>

      <h2 className="text-center mb-4">Osztályok kezelése</h2>

      <InputGroup className="mb-3">
        <FormControl
          placeholder="Keresés osztály vagy osztályfőnök alapján..."
          value={szuro}
          onChange={(e) => setSzuro(e.target.value)}
        />
        <Button variant="success" onClick={kezelesUj}>➕ Új osztály</Button>
      </InputGroup>

      <div className=" admin-page tanterem-grid">
        {szurtLista.map((o) => (
          <Card key={o.id} className={`tanterem-card ${darkMode ? 'dark-card' : ''}`}>
            <Card.Body>
              <Card.Title>{o.nev}</Card.Title>
              <Card.Text>
                <strong>Azonosító:</strong> {o.egyediAzonosito}<br />
                <strong>Osztályfőnök:</strong> {o.osztalyfonokNev || '-'}
              </Card.Text>
              <div className="d-flex justify-content-end gap-2">
                <Button size="sm" variant="info" onClick={() => kezelesSzerkesztes(o)}>✏️</Button>
                <Button size="sm" variant="danger" onClick={() => torles(o.id)}>🗑️</Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{kivalasztott ? 'Osztály szerkesztése' : 'Új osztály'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control className="mb-2" placeholder="Osztály neve" value={formData.nev} onChange={(e) => setFormData({ ...formData, nev: e.target.value })} />
            <Form.Control className="mb-2" placeholder="Egyedi azonosító" value={formData.egyediAzonosito} onChange={(e) => setFormData({ ...formData, egyediAzonosito: e.target.value })} />
            <Form.Control placeholder="Osztályfőnök neve" value={formData.osztalyfonokNev} onChange={(e) => setFormData({ ...formData, osztalyfonokNev: e.target.value })} />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Mégse</Button>
          <Button variant="primary" onClick={mentes}>Mentés</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default OsztalyokOldal;