import axios from "axios";
// API alap URL
const API_BASE = "http://localhost:5072/api/Auth";

// Bejelentkezés
export const login = async (username, password) => {
  const res = await axios.post(`${API_BASE}/login`, {
    felhasznalonev: username,
    jelszo: password,
  });

  const data = res.data;
  const role = data.beosztas?.toLowerCase();

  return {
    token: data.token,
    username: data.felhasznalonev,
    role: role === "igazgato" ? "admin" : role,
  };
};

// Regisztráció
export const register = async (formData) => {
  const res = await axios.post(`${API_BASE}/register`, formData);

  const data = res.data;
  const role = data.beosztas?.toLowerCase();

  return {
    token: data.token,
    username: data.felhasznalonev,
    role: role === "igazgato" ? "admin" : role,
  };
};

