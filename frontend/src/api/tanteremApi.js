import axios from 'axios';
const API_BASE = 'http://localhost:5072/api';

/**
 * Összes tanterem lekérése
 */
export const getTanteremek = async () => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get(`${API_BASE}/Tanterem`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
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
    const token = localStorage.getItem('token');
    const res = await axios.get(`${API_BASE}/Tanterem/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
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
    const token = localStorage.getItem('token');
    const res = await axios.post(`${API_BASE}/Tanterem`, tanterem, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
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
    const token = localStorage.getItem('token');
    await axios.put(`${API_BASE}/Tanterem/${id}`, tanterem, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
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
    const token = localStorage.getItem('token');
    await axios.delete(`${API_BASE}/Tanterem/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (err) {
    console.error(`❌ Tanterem törlése sikertelen ID: ${id}`, err);
    throw err;
  }
};


