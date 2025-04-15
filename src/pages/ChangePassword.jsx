import React, { useState } from "react";

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Itt hívnád meg pl. az updatePassword API-dat:
    // updatePassword(currentPassword, newPassword);
    alert(`Jelenlegi: ${currentPassword}, Új: ${newPassword}`);
  };

  return (
    <div className="container" style={{ maxWidth: "400px", marginTop: "2rem" }}>
      <h2 className="mb-3">Jelszó módosítása</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="currentPassword" className="form-label">
            Jelenlegi jelszó
          </label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            autoComplete="current-password"
            className="form-control"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">
            Új jelszó
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            autoComplete="new-password"
            className="form-control"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Mentés
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;
