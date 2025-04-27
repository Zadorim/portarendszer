import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useDarkMode } from '../context/DarkModeContext';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css';

const AdminOldal = () => {
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();

  const menupontok = [
    {
      cim: 'Tantermek kezelése',
      leiras: 'Új tantermek hozzáadása, szerkesztése és törlése',
      icon: 'bi-door-closed',
      utvonal: '/admin/tanterem'
    },
    {
      cim: 'Osztályok kezelése',
      leiras: 'Osztályok, osztályfőnökök és termek szerkesztése',
      icon: 'bi-building',
      utvonal: '/admin/osztalyok'
    },
    {
      cim: 'Tanulók kezelése',
      leiras: 'Tanulók listázása, felvétele és szerkesztése',
      icon: 'bi-people-fill',
      utvonal: '/admin/tanulok'
    },
    {
      cim: 'Belépési napló',
      leiras: 'Admin, tanár és portás belépések megtekintése',
      icon: 'bi-journal-text',
      utvonal: '/admin/belepesek'
    },
    {
      cim: 'Profilom',
      leiras: 'Személyes adatok megtekintése, szerkesztése',
      icon: 'bi-person-circle',
      utvonal: '/admin/profil'
    },
    {
      cim: 'Tanári tablet',
      leiras: 'Tanári tablet felület',
      icon: 'bi-tablet-landscape',
      utvonal: '/tanar-tablet'
    }
  ];

  return (
    <div className={`admin-page min-vh-100 py-5 ${darkMode ? 'dark-mode' : ''}`}>
      <Container>
        <h1 className="text-center mb-5 fw-bold">Admin vezérlőpult</h1>
        <Row xs={1} md={2} lg={3} className="g-4">
          {menupontok.map((menu, index) => (
            <Col key={index}>
              <Card
                className={`h-100 shadow-sm admin-card transition-all text-center ${darkMode ? 'bg-dark text-light' : 'bg-light'}`}
                onClick={() => navigate(menu.utvonal)}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05) rotate(0.5deg)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                style={{ cursor: 'pointer', transition: 'transform 0.3s, box-shadow 0.3s' }}
              >
                <Card.Body className="d-flex flex-column align-items-center justify-content-center p-4">
                  <i className={`bi ${menu.icon} display-3 mb-3 ${darkMode ? 'text-primary' : 'text-primary'}`}></i>
                  <Card.Title className="mb-2 fs-4 fw-bold">{menu.cim}</Card.Title>
                  <Card.Text className="flex-grow-1">{menu.leiras}</Card.Text>
                  <Button
                    variant={darkMode ? "outline-primary" : "primary"}
                    className="mt-3"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(menu.utvonal);
                    }}
                  >
                    Megnyitás
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default AdminOldal;
