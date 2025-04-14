import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/authApi';
import { useDarkMode } from '../context/DarkModeContext';
import { AuthContext } from '../context/AuthContext';

function Login() {
  const [felhasznalonev, setFelhasznalonev] = useState('');
  const [jelszo, setJelszo] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [hiba, setHiba] = useState('');
  const [betolt, setBetolt] = useState(false);
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  const { login: authLogin } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBetolt(true);
    setHiba('');

    try {
      const { username, role } = await login(felhasznalonev, jelszo);

      authLogin(username, role); // AuthContext login

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
      setHiba('Hibás bejelentkezés: ' + (err.response?.data || err.message));
    } finally {
      setBetolt(false);
    }
  };

  return (
    <div className={`container py-5 ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
      <h2 className="text-center mb-4">Bejelentkezés</h2>
      <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '400px' }}>
        {hiba && (
          <div className="alert alert-danger" role="alert">
            {hiba}
          </div>
        )}

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
          <div className="input-group">
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control"
              value={jelszo}
              onChange={(e) => setJelszo(e.target.value)}
              required
            />
            <span
              className="input-group-text"
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: 'pointer' }}
            >
              <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
            </span>
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-100" disabled={betolt}>
          {betolt ? (
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          ) : null}
          {betolt ? 'Bejelentkezés...' : 'Bejelentkezés'}
        </button>

        <p className="mt-3 text-center">
          Nincs még fiókod? <Link to="/register">Regisztrálj itt</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
