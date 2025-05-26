import React, { useEffect, useState } from "react";
import { getAktualisFelhasznalo, updateFelhasznalo } from "../api/felhasznaloApi";
import { useDarkMode } from "../context/DarkModeContext";
import { Button, Form, Container, Card, Row, Col, Alert } from "react-bootstrap";
import AdminVisszaGomb from '../components/AdminVisszaGomb';
import AdminBreadcrumb from '../components/AdminBreadcrumb';
import '../style.css';

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
   <Container className="admin-page py-5">
  {/* belső class maradhat a Card szinten */}
      <Row className="justify-content-center">
        <Col md={8} lg={5}>
          <Card className={`shadow-lg profile-card ${darkMode ? "bg-dark text-light" : "bg-white text-dark"}`}>
            <Card.Header className="text-center">
              <h3 className="fw-bold">Profilom</h3>
            </Card.Header>

            <Card.Body>
              {uzenet && <Alert variant="info" className="text-center">{uzenet}</Alert>}

              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Felhasználónév</Form.Label>
                  <Form.Control value={felhasznalo.felhasznalonev} disabled />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Név</Form.Label>
                  <Form.Control name="nev" value={form.nev} onChange={handleValtozas} disabled={!szerkeszt} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" value={form.email} onChange={handleValtozas} disabled={!szerkeszt} />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Szerepkör</Form.Label>
                  <Form.Control value={felhasznalo.beosztas} disabled />
                </Form.Group>

                <div className="d-flex justify-content-between">
                  <AdminVisszaGomb />

                  {szerkeszt ? (
                    <div>
                      <Button variant="secondary" onClick={() => setSzerkeszt(false)} className="me-2">
                        Mégse
                      </Button>
                      <Button variant="success" onClick={handleMentes}>
                        Mentés
                      </Button>
                    </div>
                  ) : (
                    <Button variant="primary" onClick={() => setSzerkeszt(true)}>
                      Szerkesztés
                    </Button>
                  )}
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ProfilOldal;