import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../App.css';

const KezdoOldal = () => {
  const navigate = useNavigate();
  const [opacity, setOpacity] = useState(1);
  const [timeoutId, setTimeoutId] = useState(null);

  const handleMouseMove = () => {
    setOpacity(0.4); // halványodik
    if (timeoutId) clearTimeout(timeoutId); // előzőt törli
    const id = setTimeout(() => setOpacity(1), 1500); // visszaerősödik
    setTimeoutId(id);
  };

  useEffect(() => {
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timeoutId]);

  return (
    <div
      className="min-vh-100 text-white"
      style={{
        backgroundImage: "url('/iskola_hatter.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      onMouseMove={handleMouseMove}
    >
      <nav className="navbar navbar-dark bg-dark bg-opacity-75">
        <div className="container-fluid">
          <span className="navbar-brand">
            <i className="bi bi-house-door-fill me-2"></i>PortaRendszer
          </span>
        </div>
      </nav>

      <div className="d-flex justify-content-center align-items-center flex-column text-center p-4" style={{ minHeight: 'calc(100vh - 56px)' }}>
        <motion.div
          className="p-4 p-md-5 bg-dark bg-opacity-75 rounded shadow-lg"
          animate={{ opacity }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="display-6 text-shadow mb-4">
            Üdvözlünk a Miskolci Szilágyi Dezső Általános Iskola portarendszerében!
          </h1>
          <p className="fs-5">
            Ez egy egyedül álló hívó és jelzőrendszer, ami megkönnyíti az itt dolgozók, a tanulók és a szülők mindennapját.
            <br />
            Bátran kérj segítséget!
          </p>
          <h4 className="mt-4 fw-bold">Legyen szép napod!<br />Üdvözöl a <span className="text-warning">SZIDIPORT</span>!</h4>
        </motion.div>
      </div>
    </div>
  );
};

export default KezdoOldal;
