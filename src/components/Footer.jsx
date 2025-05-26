import React from 'react';
import './Footer.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';



const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-4 mt-auto">
      <div className="container">
        <h5 className="mb-2">Miskolci Szilágyi Dezső Általános Iskola</h5>
        <p className="mb-1">
          📍 3529 Miskolc, Szilágyi Dezső u. 53. | ☎️ +36-46/506-257 | ✉️ szidi@szilagyid-mc.edu.hu
        </p>
        <p>
          🌐 <a href="https://www.szidi.hu/" className="text-info" target="_blank" rel="noreferrer">www.szidi.hu</a> |
          <a href="https://www.facebook.com/p/Miskolci-Szil%C3%A1gyi-Dezs%C5%91-Iskola-100057082225046/?locale=hu_HU" className="text-info mx-2" target="_blank" rel="noreferrer"><i className="bi bi-facebook"></i></a>
          <a href="https://www.instagram.com/miskolci_szilagyi_d._alt.isk/" className="text-info" target="_blank" rel="noreferrer"><i className="bi bi-instagram"></i></a>
        </p>
        <hr className="bg-secondary my-3" />
        <p className="mb-0">Készítette a PortaRendszer fejlesztői csapat: Sándorné Feke Réka és Zádori Mónika - 2025.</p>
      </div>
    </footer>
  );
};

export default Footer;
