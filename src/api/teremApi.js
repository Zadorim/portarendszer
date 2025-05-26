import axios from 'axios';

//const API_BASE = `${process.env.REACT_APP_API_BASE_URL}/TanteremHasznalat`;
const API_BASE =  "http://localhost:5072/api/TanteremHasznalat";
export const getTeremHasznalatOsztalyAlapjan = async (osztalyId) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(`${API_BASE}/osztaly/${osztalyId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
};

export const mentesTanteremHasznalat = async (payload) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(`${API_BASE}/mentes`, payload, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
};
/**
 * Összes tanterem lekérdezése
 */
export const getTanteremList = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Hiba a tantermek lekérésekor:', error);
    throw error;
  }
};

/**
 * Egy tanterem lekérdezése ID alapján
 * @param {number} id 
 */
export const getTanteremById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Hiba a tanterem (${id}) lekérésekor:`, error);
    throw error;
  }
};

/**
 * Új tanterem létrehozása
 * @param {object} tanteremData - { nev: string, aktiv: boolean }
 */
export const createTanterem = async (tanteremData) => {
  try {
    const response = await axios.post(BASE_URL, tanteremData);
    return response.data;
  } catch (error) {
    console.error('Hiba a tanterem létrehozásakor:', error);
    throw error;
  }
};

/**
 * Tanterem frissítése
 * @param {number} id 
 * @param {object} tanteremData 
 */
export const updateTanterem = async (id, tanteremData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, tanteremData);
    return response.data;
  } catch (error) {
    console.error(`Hiba a tanterem (${id}) frissítésekor:`, error);
    throw error;
  }
};
/**
 * Tanterem törlése
 * @param {number} id 
 */
export const deleteTanterem = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Hiba a tanterem (${id}) törlésekor:`, error);
    throw error;
  }
};
