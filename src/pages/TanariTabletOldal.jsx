import React, { useEffect, useState } from "react";
import { useDarkMode } from "../context/DarkModeContext";
import { Container, Card, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import useSound from 'use-sound';
import bellSound from '../assets/ringtone-you-would-be-glad-to-know.mp3';
import '../style.css';

function TanariTabletOldal() {
  const { darkMode } = useDarkMode();
  const [ertesites, setErtesites] = useState(null);
  const [play] = useSound(bellSound);

  useEffect(() => {
    const checkErtesites = () => {
      const jelzes = localStorage.getItem("utolso_jelzes");
      if (jelzes) {
        const parsed = JSON.parse(jelzes);
        setErtesites(parsed);
        play();
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
    <Container className={`tablet-page my-4 py-4 ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
      <Card className={`shadow-lg text-center ${darkMode ? 'bg-secondary text-white' : 'bg-white text-dark'}`}>
        <Card.Header className="fw-bold">
          <h3><i className="bi bi-tablet-landscape me-2"></i>Tanári Tablet Felület</h3>
        </Card.Header>
        <Card.Body>
          {ertesites ? (
            <Alert variant="warning" className="tablet-alert">
              <i className="bi bi-bell-fill me-2"></i>
              Értesítés: <strong>{ertesites.nev}</strong> tanulóért jöttek!
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