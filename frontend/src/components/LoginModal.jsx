import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const LoginModal = ({ show, handleClose }) =>
{
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) =>
  {
    e.preventDefault();
    try
    {
      const res = await axios.post('http://localhost:5072/api/Auth/login', {
        felhasznalonev: username,
        jelszo: password
      });

      const { username: uname, role, token } = res.data;

      if (token) localStorage.setItem('token', token);
      var decodeToken = jwtDecode(token);
      localStorage.setItem('username', decodeToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]);
      localStorage.setItem('role', decodeToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);

      alert('Sikeres bejelentkezés!');
      window.location.reload();
       // Navigáció szerepkör szerint:
       switch (role) {
        case "admin":
          navigate("/admin");
          break;
        case "portas":
          navigate("/portas");
          break;
        default:
          navigate("/");
          break;
      }
    }
    catch (err)
    {
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
