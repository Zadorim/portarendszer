import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/authApi';
import { useDarkMode } from '../context/DarkModeContext';
import { AuthContext } from '../context/AuthContext';

function Register() {
  const { darkMode } = useDarkMode();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [felhasznalonev, setFelhasznalonev] = useState('');
  const [jelszo, setJelszo] = useState('');
  const [megerosites, setMegerosites] = useState('');
  const [nev, setNev] = useState('');
  const [email, setEmail] = useState('');
  const [beosztas, setBeosztas] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [hiba, setHiba] = useState('');
  const [betolt, setBetolt] = useState(false);

  const evaluatePasswordStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 6) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 2) return 'gyenge';
    if (score === 3 || score === 4) return 'közepes';
    if (score >= 5) return 'eros';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHiba('');
    setBetolt(true);

    if (jelszo !== megerosites) {
      setHiba('A jelszavak nem egyeznek!');
      setBetolt(false);
      return;
    }

    try {
      const regisztralt = await register({
        felhasznalonev,
        jelszo,
        nev,
        email,
        beosztas
      });

      login(regisztralt.username, regisztralt.role);
      alert('Sikeres regisztráció!');

      switch (regisztralt.role) {
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
      setHiba('Hiba: ' + (err.response?.data || err.message));
    } finally {
      setBetolt(false);
    }
  };

  return (
    <div className={`container py-5 ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
      <h2 className="text-center mb-4">Regisztráció</h2>
      <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '500px' }}>
        {hiba && (
          <div className="alert alert-danger" role="alert">
            {hiba}
          </div>
        )}

        <div className="mb-3">
          <label className="form-label">Név</label>
          <input
            type="text"
            className="form-control"
            value={nev}
            onChange={(e) => setNev(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

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
              onChange={(e) => {
                const val = e.target.value;
                setJelszo(val);
                setPasswordStrength(evaluatePasswordStrength(val));
              }}
              required
            />
            <span className="input-group-text" onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer' }}>
              <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
            </span>
          </div>

          {jelszo && (
            <div className="mt-2">
              <div className="progress">
                <div
                  className={`progress-bar ${
                    passwordStrength === 'gyenge' ? 'bg-danger' :
                    passwordStrength === 'közepes' ? 'bg-warning' : 'bg-success'
                  }`}
                  role="progressbar"
                  style={{
                    width:
                      passwordStrength === 'gyenge' ? '33%' :
                      passwordStrength === 'közepes' ? '66%' : '100%'
                  }}
                >
                  {passwordStrength.charAt(0).toUpperCase() + passwordStrength.slice(1)}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Jelszó megerősítése</label>
          <div className="input-group">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              className="form-control"
              value={megerosites}
              onChange={(e) => setMegerosites(e.target.value)}
              required
            />
            <span className="input-group-text" onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{ cursor: 'pointer' }}>
              <i className={`bi ${showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
            </span>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Beosztás</label>
          <select
            className="form-select"
            value={beosztas}
            onChange={(e) => setBeosztas(e.target.value)}
            required
          >
            <option value="">Válassz szerepkört</option>
            <option value="admin">Admin (igazgató)</option>
            <option value="portas">Portás</option>
            <option value="tanar">Tanár</option>
          </select>
        </div>

        <button type="submit" className="btn btn-success w-100" disabled={betolt}>
          {betolt ? (
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          ) : null}
          {betolt ? 'Regisztráció...' : 'Regisztráció'}
        </button>
      </form>
    </div>
  );
}

export default Register;
