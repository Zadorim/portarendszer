import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [felhasznalonev, setFelhasznalonev] = useState('');
  const [jelszo, setJelszo] = useState('');
  const navigate = useNavigate(); // navigációs példány

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Beküldés a backendre
      await axios.post('/api/register', {
        felhasznalonev,
        jelszo,
      });

      alert('Sikeres regisztráció!');
      navigate('/login'); // Átirányítás bejelentkezésre
    } catch (err) {
      alert('Hiba: ' + (err.response?.data || err.message));
    }
  };

  return (
    <div className="container mt-5">
      <h2>Regisztráció</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Felhasználónév</label>
          <input
            type="text"
            className="form-control"
            value={felhasznalonev}
            onChange={(e) => setFelhasznalonev(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Jelszó</label>
          <input
            type="password"
            className="form-control"
            value={jelszo}
            onChange={(e) => setJelszo(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">Regisztráció</button>
        <p className="mt-3">
          Van már fiókod? <Link to="/login">Lépj be</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;

