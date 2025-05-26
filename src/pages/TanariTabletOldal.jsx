import React, { useEffect, useState } from "react";
import { useDarkMode } from "../context/DarkModeContext";
import { Container, Card, Button, Alert } from "react-bootstrap";
import useSound from 'use-sound';
import bellSound from '../assets/ringtone-you-would-be-glad-to-know.mp3';
import AdminVisszaGomb from '../components/AdminVisszaGomb';
import AdminBreadcrumb from '../components/AdminBreadcrumb';
import '../style.css';

function TanariTabletOldal() {
  const { darkMode } = useDarkMode();
  const [ertesites, setErtesites] = useState(null);
  const [play] = useSound(bellSound);
  
  useEffect(() => {
  window.scrollTo({ top: 0, behavior: "smooth" }); // lap tetejére ugrás
  const checkErtesites = () => {
    const jelzes = localStorage.getItem("utolso_jelzes");
    if (jelzes) {
      const parsed = JSON.parse(jelzes);
      setErtesites(parsed);
      play(); // hangjelzés
    } else {
      setErtesites(null);
    }
  };
    checkErtesites();
    const interval = setInterval(checkErtesites, 3000);

    return () => clearInterval(interval);
  }, [play]);

  const elfogadas = () => {
    localStorage.removeItem("utolso_jelzes");
    setErtesites(null);
    alert("Elfogadva.");
  };

  return (
   <Container className="tablet-page my-4 py-4">
      <div className="d-flex align-items-center mb-3">
        <AdminVisszaGomb />
        <AdminBreadcrumb current="tanar-tablet" className="ms-3" />
      </div>

      <Card className={`shadow-lg text-center card-hover-effect ${darkMode ? 'tablet-dark-card' : ''}`}>
        <Card.Header className="fw-bold">
          <h3><i className="bi bi-tablet-landscape me-2"></i>Tanári Tablet Felület</h3>
        </Card.Header>
        <Card.Body>
          {ertesites ? (
            <Alert variant="warning" className="tablet-alert">
              <i className="bi bi-bell-fill me-2"></i>
              Értesítés: <strong>{ertesites.tanuloNev}</strong> tanulóért jöttek!
              <div className="mt-3">
                <Button variant="success" onClick={elfogadas}>
                  Elfogadom <i className="bi bi-check-circle ms-1"></i>
                </Button>
              </div>
            </Alert>
          ) : (
            <p className="text-muted">Nincs új értesítés.</p>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default TanariTabletOldal;
