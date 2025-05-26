import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { register } from '../api/authApi';
import { AuthContext } from '../context/AuthContext';

const RegisterModal = ({ show, handleClose }) => {
  const [felhasznalonev, setFelhasznalonev] = useState('');
  const [jelszo, setJelszo] = useState('');
  const [megerosites, setMegerosites] = useState('');
  const [nev, setNev] = useState('');
  const [email, setEmail] = useState('');
  const [beosztas, setBeosztas] = useState('');

  const [hibaUzenet, setHibaUzenet] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login: contextLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setHibaUzenet('');
    setIsLoading(true);

    if (jelszo !== megerosites) {
      setHibaUzenet('A jelszavak nem egyeznek!');
      setIsLoading(false);
      return;
    }

    try {
      await register({ felhasznalonev, jelszo, nev, email, beosztas });
      contextLogin(felhasznalonev, beosztas); // belépés AuthContext-be
      handleClose(); // modal bezárása
      navigate(`/${beosztas}`); // irányítás szerepkör alapján
    } catch (err) {
      setHibaUzenet('Hiba a regisztráció során: ' + (err.response?.data || err.message));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Regisztráció</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {hibaUzenet && <Alert variant="danger">{hibaUzenet}</Alert>}

        <Form onSubmit={handleRegister}>
          <Form.Group className="mb-3">
            <Form.Label>Felhasználónév</Form.Label>
            <Form.Control
              type="text"
              value={felhasznalonev}
              onChange={(e) => setFelhasznalonev(e.target.value)}
              required
              disabled={isLoading}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Teljes név</Form.Label>
            <Form.Control
              type="text"
              value={nev}
              onChange={(e) => setNev(e.target.value)}
              required
              disabled={isLoading}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Beosztás</Form.Label>
            <Form.Select
              value={beosztas}
              onChange={(e) => setBeosztas(e.target.value)}
              required
              disabled={isLoading}
            >
              <option value="">-- válassz beosztást --</option>
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
              disabled={isLoading}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Jelszó megerősítése</Form.Label>
            <Form.Control
              type="password"
              value={megerosites}
              onChange={(e) => setMegerosites(e.target.value)}
              required
              disabled={isLoading}
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button
              variant="secondary"
              className="me-2"
              onClick={handleClose}
              disabled={isLoading}
            >
              Mégse
            </Button>
            <Button
              variant="info"
              type="submit"
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
                  Regisztráció...
                </>
              ) : (
                'Regisztráció'
              )}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterModal;
