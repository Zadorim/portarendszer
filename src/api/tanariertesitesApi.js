// src/api/jelzesApi.js
import axios from 'axios';

const BASE_URL = 'http://localhost:5072/api/Jelzes';

export const kuldJelzes = async (payload) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(BASE_URL, payload, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
