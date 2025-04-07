import axios from 'axios';
import { jwtDecode } from 'jwt-decode';



export const login = async (username, password) => {
  const response = await axios.post('/api/Auth/login', {
    felhasznalonev: username,
    jelszo: password
  });

  const { token } = response.data;
  if (!token) throw new Error("Nincs token a válaszban!");

  // JWT token dekódolás
  const decoded = jwtDecode(token);

  const nevClaim = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name";
  const szerepClaim = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

  const nev = decoded[nevClaim];
  const szerep = decoded[szerepClaim];

  // Token mentése localStorage-be
  localStorage.setItem('token', token);
  localStorage.setItem('username', nev);
  localStorage.setItem('role', szerep);

  return {
    username: nev,
    role: szerep
  };
};

export const register = async ({ felhasznalonev, jelszo, nev, email, beosztas }) => {
  const response = await axios.post('/api/Auth/register', {
    felhasznalonev,
    jelszo,
    nev,
    email,
    beosztas
  });

  return response.data;
};



