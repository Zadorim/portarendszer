import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // navigációs példány

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/login', {
        felhasznalonev: username,
        jelszo: password,
      });

      // ✅ Token mentése localStorage-be
      localStorage.setItem('token', res.data.token);

      alert('Sikeres bejelentkezés!');
      
      // ✅ Átirányítás a kezdőoldalra
      navigate('/');
    } catch (err) {
      alert('Hiba: ' + (err.response?.data || err.message));
    }
  };

  return (
    <div className="container mt-5">
      <h2>Bejelentkezés</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Felhasználónév</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Jelszó</label>
          <input
            type="password"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Belépés</button>
        <p className="mt-3">
          Nincs még fiókod? <Link to="/register">Regisztrálj itt</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;

