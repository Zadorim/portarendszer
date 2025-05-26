# PortaRendszer – Iskolai Tanuló Hazabocsátási Rendszer

Ez a projekt egy **React + ASP.NET Core alapú webes alkalmazás**, amely segíti az általános iskolai portásokat és tanárokat a tanulók hatékony hazabocsátásában. A rendszer támogatja a **szülői értesítést**, a **tanári jóváhagyást** és a **felhasználók szerepkör-alapú kezelését**.

---

## 📁 Projekt Felépítése

```
portarendszer/
│
├── frontend/           # React + Bootstrap felület (portás, admin, tanár)
│   ├── public/
│   ├── src/
│   │   ├── api/        # Axios-alapú backend hívások
│   │   ├── components/
│   │   ├── context/    # AuthContext, DarkModeContext
│   │   ├── pages/      # Oldalak: Admin, Profil, Portás, Tanári tablet
│   │   ├── style.css   # Sötét/világos mód és dizájn
│   │   └── App.jsx     # Router, Auth, DarkMode integráció
│
├── backend/            # ASP.NET Core Web API (C#)
│   ├── Controllers/    # Auth, Felhasznalo, Osztaly, Tanulo, stb.
│   ├── Models/         # EF Core entitások
│   ├── Data/           # DbContext
│   └── appsettings.json
│
├── adatbazis/          # SQL sémák, dump
└── README.md           # Ez a fájl
```

---

## 🚀 Funkcionalitás

### 👤 Szerepkörök
- **Admin** – profil, tantermek/osztályok/tanulók kezelése, belépési napló
- **Portás** – tanuló kiválasztás → jelzés küldése a tanárnak
- **Tanár (tablet)** – csengő hang + név megjelenik → elfogadás
- **JWT-alapú bejelentkezés + regisztráció**

### 🌗 Dark / Light mód
- Minden oldalon elérhető, stílusos gombváltóval

### 🔔 Tanulóért jöttek funkció
- A portás localStorage-be írja az üzenetet (frontend-only demo)
- A tanári oldal 3 másodpercenként ellenőrzi, cseng

---

## 🛠 Telepítés

### 1️⃣ Frontend (React)
```bash
cd frontend
npm install            # Függőségek telepítése
npm start              # Fejlesztői szerver (localhost:3000)
npm run build          # Buildelés production környezethez
npm test               # Teszt futtatás (Jest + RTL)
```

### 2️⃣ Backend (ASP.NET Core)
```bash
cd backend
dotnet restore         # Csomagok letöltése
dotnet build           # Fordítás
dotnet run             # Backend indítása (localhost:5072)
```

### 3️⃣ Adatbázis (MySQL / MariaDB)
- A `appsettings.json` fájlban állítsd be a kapcsolódást:
```json
"ConnectionStrings": {
  "DefaultConnection": "server=localhost;user=root;password=;database=portarendszer;"
}
```
- `backend/Data/` alatt futtatható EF Core migráció vagy SQL dump import

---

## 📆 Fejlesztési Napló

- ✅ Login/Logout rendszer JWT-vel
- ✅ Dark/Light mód bevezetése globálisan
- ✅ Sikeres Tanuló → Portás → Tanári tablet jelzéslánc
- ✅ Admin oldalak (CRUD: tantermek, tanulók, osztályok)
- ✅ Stílus finomhangolása (responsive + hover effektek)
- 🔄 WebSocket alapú élő frissítés – **hamarosan**

---

## 📄 Tesztelés

- **Jest + React Testing Library** alapú tesztek a `Navbar`, `LoginModal`, `RegisterModal` komponensekre
```bash
npm test
```

---

## 🤝 Készítette

**Zádori Mónika**  
Miskolci Szilágyi Dezső Általános Iskola  
GitHub: [github.com/Zadorim](https://github.com/Zadorim)