import React, { useEffect, useState } from "react";
import { getTanteremek, createTanterem, updateTanterem, deleteTanterem } from "../api/tanteremApi";
import { Button, Table, Modal, Form, InputGroup, FormControl } from "react-bootstrap";
import { useDarkMode } from "../context/DarkModeContext";

function TanteremLista() {
  const { darkMode } = useDarkMode();
  const [tantermek, setTantermek] = useState([]);
  const [szuro, setSzuro] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [kivalasztott, setKivalasztott] = useState(null);
  const [nev, setNev] = useState("");

  useEffect(() => {
    frissitTantermeket();
  }, []);

  const frissitTantermeket = async () => {
    try {
      const adatok = await getTanteremek();
      setTantermek(adatok);
    } catch (err) {
      alert("Hiba a tantermek betöltésekor!");
    }
  };

  const kezelesUj = () => {
    setKivalasztott(null);
    setNev("");
    setShowModal(true);
  };

  const kezelesSzerkesztes = (terem) => {
    setKivalasztott(terem);
    setNev(terem.nev);
    setShowModal(true);
  };

  const mentes = async () => {
    try {
      if (kivalasztott?.id) {
        await updateTanterem(kivalasztott.id, { nev });
      } else {
        await createTanterem({ nev });
      }
      setShowModal(false);
      frissitTantermeket();
    } catch (err) {
      alert("Mentés sikertelen!");
    }
  };

  const torles = async (id) => {
    if (window.confirm("Biztosan törlöd ezt a tantermet?")) {
      try {
        await deleteTanterem(id);
        frissitTantermeket();
      } catch (err) {
        alert("Törlés sikertelen!");
      }
    }
  };

  const szurtLista = tantermek.filter((t) =>
    t.nev.toLowerCase().includes(szuro.toLowerCase())
  );

  return (
    <div className={`container mt-5 ${darkMode ? "text-light bg-dark" : ""}`}>
      <h2 className="text-center mb-4">Tantermek kezelése</h2>

      <InputGroup className="mb-3">
        <FormControl
          placeholder="Keresés tanterem neve alapján..."
          value={szuro}
          onChange={(e) => setSzuro(e.target.value)}
        />
        <Button variant="success" onClick={kezelesUj}>➕ Új terem</Button>
      </InputGroup>

      <Table striped bordered hover variant={darkMode ? "dark" : "light"}>
        <thead>
          <tr>
            <th>#</th>
            <th>Név</th>
            <th>Műveletek</th>
          </tr>
        </thead>
        <tbody>
          {szurtLista.map((t, i) => (
            <tr key={t.id}>
              <td>{i + 1}</td>
              <td>{t.nev}</td>
              <td>
                <Button variant="primary" size="sm" className="me-2" onClick={() => kezelesSzerkesztes(t)}>✏️</Button>
                <Button variant="danger" size="sm" onClick={() => torles(t.id)}>🗑️</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{kivalasztott ? "Tanterem szerkesztése" : "Új tanterem"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Tanterem neve</Form.Label>
              <Form.Control
                type="text"
                value={nev}
                onChange={(e) => setNev(e.target.value)}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Mégse</Button>
          <Button variant="primary" onClick={mentes}>Mentés</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TanteremLista;








