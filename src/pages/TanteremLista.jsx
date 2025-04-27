// TanteremLista.jsx

import React, { useEffect, useState } from 'react';
import { getTantermek, deleteTanterem } from '../api/tanteremApi';
import { Button, Form, Container, Card } from 'react-bootstrap';
import { useDarkMode } from '../context/DarkModeContext';
import { useNavigate } from 'react-router-dom';
import AdminVisszaGomb from '../components/AdminVisszaGomb';
import AdminBreadcrumb from '../components/AdminBreadcrumb';
import '../style.css';

function TanteremLista() {
  const [tantermek, setTantermek] = useState([]);
  const [kereses, setKereses] = useState('');
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();

  useEffect(() => {
    betoltTantermek();
  }, []);

  const betoltTantermek = async () => {
    try {
      const adatok = await getTantermek();
      setTantermek(adatok);
    } catch (error) {
      console.error('Hiba a tantermek betöltésekor:', error);
    }
  };

  const kezelesTorles = async (id) => {
    if (window.confirm('Biztosan törölni szeretnéd ezt a tantermet?')) {
      await deleteTanterem(id);
      betoltTantermek();
    }
  };

  const szurtTantermek = tantermek.filter((terem) =>
    terem.nev.toLowerCase().includes(kereses.toLowerCase())
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
        <AdminBreadcrumb current="tanterem" />

        <h2 className={`text-center mb-4 ${darkMode ? 'text-light' : 'text-dark'}`}>
          Tantermek kezelése
        </h2>

        <Form.Control
          type="text"
          placeholder="Keresés tanterem neve alapján..."
          value={kereses}
          onChange={(e) => setKereses(e.target.value)}
          className="mb-4"
          style={{
            backgroundColor: darkMode ? '#333' : '#fff',
            color: darkMode ? '#fff' : '#000',
            borderColor: darkMode ? '#555' : '#ccc',
          }}
        />

        {szurtTantermek.map((terem) => (
          <Card
            key={terem.id}
            className={`mb-3 shadow-sm ${darkMode ? 'bg-secondary text-light' : 'bg-white text-dark'}`}
            style={{ borderRadius: '15px' }}
          >
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                {terem.nev}
              </div>
              <div>
                <Button
                  variant="info"
                  className="me-2"
                  onClick={() => navigate(`/admin/tanterem/szerkesztes/${terem.id}`)}
                >
                  <i className="bi bi-pencil"></i>
                </Button>
                <Button
                  variant="danger"
                  onClick={() => kezelesTorles(terem.id)}
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

export default TanteremLista;
