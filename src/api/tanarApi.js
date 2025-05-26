import axios from 'axios';
//const API_BASE = `${process.env.REACT_APP_API_BASE_URL}/Felhasznalo`;
const API_BASE =  "http://localhost:5072/api/Felhasznalo";
/**
 * Tanárok lekérdezése (csak beosztás = tanár)
 */
export const getTanarok = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(`${API_BASE}/tanarok`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
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

