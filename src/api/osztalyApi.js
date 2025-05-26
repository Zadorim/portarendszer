import axios from 'axios';

//const API_BASE = `${process.env.REACT_APP_API_BASE_URL}/Osztaly`;
const API_BASE =  "http://localhost:5072/api/Osztaly";
export const getOsztalyok = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(API_BASE, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

/**
 * Egy osztály lekérése ID alapján
 */
export const getOsztalyById = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get(`${API_BASE}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
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
    const token = localStorage.getItem('token');
    const res = await axios.post(API_BASE, osztaly, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
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
    const token = localStorage.getItem('token');
    await axios.put(`${API_BASE}/${id}`, osztaly, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
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
    const token = localStorage.getItem('token');
    await axios.delete(`${API_BASE}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (err) {
    console.error(`❌ Osztály törlése sikertelen ID: ${id}`, err);
    throw err;
  }
};



