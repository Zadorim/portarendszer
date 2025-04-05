import React from 'react';
import { Link } from 'react-router-dom';

function Register() {
  return (
    <div className="container mt-5">
      <h2>Regisztráció</h2>
      <form>
        <div className="mb-3">
          <label className="form-label">Név</label>
          <input type="text" className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Felhasználónév</label>
          <input type="text" className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Jelszó</label>
          <input type="password" className="form-control" />
        </div>
        <button type="submit" className="btn btn-success">Regisztráció</button>
        <p className="mt-3">Van már fiókod? <Link to="/">Lépj be</Link></p>
      </form>
    </div>
  );
}

export default Register;
