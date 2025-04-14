import React, { useEffect, useState } from "react";
import { useDarkMode } from "../context/DarkModeContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import useSound from 'use-sound';
import bellSound from '../assets/ringtone-you-would-be-glad-to-know.mp3'; // Hang fájl elérési útja

function TanariTabletOldal() {
  const { isDarkMode } = useDarkMode();
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

    checkErtesites(); // induláskor
    const interval = setInterval(checkErtesites, 3000); // 3 másodpercenként ellenőrzés

    return () => clearInterval(interval);
  }, [play]);

  const elfogadas = () => {
    localStorage.removeItem("utolso_jelzes");
    setErtesites(null);
    alert("Elfogadva.");
  };

  return (
    <div className={`tablet-view ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="text-center w-100">
        <h2>Tanári tablet felület</h2>
        {ertesites ? (
          <div className="tablet-alert p-4 shadow">
            <p>
              <i className="bi bi-bell-fill text-warning me-2"></i>
              Értesítés: <strong>{ertesites.nev}</strong> tanulóért jöttek!
            </p>
            <button className="btn btn-success mt-3" onClick={elfogadas}>
              Elfogadom <i className="bi bi-check-circle ms-1"></i>
            </button>
          </div>
        ) : (
          <p className="text-muted">Nincs új értesítés.</p>
        )}
      </div>
    </div>
  );
}

export default TanariTabletOldal;
