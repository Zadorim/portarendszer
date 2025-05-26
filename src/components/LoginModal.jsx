import React, { useState, useContext } from 'react';
import { Modal, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { login as loginApi } from '../api/authApi';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from '../context/AuthContext';

const LoginModal = ({ show, handleClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hibaUzenet, setHibaUzenet] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setHibaUzenet('');

    try {
      const res = await loginApi(username, password);
      const { token } = res;

      if (token) {
        localStorage.setItem('token', token);
        const decoded = jwtDecode(token);

        const usernameDecoded = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
        const roleDecoded = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

        login(usernameDecoded, roleDecoded); // AuthContext frissítése

        handleClose();
        navigate('/');
      }
    } catch (err) {
      setHibaUzenet('Hibás felhasználónév vagy jelszó.');
      console.error('Login hiba:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Bejelentkezés</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {hibaUzenet && <Alert variant="danger">{hibaUzenet}</Alert>}

        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Felhasználónév</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoading}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Jelszó</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </Form.Group>

          <Button 
            variant="primary" 
            type="submit" 
            className="w-100"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner 
                  as="span" 
                  animation="border" 
                  size="sm" 
                  role="status" 
                  aria-hidden="true" 
                  className="me-2"
                />
                Bejelentkezés...
              </>
            ) : (
              'Belépés'
            )}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
