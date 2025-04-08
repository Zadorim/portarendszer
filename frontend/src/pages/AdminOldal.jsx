import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

const AdminOldal = () => {
  const navigate = useNavigate();

  const menupontok = [
    {
      cim: 'Tantermek kezelése',
      leiras: 'Új tantermek hozzáadása, szerkesztése és törlése',
      icon: 'bi bi-door-closed',
      utvonal: '/admin/tanterem',
    },
    {
      cim: 'Osztályok kezelése',
      leiras: 'Osztályok, osztályfőnökök és termek szerkesztése',
      icon: 'bi bi-building',
      utvonal: '/admin/osztalyok',
    },
    {
      cim: 'Tanulók kezelése',
      leiras: 'Tanulók listázása, felvétele és szerkesztése',
      icon: 'bi bi-people-fill',
      utvonal: '/admin/tanulok',
    },
    {
      cim: 'Belépési napló',
      leiras: 'Admin, tanár és portás belépések megtekintése',
      icon: 'bi bi-journal-text',
      utvonal: '/admin/belepesek',
    },
    {
      cim: 'Profilom',
      leiras: 'Személyes adatok megtekintése, szerkesztése',
      icon: 'bi bi-person-circle',
      utvonal: '/admin/profil',
    },
  ];

  return (
    <Container className="mt-5 pt-4">
      <h2 className="text-center mb-4">Admin vezérlőpult</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {menupontok.map((m, i) => (
          <Col key={i}>
            <Card className="h-100 shadow border-0">
              <Card.Body className="text-center">
                <i className={`${m.icon} display-4 text-primary mb-3`}></i>
                <Card.Title>{m.cim}</Card.Title>
                <Card.Text>{m.leiras}</Card.Text>
                <Button variant="primary" onClick={() => navigate(m.utvonal)}>
                  Megnyitás
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AdminOldal;

