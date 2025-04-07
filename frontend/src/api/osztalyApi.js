import axios from 'axios';

const API_BASE = 'http://localhost:5072/api/Osztaly';

/**
 * Összes osztály lekérése
 */
export const getOsztalyok = async () => {
  try {
    const res = await axios.get(API_BASE);
    return res.data;
  } catch (err) {
    console.error('❌ Osztályok lekérése sikertelen:', err);
    throw err;
  }
};

/**
 * Egy osztály lekérése ID alapján
 */
export const getOsztalyById = async (id) => {
  try {
    const res = await axios.get(`${API_BASE}/${id}`);
    return res.data;
  } catch (err) {
    console.error(`❌ Osztály lekérése sikertelen ID: ${id}`, err);
    throw err;
  }
};

/**
 * Új osztály létrehozása
 */
export const createOsztaly = async (osztaly) => {
  try {
    const res = await axios.post(API_BASE, osztaly);
    return res.data;
  } catch (err) {
    console.error('❌ Osztály létrehozása sikertelen:', err);
    throw err;
  }
};

/**
 * Osztály frissítése ID alapján
 */
export const updateOsztaly = async (id, osztaly) => {
  try {
    await axios.put(`${API_BASE}/${id}`, osztaly);
  } catch (err) {
    console.error(`❌ Osztály frissítése sikertelen ID: ${id}`, err);
    throw err;
  }
};

/**
 * Osztály törlése ID alapján
 */
export const deleteOsztaly = async (id) => {
  try {
    await axios.delete(`${API_BASE}/${id}`);
  } catch (err) {
    console.error(`❌ Osztály törlése sikertelen ID: ${id}`, err);
    throw err;
  }
};


