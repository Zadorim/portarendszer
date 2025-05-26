import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { useDarkMode } from '../context/DarkModeContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const KezdoOldal = () => {
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();
  const [opacity, setOpacity] = useState(1);
  const [timeoutId, setTimeoutId] = useState(null);
  const role = localStorage.getItem('role');

  const handleMouseMove = () => {
    setOpacity(0.9);
    if (timeoutId) clearTimeout(timeoutId);
    const id = setTimeout(() => setOpacity(1), 1000);
    setTimeoutId(id);
  };

  const handlePortasClick = () => {
    if (window.navigator.vibrate) {
      window.navigator.vibrate(100); // mobil rezgés támogatás
    }
    navigate('/portas');
  };

  useEffect(() => {
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timeoutId]);

  return (
    <div
      className={`kezdo-oldal ${darkMode ? 'dark-mode' : ''}`}
      style={{ backgroundImage: "url('/iskola_hatter.jpg')" }}
      onMouseMove={handleMouseMove}
    >
      <div className="content-wrapper">
        <motion.div
          className="welcome-box"
          animate={{ opacity }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="welcome-title">
            <Typewriter
              words={['Üdvözlünk a Miskolci Szilágyi Dezső Általános Iskola portarendszerében!']}
              loop={1}
              cursor
              cursorStyle="|"
              typeSpeed={50}
              deleteSpeed={0}
              delaySpeed={2000}
            />
          </h1>

          <p className="welcome-text">
            Ez egy egyedülálló hívó és jelzőrendszer, ami megkönnyíti az itt dolgozók, a tanulók és a szülők mindennapját.
            <br />
            Bátran kérj segítséget!
          </p>

          <h4 className="greeting">
            Legyen szép napod!
            <br />
            Üdvözöl a PortaRendszer!
          </h4>

          <div className="action-buttons">
            <button className="szidiport-btn" onClick={handlePortasClick}>
              SZIDIPORT
            </button>
          </div>

          {role === 'admin' && (
            <div className="admin-quick-menu mt-4">
              <button className="quick-btn" onClick={() => navigate('/admin/tanulok')}>
                <i className="bi bi-people-fill"></i> Tanulók
              </button>
              <button className="quick-btn" onClick={() => navigate('/admin/osztalyok')}>
                <i className="bi bi-building"></i> Osztályok
              </button>
              <button className="quick-btn" onClick={() => navigate('/admin/tanterem')}>
                <i className="bi bi-door-closed"></i> Tantermek
              </button>
              <button className="quick-btn" onClick={() => navigate('/admin/belepesek')}>
                <i className="bi bi-journal-text"></i> Belépések
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default KezdoOldal;
