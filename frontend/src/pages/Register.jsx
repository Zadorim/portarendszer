import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../api/authApi';

function Register() {
  const [felhasznalonev, setFelhasznalonev] = useState('');
  const [jelszo, setJelszo] = useState('');
  const [megerosites, setMegerosites] = useState('');
  const [nev, setNev] = useState('');
  const [email, setEmail] = useState('');
  const [beosztas, setBeosztas] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (jelszo !== megerosites) {
      alert("A jelszavak nem egyeznek!");
      return;
    }

    try {
      await register({ felhasznalonev, jelszo, nev, email, beosztas });
      alert("Sikeres regisztráció!");
      navigate("/login");
    } catch (err) {
      alert("Hiba: " + (err.response?.data || err.message));
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
          <label className="form-label">Teljes név</label>
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
          <label className="form-label">Beosztás</label>
          <select
            className="form-select"
            value={beosztas}
            onChange={(e) => setBeosztas(e.target.value)}
            required
          >
            <option value="">Válassz beosztást</option>
            <option value="admin">Admin</option>
            <option value="portas">Portás</option>
            <option value="tanar">Tanár</option>
          </select>
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

        <div className="mb-3">
          <label className="form-label">Jelszó megerősítése</label>
          <input
            type="password"
            className="form-control"
            value={megerosites}
            onChange={(e) => setMegerosites(e.target.value)}
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



