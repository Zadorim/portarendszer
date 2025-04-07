import axios from 'axios';

const API_BASE = 'http://localhost:5072/api/Tanterem';

/**
 * Összes tanterem lekérése
 */
export const getTanteremek = async () => {
  try {
    const res = await axios.get(API_BASE);
    return res.data;
  } catch (err) {
    console.error('❌ Tantermek lekérése sikertelen:', err);
    throw err;
  }
};

/**
 * Egy tanterem lekérése ID alapján
 */
export const getTanteremById = async (id) => {
  try {
    const res = await axios.get(`${API_BASE}/${id}`);
    return res.data;
  } catch (err) {
    console.error(`❌ Tanterem lekérése sikertelen ID: ${id}`, err);
    throw err;
  }
};

/**
 * Új tanterem létrehozása
 */
export const createTanterem = async (tanterem) => {
  try {
    const res = await axios.post(API_BASE, tanterem);
    return res.data;
  } catch (err) {
    console.error('❌ Tanterem létrehozása sikertelen:', err);
    throw err;
  }
};

/**
 * Tanterem frissítése ID alapján
 */
export const updateTanterem = async (id, tanterem) => {
  try {
    await axios.put(`${API_BASE}/${id}`, tanterem);
  } catch (err) {
    console.error(`❌ Tanterem frissítése sikertelen ID: ${id}`, err);
    throw err;
  }
};

/**
 * Tanterem törlése ID alapján
 */
export const deleteTanterem = async (id) => {
  try {
    await axios.delete(`${API_BASE}/${id}`);
  } catch (err) {
    console.error(`❌ Tanterem törlése sikertelen ID: ${id}`, err);
    throw err;
  }
};


