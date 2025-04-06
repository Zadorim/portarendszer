import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const LoginModal = ({ show, handleClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/Auth/login', {
        felhasznalonev: username,
        jelszo: password
      });

      const { username: uname, role, token } = res.data;
      localStorage.setItem('username', uname);
      localStorage.setItem('role', role);
      if (token) localStorage.setItem('token', token);

      alert('Sikeres bejelentkezés!');
      window.location.reload(); // frissíti a Navbar-t
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
            <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Jelszó</Form.Label>
            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Form.Group>
          <Button variant="primary" type="submit">Belépés</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
