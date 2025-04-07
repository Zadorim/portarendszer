import axios from 'axios';

const BASE_URL = 'http://localhost:5072/api/Felhasznalo';

/**
 * Tanárok lekérdezése (csak beosztás = tanár)
 */
export const getTanarok = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/tanarok`);
    return res.data;
  } catch (err) {
    console.error('Hiba a tanárok lekérdezésekor:', err);
    throw err;
  }
};

/**
 * Egy tanár lekérdezése ID alapján
 */
export const getTanarById = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Hiba a tanár (${id}) lekérdezésekor:`, err);
    throw err;
  }
};

/**
 * Új tanár létrehozása
 */
export const createTanar = async (tanar) => {
  try {
    const res = await axios.post(`${BASE_URL}`, tanar);
    return res.data;
  } catch (err) {
    console.error('Hiba a tanár létrehozásakor:', err);
    throw err;
  }
};

/**
 * Tanár frissítése
 */
export const updateTanar = async (id, tanar) => {
  try {
    await axios.put(`${BASE_URL}/${id}`, tanar);
  } catch (err) {
    console.error(`Hiba a tanár (${id}) frissítésekor:`, err);
    throw err;
  }
};

/**
 * Tanár törlése
 */
export const deleteTanar = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (err) {
    console.error(`Hiba a tanár (${id}) törlésekor:`, err);
    throw err;
  }
};

