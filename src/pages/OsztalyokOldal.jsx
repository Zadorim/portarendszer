// OsztalyokOldal.jsx

import React, { useEffect, useState } from 'react';
import { getOsztalyok, deleteOsztaly } from '../api/osztalyApi';
import { Button, Form, Container, Card } from 'react-bootstrap';
import { useDarkMode } from '../context/DarkModeContext';
import { useNavigate } from 'react-router-dom';
import AdminVisszaGomb from '../components/AdminVisszaGomb';
import AdminBreadcrumb from '../components/AdminBreadcrumb';
import '../style.css';

function OsztalyokOldal() {
  const [osztalyok, setOsztalyok] = useState([]);
  const [kereses, setKereses] = useState('');
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();

  useEffect(() => {
    betoltOsztalyok();
  }, []);

  const betoltOsztalyok = async () => {
    try {
      const adatok = await getOsztalyok();
      setOsztalyok(adatok);
    } catch (error) {
      console.error('Hiba az osztályok betöltésekor:', error);
    }
  };

  const kezelesTorles = async (id) => {
    if (window.confirm('Biztosan törölni szeretnéd ezt az osztályt?')) {
      await deleteOsztaly(id);
      betoltOsztalyok();
    }
  };

  const szurtOsztalyok = osztalyok.filter((osztaly) =>
    osztaly.nev.toLowerCase().includes(kereses.toLowerCase()) ||
    (osztaly.osztalyfonokNev && osztaly.osztalyfonokNev.toLowerCase().includes(kereses.toLowerCase()))
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
        <AdminBreadcrumb current="osztalyok" />

        <h2 className={`text-center mb-4 ${darkMode ? 'text-light' : 'text-dark'}`}>
          Osztályok kezelése
        </h2>

        <Form.Control
          type="text"
          placeholder="Keresés osztály vagy osztályfőnök alapján..."
          value={kereses}
          onChange={(e) => setKereses(e.target.value)}
          className="mb-4"
          style={{
            backgroundColor: darkMode ? '#333' : '#fff',
            color: darkMode ? '#fff' : '#000',
            borderColor: darkMode ? '#555' : '#ccc',
          }}
        />

        {szurtOsztalyok.map((osztaly) => (
          <Card
            key={osztaly.id}
            className={`mb-3 shadow-sm ${darkMode ? 'bg-secondary text-light' : 'bg-white text-dark'}`}
            style={{ borderRadius: '15px' }}
          >
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-2">{osztaly.nev}</h5>
                <p className="mb-0">
                  <strong>Azonosító:</strong> {osztaly.id}
                </p>
                {osztaly.osztalyfonokNev && (
                  <p className="mb-0">
                    <strong>Osztályfőnök:</strong> {osztaly.osztalyfonokNev}
                  </p>
                )}
              </div>
              <div>
                <Button
                  variant="info"
                  className="me-2"
                  onClick={() => navigate(`/admin/osztalyok/szerkesztes/${osztaly.id}`)}
                >
                  <i className="bi bi-pencil"></i>
                </Button>
                <Button
                  variant="danger"
                  onClick={() => kezelesTorles(osztaly.id)}
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

export default OsztalyokOldal;
