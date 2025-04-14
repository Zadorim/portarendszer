import React, { useEffect, useState } from "react";
import { getAktualisFelhasznalo, updateFelhasznalo } from "../api/felhasznaloApi";
import { useDarkMode } from "../context/DarkModeContext";
import { Button, Form, Container, Card, Row, Col, Alert } from "react-bootstrap";
import AdminVisszaGomb from '../components/AdminVisszaGomb';

function ProfilOldal() {
  const { darkMode } = useDarkMode();
  const [felhasznalo, setFelhasznalo] = useState(null);
  const [szerkeszt, setSzerkeszt] = useState(false);
  const [form, setForm] = useState({ nev: "", email: "" });
  const [uzenet, setUzenet] = useState("");

  useEffect(() => {
    getAktualisFelhasznalo()
      .then((adat) => {
        setFelhasznalo(adat);
        setForm({ nev: adat.nev, email: adat.email });
      })
      .catch(() => setUzenet("Nem sikerült betölteni az adatokat."));
  }, []);

  const handleValtozas = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleMentes = async () => {
    try {
      await updateFelhasznalo(felhasznalo.id, form);
      setFelhasznalo((prev) => ({ ...prev, ...form }));
      setSzerkeszt(false);
      setUzenet("Profil frissítve.");
    } catch {
      setUzenet("Hiba történt mentéskor.");
    }
  };

  if (!felhasznalo) return <div className="text-center mt-5">Betöltés...</div>;

  return (
    <Container className={`profil-oldal py-4 ${darkMode ? 'dark-mode bg-dark text-light' : 'bg-light text-dark'}`}>
      <h2 className="text-center mb-4">Profil</h2>    
      <AdminVisszaGomb />

      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className={`shadow-sm ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}>
            <Card.Header>
              <h4 className="text-center">Saját profil</h4>
            </Card.Header>
            <Card.Body>
              {uzenet && <Alert variant="info">{uzenet}</Alert>}

              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Felhasználónév</Form.Label>
                  <Form.Control
                    type="text"
                    value={felhasznalo.felhasznalonev}
                    disabled
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Név</Form.Label>
                  <Form.Control
                    type="text"
                    name="nev"
                    value={form.nev}
                    onChange={handleValtozas}
                    disabled={!szerkeszt}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleValtozas}
                    disabled={!szerkeszt}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Szerepkör</Form.Label>
                  <Form.Control
                    type="text"
                    value={felhasznalo.beosztas}
                    disabled
                  />
                </Form.Group>

                {szerkeszt ? (
                  <div className="d-flex justify-content-between">
                    <Button variant="secondary" onClick={() => setSzerkeszt(false)}>
                      Mégse
                    </Button>
                    <Button variant="primary" onClick={handleMentes}>
                      Mentés
                    </Button>
                  </div>
                ) : (
                  <div className="text-end">
                    <Button variant="warning" onClick={() => setSzerkeszt(true)}>
                      Szerkesztés
                    </Button>
                  </div>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ProfilOldal;
