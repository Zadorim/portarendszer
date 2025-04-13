import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useDarkMode } from '../context/DarkModeContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const AdminOldal = () => {
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();

  // Menüpontok konfigurációja
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
    }
  ];

  return (
    <div 
      className={`min-vh-100 ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}
      data-bs-theme={darkMode ? 'dark' : 'light'}
    >
      <Container className="py-4">
        <h2 className="text-center mb-4">Admin vezérlőpult</h2>
        
        <Row xs={1} md={2} lg={3} className="g-4">
          {menupontok.map((menu, index) => (
            <Col key={index}>
              <Card 
                className={`h-100 shadow border-0 ${darkMode ? 'bg-secondary' : ''}`}
                style={{ minHeight: '250px' }}
              >
                <Card.Body className="d-flex flex-column text-center">
                  <div className="mb-3">
                    <i className={`bi ${menu.icon} display-4 text-primary`} />
                  </div>
                  <Card.Title className="mb-2">{menu.cim}</Card.Title>
                  <Card.Text className="flex-grow-1">{menu.leiras}</Card.Text>
                  <Button 
                    variant="primary" 
                    onClick={() => navigate(menu.utvonal)}
                    className="mt-auto"
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


