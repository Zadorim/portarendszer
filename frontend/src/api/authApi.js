import axios from 'axios';
const API_BASE = 'http://localhost:5072/api';

/**
 * Bejelentkezés
 * @param {string} felhasznalonev 
 * @param {string} jelszo 
 * @returns {Promise<{ token: string }>}
 */
export const login = async (felhasznalonev, jelszo) => {
  try {
    const res = await axios.post(`${API_BASE}/Auth/login`, {
      felhasznalonev,
      jelszo
    });
    return res.data;
  } catch (error) {
    console.error("❌ Login hiba:", error);
    throw error;
  }
};

/**
 * Regisztráció
 * @param {object} felhasznaloObj 
 * @returns {Promise<string>}
 */
export const register = async (felhasznaloObj) => {
  try {
    const res = await axios.post(`${API_BASE}/Auth/register`, felhasznaloObj);
    return res.data;
  } catch (error) {
    console.error("❌ Regisztrációs hiba:", error);
    throw error;
  }
};



