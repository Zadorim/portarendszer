import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const RegisterModal = ({ show, handleClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      alert("A jelszavak nem egyeznek!");
      return;
    }

    try {
      await axios.post('/api/Auth/register', {
        felhasznalonev: username,
        jelszo: password,
      });

      alert('Sikeres regisztráció!');
      handleClose();
      window.location.reload(); // frissítés
    } catch (err) {
      alert('Hiba: ' + (err.response?.data || err.message));
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Regisztráció</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleRegister}>
          <Form.Group className="mb-3">
            <Form.Label>Felhasználónév</Form.Label>
            <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Jelszó</Form.Label>
            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Jelszó megerősítése</Form.Label>
            <Form.Control type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
          </Form.Group>
          <Button variant="info" type="submit">Regisztráció</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterModal;
