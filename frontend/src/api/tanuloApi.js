import axios from 'axios';

const API_BASE = 'http://localhost:5072/api/Tanulo'; // vagy relatív útvonal: '/api/Tanulo'

/**
 * Összes tanuló lekérése
 */
export const getTanulok = async () => {
  try {
    const res = await axios.get(API_BASE);
    return res.data;
  } catch (err) {
    console.error('Tanulók lekérése sikertelen:', err);
    throw err;
  }
};

/**
 * Egy tanuló lekérése ID alapján
 */
export const getTanuloById = async (id) => {
  try {
    const res = await axios.get(`${API_BASE}/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Tanuló lekérése sikertelen ID: ${id}`, err);
    throw err;
  }
};

/**
 * Új tanuló hozzáadása
 */
export const createTanulo = async (tanulo) => {
  try {
    const res = await axios.post(API_BASE, tanulo);
    return res.data;
  } catch (err) {
    console.error('Tanuló hozzáadása sikertelen:', err);
    throw err;
  }
};

/**
 * Tanuló frissítése ID alapján
 */
export const updateTanulo = async (id, tanulo) => {
  try {
    await axios.put(`${API_BASE}/${id}`, tanulo);
  } catch (err) {
    console.error(`Tanuló frissítése sikertelen ID: ${id}`, err);
    throw err;
  }
};

/**
 * Tanuló törlése ID alapján
 */
export const deleteTanulo = async (id) => {
  try {
    await axios.delete(`${API_BASE}/${id}`);
  } catch (err) {
    console.error(`Tanuló törlése sikertelen ID: ${id}`, err);
    throw err;
  }
};


