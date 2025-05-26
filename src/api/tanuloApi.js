import axios from 'axios';

//const API_BASE = `${process.env.REACT_APP_API_BASE_URL}/Tanulo`;
const API_BASE =  "http://localhost:5072/api/Tanulo";
export const getTanulok = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(API_BASE, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

/**
 * Egy tanuló lekérése ID alapján
 */
export const getTanuloById = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get(`${API_BASE}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  } catch (err) {
    console.error(`❌ Tanuló lekérése sikertelen ID: ${id}`, err);
    throw err;
  }
};

/**
 * Új tanuló létrehozása
 */
export const createTanulo = async (tanulo) => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.post(API_BASE, tanulo, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  } catch (err) {
    console.error('❌ Tanuló létrehozása sikertelen:', err);
    throw err;
  }
};

/**
 * Tanuló frissítése ID alapján
 */
export const updateTanulo = async (id, tanulo) => {
  try {
    const token = localStorage.getItem('token');
    await axios.put(`${API_BASE}/${id}`, tanulo, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (err) {
    console.error(`❌ Tanuló frissítése sikertelen ID: ${id}`, err);
    throw err;
  }
};

/**
 * Tanuló törlése ID alapján
 */
export const deleteTanulo = async (id) => {
  try {
    const token = localStorage.getItem('token');
    await axios.delete(`${API_BASE}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (err) {
    console.error(`❌ Tanuló törlése sikertelen ID: ${id}`, err);
    throw err;
  }
};


