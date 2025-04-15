import React, { useEffect, useState } from "react";
import { useDarkMode } from "../context/DarkModeContext";
import bellSound from "../assets/ringtone-you-would-be-glad-to-know.mp3"; // Hang fájl elérési útja
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function TanariTabletOldal() {
  const { isDarkMode } = useDarkMode();

  // Az aktuális jelzés, ha van a localStorage-ben
  const [ertesites, setErtesites] = useState(null);
  // A hang objektum
  const [hang] = useState(new Audio(bellSound));
  // Megjegyezzük, hogy a böngésző engedélyezte-e a hangot
  const [hangEngedelyezve, setHangEngedelyezve] = useState(false);

  // Gomb: „Hang engedélyezése”
  const engedelyezHangot = () => {
    hang.play()
      .then(() => {
        // Ha sikeres a lejátszás, akkor a böngésző engedélyezte
        setHangEngedelyezve(true);
        alert("A hang lejátszása mostantól engedélyezett!");
      })
      .catch((err) => {
        console.error("Nem sikerült lejátszani a hangot:", err);
        alert("A böngésző nem engedi az automatikus lejátszást. Kérjük, engedélyezd a hangot a beállításokban.");
      });
  };

  useEffect(() => {
    // Ha még nem engedélyezte a hangot, nem csinálunk semmit
    if (!hangEngedelyezve) return;

    // Függvény, ami 3 másodpercenként csekkolja a localStorage-ben lévő jelzést
    const ellenorizJelzest = () => {
      const adat = localStorage.getItem("tanarijelzes");
      if (adat) {
        const parsed = JSON.parse(adat);
        // Csak akkor játsszuk le a hangot és mutatjuk az értesítést, ha "elkuldve"
        if (parsed && parsed.allapot === "elkuldve") {
          setErtesites(parsed);
          hang.play().catch((e) => console.error("Hang lejátszás sikertelen:", e));
        }
      } else {
        setErtesites(null);
      }
    };

    ellenorizJelzest();
    const intervalId = setInterval(ellenorizJelzest, 3000);

    return () => clearInterval(intervalId);
  }, [hangEngedelyezve, hang]);

  // Elfogadás gomb
  const elfogad = () => {
    if (!ertesites) return;
    const friss = { ...ertesites, allapot: "elfogadva" };
    localStorage.setItem("tanarijelzes", JSON.stringify(friss));
    setErtesites(null);
    alert("Elfogadva!");
  };

  return (
  <div className="admin-page"> 
    <div
      className={`admin-page container py-5 ${isDarkMode ? "bg-dark text-light" : "bg-light text-dark"}`}
      style={{ minHeight: "100vh" }}
    >
      <h2 className="text-center mb-4">Tanári értesítések</h2>

      {/* Ha a hang még nincs engedélyezve, mutatunk egy gombot */}
      {!hangEngedelyezve && (
        <div className="text-center mb-4">
          <button className="btn btn-warning" onClick={engedelyezHangot}>
            <i className="bi bi-volume-up-fill me-2"></i>Hang engedélyezése
          </button>
        </div>
      )}

      {ertesites ? (
        <div className="alert alert-warning text-center">
          <h5>
            <i className="bi bi-bell-fill me-2"></i>
            Értesítés: <strong>{ertesites.tanuloNev}</strong> tanulóért megérkeztek
          </h5>
          <p className="mb-3">Osztály: {ertesites.osztalyNev}</p>
          <button className="btn btn-success" onClick={elfogad}>
            Elfogadás
          </button>
        </div>
      ) : (
        <div className="text-center">
          <p>Nincs új értesítés.</p>
        </div>
      )}
    </div>
  </div>
  );
}

export default TanariTabletOldal;
