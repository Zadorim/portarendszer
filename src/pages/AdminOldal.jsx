import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useDarkMode } from '../context/DarkModeContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const AdminOldal = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();  

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
    },
    {    
      cim: 'Tanári tablet',
      leiras: 'Tanári tablet felület',
      icon: 'bi-tablet-landscape',
      utvonal: '/tanar-tablet'      
    }      
  ];

  return (     
    <div className={`admin-page min-vh-100 ${isDarkMode ? 'bg-dark text-light' : 'bg-light'}`}>  
    <Container className={`admin-page py-5 ${isDarkMode ? 'dark-mode' : ''}`}>
        <h1 className="text-center mb-4 fw-bold">Admin vezérlőpult</h1>       
        <Row xs={1} md={2} lg={3} className="g-4">
          {menupontok.map((menu, index) => (
            <Col key={index}>
              <Card 
                className={`h-100 shadow-sm transition-all ${isDarkMode ? 'bg-gray-800 border-dark' : 'bg-white'}`}              
                style={{
                  minHeight: '250px',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'pointer'
                }}
                onClick={() => navigate(menu.utvonal)}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = ''}
              >
                <Card.Body className="d-flex flex-column text-center p-4">
                  <div className="mb-3">
                    <i className={`bi ${menu.icon} display-4 ${isDarkMode ? 'text-primary' : 'text-primary'}`} />
                  </div>
                  <Card.Title className="mb-2 fs-4 fw-bold">{menu.cim}</Card.Title>
                  <Card.Text className={`flex-grow-1 ${isDarkMode ? 'text-light-soft' : 'text-muted'}`}> {menu.leiras}
                  </Card.Text>
                  <Button 
                    variant={isDarkMode ? "outline-primary" : "primary"} 
                    className="mt-auto align-self-center"
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


