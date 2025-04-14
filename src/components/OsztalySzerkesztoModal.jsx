import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';



function OsztalySzerkesztoModal({ osztaly, bezar, frissit }) {
  const [tanarok, setTanarok] = useState([]);
  const [termek, setTermek] = useState([]);
  const [valasztottTanar, setValasztottTanar] = useState(osztaly.osztalyfonokId || '');
  const [valasztottTerem, setValasztottTerem] = useState('');

  useEffect(() => {
    axios.get('/api/Felhasznalo/tanarok').then(res => setTanarok(res.data));
    axios.get('/api/Tanterem').then(res => setTermek(res.data));

    axios.get(`/api/TanteremHasznalat/osztaly/${osztaly.id}`)
      .then(res => {
        const aktualis = res.data.find(x => x.osztalyId === osztaly.id);
        if (aktualis) setValasztottTerem(aktualis.tanteremId);
      });
  }, [osztaly.id]);

  const mentes = async () => {
    try {
      await axios.put(`/api/Osztaly/${osztaly.id}`, {
        osztalyfonokId: valasztottTanar || null
      });

      if (valasztottTerem) {
        await axios.post('/api/TanteremHasznalat/mentes', {
          osztalyId: osztaly.id,
          tanteremId: valasztottTerem
        });
      }

      frissit();
      bezar();
    } catch (err) {
      alert('Hiba a mentéskor!');
      console.error(err);
    }
  };

  return (
    <Modal show onHide={bezar} centered>
      <Modal.Header closeButton>
        <Modal.Title>{osztaly.nev} osztály szerkesztése</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Osztályfőnök</Form.Label>
            <Form.Select
              value={valasztottTanar}
              onChange={(e) => setValasztottTanar(e.target.value)}
            >
              <option value="">-- válassz tanárt --</option>
              {tanarok.map(t => (
                <option key={t.id} value={t.id}>{t.nev}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Terem</Form.Label>
            <Form.Select
              value={valasztottTerem}
              onChange={(e) => setValasztottTerem(e.target.value)}
            >
              <option value="">-- válassz tantermet --</option>
              {termek.map(t => (
                <option key={t.id} value={t.id}>{t.nev}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={bezar}>Mégse</Button>
        <Button variant="primary" onClick={mentes}>Mentés</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default OsztalySzerkesztoModal;


