import React, { useEffect, useState } from "react";
import { getTanulok } from "../api/tanuloApi";
import { useDarkMode } from "../context/DarkModeContext"
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function PortasOldal() {
  const { darkMode } = useDarkMode();
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
    console.log(
      `Jelzés: ${tanulo.nev} (${tanulo.osztalyNev}) tanulóért megérkeztek.`
    );
  };

  return (
    <div className={`min-vh-100 p-4 ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}>
      <h2 className="text-center mb-4">Portás felület</h2>

      {!osztalySzuro && (
        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4 my-4">
          {osztalyok.map((o, i) => (
            <div className="col" key={i}>
              <div
                className={`card h-100 text-center ${
                  darkMode ? "bg-secondary text-light" : "bg-light"
                } border border-primary shadow`}
                style={{ cursor: "pointer", transition: "transform 0.2s" }}
                onClick={() => setOsztalySzuro(o.osztalyNev)}
              >
                <div className="card-body">
                  <i className="bi bi-door-closed display-4 text-primary mb-3"></i>
                  <h5 className="card-title">{o.osztalyNev}</h5>
                  <p className="card-text">
                    Tanár: <strong>{o.osztalyfonokNev}</strong>
                  </p>
                  <p className="card-text">
                    Terem: <strong>{o.terem}</strong>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {osztalySzuro && (
        <div className="mt-4">
          <button
            className="btn btn-outline-secondary mb-3"
            onClick={() => setOsztalySzuro("")}
          >
            ← Vissza az osztályokhoz
          </button>
          <h4 className="mb-3">{osztalySzuro} osztály tanulói:</h4>
          <div className="table-responsive">
            <table
              className={`table table-bordered table-hover ${
                darkMode ? "table-dark" : "bg-white"
              }`}
            >
              <thead className={darkMode ? "table-secondary" : "table-light"}>
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
                          🔒 Ellenőrzés szükséges
                        </span>
                      ) : (
                        "✔️"
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => jelzesKuldese(t)}
                      >
                        🔔 Jelzés
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


