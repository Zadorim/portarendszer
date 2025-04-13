import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useDarkMode } from '../context/DarkModeContext';

const KezdoOldal = () => {
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();
  const [opacity, setOpacity] = useState(1);
  const [timeoutId, setTimeoutId] = useState(null);
  const role = localStorage.getItem('role');

  const handleMouseMove = () => {
    setOpacity(0.8);
    if (timeoutId) clearTimeout(timeoutId);
    const id = setTimeout(() => setOpacity(1), 1500);
    setTimeoutId(id);
  };

  useEffect(() => {
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timeoutId]);

  return (
    <div
      className={`min-vh-100 text-white ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}
      style={{
        backgroundImage: "url('/iskola_hatter.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      onMouseMove={handleMouseMove}
    >
      <div className="d-flex justify-content-center align-items-center flex-column text-center p-4" style={{ minHeight: '100vh' }}>
        <motion.div
          className="p-4 p-md-5 bg-dark bg-opacity-75 rounded shadow-lg"
          animate={{ opacity }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="display-6 text-shadow mb-4">
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
          <p className="fs-5">
            Ez egy egyedülálló hívó és jelzőrendszer, ami megkönnyíti az itt dolgozók, a tanulók és a szülők mindennapját.
            <br />
            Bátran kérj segítséget!
          </p>
          <h4 className="mt-4 fw-bold">
            Legyen szép napod!
            <br />
            Üdvözöl a{" "}
            <button
              onClick={() => navigate("/portas")}
              className="btn btn-warning btn-sm fw-bold"
              style={{ border: 'none', background: 'transparent', color: '#ffc107', textDecoration: 'underline' }}
            >
              SZIDIPORT
            </button>
            !
          </h4>

          {/* Admin gyorsmenü */}
          {role === 'admin' && (
            <div className="mt-4 d-flex justify-content-center gap-3 flex-wrap">
              <button className="btn btn-outline-light" onClick={() => navigate('/admin/tanulok')}>👨‍🎓 Tanulók</button>
              <button className="btn btn-outline-light" onClick={() => navigate('/admin/osztalyok')}>🏫 Osztályok</button>
              <button className="btn btn-outline-light" onClick={() => navigate('/admin/tanterem')}>🧱 Tantermek</button>
              <button className="btn btn-outline-light" onClick={() => navigate('/admin/belepesek')}>📋 Belépések</button>
              <button className="btn btn-outline-light" onClick={() => navigate('/admin/profil')}>🙋 Profil</button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default KezdoOldal;




