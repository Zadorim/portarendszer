import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/Auth/login', {
        felhasznalonev: username,
        jelszo: password,
      });
      

      // Feltételezzük, hogy a válaszban jön:
      // { username: 'admin', role: 'admin', token: '...' }
      const { username: uname, role, token } = res.data;

      // Mentés localStorage-be
      localStorage.setItem('username', uname);
      localStorage.setItem('role', role);
      if (token) {
        localStorage.setItem('token', token); // ha használod
      }

      alert('Sikeres bejelentkezés!');

      // Szerepkörtől függő navigáció
      switch (role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'portas':
          navigate('/portas');
          break;
        default:
          navigate('/'); // vagy: navigate('/kezdooldal')
          break;
      }
    } catch (err) {
      alert('Hiba: ' + (err.response?.data?.message || err.message));
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Jelszó</label>
          <input
            type="password"
            className="form-control"
            value={password}
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


