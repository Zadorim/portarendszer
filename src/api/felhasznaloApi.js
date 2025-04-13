import axios from 'axios';

const API_BASE = 'http://localhost:5072/api/Felhasznalo';

// Összes felhasználó lekérdezése (admin jogosultsághoz)
export const getFelhasznalok = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(API_BASE, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

// Tanárok listázása
export const getTanarok = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(`${API_BASE}/tanarok`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

// Egy felhasználó lekérdezése ID alapján
export const getFelhasznaloById = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(`${API_BASE}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

// Aktuális bejelentkezett felhasználó lekérdezése
export const getAktualisFelhasznalo = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(`${API_BASE}/aktualis`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

// Felhasználó adatainak frissítése
export const updateFelhasznalo = async (id, felhasznalo) => {
  const token = localStorage.getItem('token');
  const res = await axios.put(`${API_BASE}/${id}`, felhasznalo, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

// Felhasználó törlése (admin)
export const deleteFelhasznalo = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.delete(`${API_BASE}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};


// Új felhasználó létrehozása (admin)
export const createFelhasznalo = async (felhasznalo) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(API_BASE, felhasznalo, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

