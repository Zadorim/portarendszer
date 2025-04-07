import axios from 'axios';
const API_BASE = 'http://localhost:5072/api/Belepes';

/**
 * Összes belépési napló lekérése
 */
export const getBelepesek = async () => {
  try {
    const res = await axios.get(API_BASE);
    return res.data;
  } catch (err) {
    console.error('❌ Hiba a belépési naplók lekérésekor:', err);
    throw err;
  }
};

/**
 * Egy belépési naplóbejegyzés lekérése ID alapján
 */
export const getBelepesById = async (id) => {
  try {
    const res = await axios.get(`${API_BASE}/${id}`);
    return res.data;
  } catch (err) {
    console.error(`❌ Hiba a belépés lekérésekor (ID: ${id}):`, err);
    throw err;
  }
};

/**
 * Új belépési naplóbejegyzés létrehozása
 */
export const createBelepes = async (belepesAdat) => {
  try {
    const res = await axios.post(API_BASE, belepesAdat);
    return res.data;
  } catch (err) {
    console.error('❌ Hiba a belépés létrehozásakor:', err);
    throw err;
  }
};

/**
 * Belépési naplóbejegyzés törlése ID alapján
 */
export const deleteBelepes = async (id) => {
  try {
    await axios.delete(`${API_BASE}/${id}`);
  } catch (err) {
    console.error(`❌ Hiba a belépés törlésekor (ID: ${id}):`, err);
    throw err;
  }
};
