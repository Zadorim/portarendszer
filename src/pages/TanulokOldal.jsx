import React, { useEffect, useState } from "react";
import {
  getTanulok,
  createTanulo,
  updateTanulo,
  deleteTanulo,
} from "../api/tanuloApi";
import { Button, Modal, Form, Table } from "react-bootstrap";
import { useDarkMode } from "../context/DarkModeContext";
import AdminVisszaGomb from '../components/AdminVisszaGomb';

function TanulokOldal() {
  const { darkMode } = useDarkMode();
  const [tanulok, setTanulok] = useState([]);
  const [szuro, setSzuro] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [kivalasztott, setKivalasztott] = useState(null);
  const [formData, setFormData] = useState({
    nev: "",
    oktAzonosito: "",
    osztalyNev: "",
    tanszobas: false,
    specHazavitel: false,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // lap tetejére ugrás
    betoltTanulokat();
  }, []);

  const betoltTanulokat = async () => {
    try {
      const adatok = await getTanulok();
      setTanulok(adatok);
    } catch (err) {
      alert("Hiba a tanulók betöltésekor!");
    }
  };

  const kezelesUj = () => {
    setKivalasztott(null);
    setFormData({
      nev: "",
      oktAzonosito: "",
      osztalyNev: "",
      tanszobas: false,
      specHazavitel: false,
    });
    setShowModal(true);
  };

  const kezelesSzerkesztes = (tanulo) => {
    setKivalasztott(tanulo);
    setFormData({
      nev: tanulo.nev,
      oktAzonosito: tanulo.oktAzonosito,
      osztalyNev: tanulo.osztalyNev,
      tanszobas: tanulo.tanszobas,
      specHazavitel: tanulo.specHazavitel,
    });
    setShowModal(true);
  };

  const mentes = async () => {
    try {
      if (kivalasztott?.id) {
        await updateTanulo(kivalasztott.id, formData);
      } else {
        await createTanulo(formData);
      }
      setShowModal(false);
      betoltTanulokat();
    } catch (err) {
      alert("Mentés sikertelen!");
    }
  };

  const torles = async (id) => {
    if (window.confirm("Biztosan törlöd ezt a tanulót?")) {
      try {
        await deleteTanulo(id);
        betoltTanulokat();
      } catch (err) {
        alert("Törlés sikertelen!");
      }
    }
  };

  const szurtLista = tanulok.filter(
    (t) =>
      t.nev.toLowerCase().includes(szuro.toLowerCase()) ||
      (t.osztalyNev || "").toLowerCase().includes(szuro.toLowerCase())
  );

  return (  
    <div className={`admin-page container mt-5 ${darkMode ? "text-light bg-dark" : ""}`}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <AdminVisszaGomb />
        <h2>Tanulók kezelése</h2>
        <Button variant="success" onClick={kezelesUj}>
          ➕ Új tanuló
        </Button>
      </div>

      <Form.Control
        type="text"
        placeholder="Keresés név vagy osztály alapján..."
        className="mb-3"
        value={szuro}
        onChange={(e) => setSzuro(e.target.value)}
      />

      <div className="table-responsive">
        <Table
          striped
          bordered
          hover
          className={`${darkMode ? "table-dark" : ""}`}
        >
          <thead>
            <tr>
              <th>Név</th>
              <th>Okt. azonosító</th>
              <th>Osztály</th>
              <th>Tanszoba</th>
              <th>Spec. hazavitel</th>
              <th>Műveletek</th>
            </tr>
          </thead>
          <tbody>
            {szurtLista.map((t) => (
              <tr key={t.id}>
                <td>{t.nev}</td>
                <td>{t.oktAzonosito}</td>
                <td>{t.osztalyNev}</td>
                <td>{t.tanszobas ? "✔️" : "-"}</td>
                <td>{t.specHazavitel ? "🔒" : "✔️"}</td>
                <td>
                  <Button
                    size="sm"
                    variant="primary"
                    className="me-2"
                    onClick={() => kezelesSzerkesztes(t)}
                  >
                    ✏️
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => torles(t.id)}
                  >
                    🗑️
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* MODAL ablak */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {kivalasztott ? "Tanuló szerkesztése" : "Új tanuló"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Név</Form.Label>
              <Form.Control
                type="text"
                value={formData.nev}
                onChange={(e) =>
                  setFormData({ ...formData, nev: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Okt. azonosító</Form.Label>
              <Form.Control
                type="text"
                value={formData.oktAzonosito}
                onChange={(e) =>
                  setFormData({ ...formData, oktAzonosito: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Osztály</Form.Label>
              <Form.Control
                type="text"
                value={formData.osztalyNev}
                onChange={(e) =>
                  setFormData({ ...formData, osztalyNev: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="form-check mb-2">
              <Form.Check
                type="checkbox"
                label="Tanszobás"
                checked={formData.tanszobas}
                onChange={(e) =>
                  setFormData({ ...formData, tanszobas: e.target.checked })
                }
              />
            </Form.Group>
            <Form.Group className="form-check">
              <Form.Check
                type="checkbox"
                label="Speciális hazavitel"
                checked={formData.specHazavitel}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    specHazavitel: e.target.checked,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Mégse
          </Button>
          <Button variant="primary" onClick={mentes}>
            Mentés
          </Button>
        </Modal.Footer>
      </Modal>
    </div>  
  );
}

export default TanulokOldal;





