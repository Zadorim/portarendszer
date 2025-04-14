import axios from 'axios';

const API_BASE = "http://localhost:5072/api/Auth";

export const login = async (username, password) => {
  const res = await axios.post(`${API_BASE}/login`, {
    felhasznalonev: username,
    jelszo: password,
  });

  const data = res.data;

  const role = data.beosztas?.toLowerCase(); // pl. 'igazgato' → 'admin'

  return {
    token: data.token,
    username: data.felhasznalonev,
    role: role === 'igazgato' ? 'admin' : role, // opcionális logika
  };
};

export const register = async (formData) => {
  const res = await axios.post(`${API_BASE}/register`, formData);

  const data = res.data;
  const role = data.beosztas?.toLowerCase();

  return {
    token: data.token,
    username: data.felhasznalonev,
    role: role === 'igazgato' ? 'admin' : role,
  };
};
