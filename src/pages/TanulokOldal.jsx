// TanulokOldal.jsx

import React, { useEffect, useState } from 'react';
import { getTanulok, deleteTanulo } from '../api/tanuloApi';
import { Button, Form, Container, Card } from 'react-bootstrap';
import { useDarkMode } from '../context/DarkModeContext';
import { useNavigate } from 'react-router-dom';
import AdminVisszaGomb from '../components/AdminVisszaGomb';
import AdminBreadcrumb from '../components/AdminBreadcrumb';
import '../style.css';

function TanulokOldal() {
  const [tanulok, setTanulok] = useState([]);
  const [kereses, setKereses] = useState('');
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();

  useEffect(() => {
    betoltTanulok();
  }, []);

  const betoltTanulok = async () => {
    try {
      const adatok = await getTanulok();
      setTanulok(adatok);
    } catch (error) {
      console.error('Hiba a tanulók betöltésekor:', error);
    }
  };

  const kezelesTorles = async (id) => {
    if (window.confirm('Biztosan törölni szeretnéd ezt a tanulót?')) {
      await deleteTanulo(id);
      betoltTanulok();
    }
  };

  const szurtTanulok = tanulok.filter((tanulo) =>
    tanulo.nev.toLowerCase().includes(kereses.toLowerCase()) ||
    (tanulo.osztalyNev && tanulo.osztalyNev.toLowerCase().includes(kereses.toLowerCase()))
  );

  return (
    <div
      className="py-4"
      style={{
        minHeight: '100vh',
        backgroundColor: darkMode ? '#121212' : 'peachpuff',
      }}
    >
      <Container>
        <AdminVisszaGomb />
        <AdminBreadcrumb current="tanulok" />

        <h2 className={`text-center mb-4 ${darkMode ? 'text-light' : 'text-dark'}`}>
          Tanulók kezelése
        </h2>

        <Form.Control
          type="text"
          placeholder="Keresés név vagy osztály alapján..."
          value={kereses}
          onChange={(e) => setKereses(e.target.value)}
          className="mb-4"
          style={{
            backgroundColor: darkMode ? '#333' : '#fff',
            color: darkMode ? '#fff' : '#000',
            borderColor: darkMode ? '#555' : '#ccc',
          }}
        />

        {szurtTanulok.map((tanulo) => (
          <Card
            key={tanulo.id}
            className={`mb-3 shadow-sm ${darkMode ? 'bg-secondary text-light' : 'bg-white text-dark'}`}
            style={{ borderRadius: '15px' }}
          >
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-2">{tanulo.nev}</h5>
                <p className="mb-0"><strong>Osztály:</strong> {tanulo.osztalyNev}</p>
                <p className="mb-0"><strong>Azonosító:</strong> {tanulo.id}</p>
              </div>
              <div>
                <Button
                  variant="info"
                  className="me-2"
                  onClick={() => navigate(`/admin/tanulok/szerkesztes/${tanulo.id}`)}
                >
                  <i className="bi bi-pencil"></i>
                </Button>
                <Button
                  variant="danger"
                  onClick={() => kezelesTorles(tanulo.id)}
                >
                  <i className="bi bi-trash"></i>
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </Container>
    </div>
  );
}

export default TanulokOldal;
