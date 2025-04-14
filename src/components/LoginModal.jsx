import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/authApi';


const LoginModal = ({ show, handleClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login(username, password); // authApi.js metódus
      const { token } = res;

      if (token) localStorage.setItem('token', token);

      const decoded = jwtDecode(token);
      const usernameDecoded = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
      const roleDecoded = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

      localStorage.setItem('username', usernameDecoded);
      localStorage.setItem('role', roleDecoded);
      
      alert('Sikeres bejelentkezés!');
      handleClose(); // Modal bezárása
      navigate('/redirect'); // szerepkör alapú irányítás
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Jelszó</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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



