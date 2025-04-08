import axios from 'axios';
const API_BASE = 'http://localhost:5072/api/Felhasznalo';

/**
 * Összes felhasználó lekérése
 */
export const getFelhasznalok = async () => {
  try {
    const res = await axios.get(API_BASE);
    return res.data;
  } catch (err) {
    console.error('Felhasználók lekérése sikertelen:', err);
    throw err;
  }
};

/**
 * Egy felhasználó lekérése ID alapján
 */
export const getFelhasznaloById = async (id) => {
  try {
    const res = await axios.get(`${API_BASE}/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Felhasználó lekérése sikertelen ID: ${id}`, err);
    throw err;
  }
};

export const getTanarok = async () => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get(`${API_BASE}/tanarok`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  } catch (err) {
    console.error("❌ Tanárok lekérése sikertelen:", err);
    throw err;
  }
};
/**
 * Felhasználó törlése
 */
export const deleteFelhasznalo = async (id) => {
  try {
    await axios.delete(`${API_BASE}/${id}`);
  } catch (err) {
    console.error(`Felhasználó törlése sikertelen ID: ${id}`, err);
    throw err;
  }
};


