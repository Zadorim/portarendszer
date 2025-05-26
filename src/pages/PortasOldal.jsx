import React, { useEffect, useState } from "react";
import { getTanulok } from "../api/tanuloApi";
import { useDarkMode } from "../context/DarkModeContext";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function PortasOldal() {
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const [tanulok, setTanulok] = useState([]);
  const [osztalySzuro, setOsztalySzuro] = useState("");

  useEffect(() => {
    getTanulok()
      .then((data) => setTanulok(data))
      .catch((err) => console.error("Tanulók betöltési hiba:", err));
  }, []);

  const osztalyok = [
    ...new Map(
      tanulok.map((t) => [
        t.osztalyNev,
        {
          osztalyNev: t.osztalyNev,
          osztalyfonokNev: t.osztalyfonokNev || "Ismeretlen",
          terem: t.terem || "---",
        },
      ])
    ).values(),
  ];

  const tanulokSzurt = osztalySzuro
    ? tanulok
        .filter((t) => t.osztalyNev === osztalySzuro)
        .sort((a, b) => a.nev.localeCompare(b.nev))
    : tanulok;

  const jelzesKuldese = (tanulo) => {
    if (tanulo.specHazavitel) {
      const elfogad = window.confirm(
        `${tanulo.nev} csak jogosult személlyel távozhat. Ellenőrizted?`
      );
      if (!elfogad) return;
    }

    const jelzes = {
      tanuloId: tanulo.id,
      tanuloNev: tanulo.nev,
      osztalyNev: tanulo.osztalyNev,
      timestamp: new Date().toISOString(),
      status: "varakozik"
    };

    localStorage.setItem("utolso_jelzes", JSON.stringify(jelzes));
    alert(`Jelzés elküldve: ${tanulo.nev} (${tanulo.osztalyNev})`);
  };

  return (
    <div
      className={`admin-page container-fluid py-4 portas-hatter ${isDarkMode ? "dark-mode" : ""}`}   
    >
      <h2 className="text-center fw-bold mb-4">Portás felület</h2>

      <div className="d-flex justify-content-center mb-4 gap-2">
        <button className="btn btn-outline-primary" onClick={() => navigate('/admin')}>
          <i className="bi bi-speedometer2 me-1 text-white"></i>Admin felület
        </button>
        <button className="btn btn-outline-secondary" onClick={() => navigate('/profil')}>
          <i className="bi bi-person-circle me-1 text-white"></i>Profil
        </button>
      </div>

      {!osztalySzuro && (
        <div className="row g-4 justify-content-center">
          {osztalyok.map((o, i) => (
            <div
              key={i}
              className="col-sm-6 col-md-4 col-lg-3"
              onClick={() => setOsztalySzuro(o.osztalyNev)}
              style={{ cursor: "pointer" }}
            >
              <div className={`card text-center shadow-sm h-100 ${isDarkMode ? "bg-secondary text-light" : "bg-white"}`}>
                <div className="card-body">
                  <i className="bi bi-door-closed display-4 mb-3"></i>
                  <h5 className="card-title">{o.osztalyNev}</h5>
                  <p className="card-text">Tanár: <strong>{o.osztalyfonokNev}</strong></p>
                  <p className="card-text">Terem: <strong>{o.terem}</strong></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {osztalySzuro && (
        <div className="mt-4">
          <button className="btn btn-outline-secondary mb-3" onClick={() => setOsztalySzuro("")}>
            <i className="bi bi-arrow-left me-1"></i>Vissza az osztályokhoz
          </button>

          <h4 className="mb-3">{osztalySzuro} osztály tanulói</h4>
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className={isDarkMode ? "table-dark" : "table-light"}>
                <tr>
                  <th>Név</th>
                  <th>Szakkör</th>
                  <th>Jogosult elvitel</th>
                  <th>Jelzés</th>
                </tr>
              </thead>
              <tbody>
                {tanulokSzurt.map((t) => (
                  <tr key={t.id}>
                    <td>{t.nev}</td>
                    <td>
                      {t.tanszobas ? (
                        <span className="badge bg-info">Szakkörön van</span>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td>
                      {t.specHazavitel ? (
                        <span className="text-danger fw-bold">
                          <i className="bi bi-lock me-1"></i>Ellenőrzés szükséges
                        </span>
                      ) : (
                        <i className="bi bi-check-circle text-success"></i>
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => jelzesKuldese(t)}
                      >
                        <i className="bi bi-bell me-1"></i>Jelzés
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default PortasOldal;
