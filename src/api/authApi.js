import axios from 'axios';
//const API_BASE = `${process.env.REACT_APP_API_BASE_URL}/Auth`;
const API_BASE =  "http://localhost:5072/api/Auth";
/**
 * Bejelentkezés
 * @param {string} felhasznalonev 
 * @param {string} jelszo 
 * @returns {Promise<{ token: string }>}
 */
export const login = async (username, password) => {
  const res = await axios.post(`${API_BASE}/login`, {
    felhasznalonev: username,
    jelszo: password,
  });
  return res.data;
};

/**
 * Regisztráció
 * @param {object} felhasznaloObj 
 * @returns {Promise<string>}
 */
export const register = async (formData) => {
  const res = await axios.post(`${API_BASE}/register`, formData);
  return res.data;
};



