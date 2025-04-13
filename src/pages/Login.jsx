import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/authApi';

function Login() {
  const [felhasznalonev, setFelhasznalonev] = useState('');
  const [jelszo, setJelszo] = useState('');
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { username, role } = await login(felhasznalonev, jelszo);

      localStorage.setItem('username', username);
      localStorage.setItem('role', role);

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
          navigate('/');
          break;
      }
    } catch (err) {
      alert('Hibás bejelentkezés: ' + (err.response?.data || err.message));
    }
  };

  return (
    <div className={`${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
      <h2>Bejelentkezés</h2>
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
        <button type="submit" className="btn btn-primary">Belépés</button>

        <p className="mt-3">
          Nincs még fiókod? <Link to="/register">Regisztrálj itt</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;



