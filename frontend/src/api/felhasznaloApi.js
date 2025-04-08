import axios from 'axios';

const API_BASE = `${process.env.REACT_APP_API_BASE_URL}/Felhasznalo`;

export const getTanarok = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(`${API_BASE}/tanarok`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

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


