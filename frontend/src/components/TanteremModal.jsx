import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { createTanterem, updateTanterem } from '../api/tanteremApi';

function TanteremModal({ show, onClose, onSave, tanterem }) {
  const [nev, setNev] = useState('');

  useEffect(() => {
    if (tanterem) setNev(tanterem.nev || '');
  }, [tanterem]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (tanterem?.id) {
        await updateTanterem(tanterem.id, { nev });
      } else {
        await createTanterem({ nev });
      }
      onSave();
      onClose();
    } catch (err) {
      alert('Hiba mentés közben!');
      console.error(err);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{tanterem ? 'Tanterem szerkesztése' : 'Új tanterem'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Tanterem neve</Form.Label>
            <Form.Control
              type="text"
              value={nev}
              onChange={(e) => setNev(e.target.value)}
              required
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" className="me-2" onClick={onClose}>
              Mégse
            </Button>
            <Button variant="primary" type="submit">
              Mentés
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default TanteremModal;
