import axios from 'axios';

const BASE_URL = 'http://localhost:5072/api/Felhasznalo';

/**
 * Tanárok lekérése az API-ból.
 * Csak azokat hozza, akik "tanar" szerepkörrel rendelkeznek.
 */
export const getTanarok = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/tanarok`);
    return response.data;
  } catch (error) {
    console.error('Hiba a tanárok lekérdezésekor:', error);
    throw error;
  }
};

/**
 * Egy adott tanár lekérdezése ID alapján.
 * @param {number} id - A tanár azonosítója
 */
export const getTanarById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Hiba a tanár (${id}) lekérdezésekor:`, error);
    throw error;
  }
};
