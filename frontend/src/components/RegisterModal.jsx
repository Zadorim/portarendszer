import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { register } from '../api/authApi';

const RegisterModal = ({ show, handleClose }) => {
  const [felhasznalonev, setFelhasznalonev] = useState('');
  const [jelszo, setJelszo] = useState('');
  const [megerosites, setMegerosites] = useState('');
  const [nev, setNev] = useState('');
  const [email, setEmail] = useState('');
  const [beosztas, setBeosztas] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    if (jelszo !== megerosites) {
      alert("A jelszavak nem egyeznek!");
      return;
    }

    try {
      await register({
        felhasznalonev,
        jelszo,
        nev,
        email,
        beosztas
      });

      alert('Sikeres regisztráció!');
      handleClose();
      window.location.reload();
    } catch (err) {
      alert('Hiba a regisztrációnál: ' + (err.response?.data || err.message));
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
            <Form.Control
              type="text"
              value={felhasznalonev}
              onChange={(e) => setFelhasznalonev(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Teljes név</Form.Label>
            <Form.Control
              type="text"
              value={nev}
              onChange={(e) => setNev(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Beosztás</Form.Label>
            <Form.Select
              value={beosztas}
              onChange={(e) => setBeosztas(e.target.value)}
              required
            >
              <option value="">Válassz beosztást</option>
              <option value="admin">Admin</option>
              <option value="portas">Portás</option>
              <option value="tanar">Tanár</option>
            </Form.Select>
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

          <Form.Group className="mb-3">
            <Form.Label>Jelszó megerősítése</Form.Label>
            <Form.Control
              type="password"
              value={megerosites}
              onChange={(e) => setMegerosites(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="info" type="submit">Regisztráció</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterModal;

