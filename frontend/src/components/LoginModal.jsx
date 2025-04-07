import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/authApi';

const LoginModal = ({ show, handleClose }) => {
  const [felhasznalonev, setFelhasznalonev] = useState('');
  const [jelszo, setJelszo] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { username, role } = await login(felhasznalonev, jelszo);

      // Mentés localStorage-be
      localStorage.setItem('username', username);
      localStorage.setItem('role', role);

      alert('Sikeres bejelentkezés!');
      handleClose();

      // Navigáció szerepkör alapján
      switch (role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'portas':
          navigate('/portas');
          break;
        default:
          navigate('/');
          break;
      }

    } catch (err) {
      alert('Hibás bejelentkezés: ' + (err.response?.data || err.message));
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Bejelentkezés</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Felhasználónév</Form.Label>
            <Form.Control
              type="text"
              value={felhasznalonev}
              onChange={(e) => setFelhasznalonev(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Jelszó</Form.Label>
            <Form.Control
              type="password"
              value={jelszo}
              onChange={(e) => setJelszo(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">Belépés</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;


