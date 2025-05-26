import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProfilOldal from '../pages/ProfilOldal';

// Mockold a getAktualisFelhasznalo és updateFelhasznalo hívásokat
jest.mock('../api/felhasznaloApi', () => ({
  getAktualisFelhasznalo: jest.fn(),
  updateFelhasznalo: jest.fn()
}));
import { getAktualisFelhasznalo, updateFelhasznalo } from '../api/felhasznaloApi';

test('profil sikeres betöltése és szerkesztése', async () => {
  getAktualisFelhasznalo.mockResolvedValueOnce({
    id: 123,
    felhasznalonev: 'adminuser',
    nev: 'Admin Teszt',
    email: 'admin@teszt.hu',
    beosztas: 'igazgato'
  });

  render(<ProfilOldal />);

  // Betöltés... -> Végül az adatok jelennek meg
  // Szerkesztés gomb
  fireEvent.click(screen.getByRole('button', { name: /Szerkesztés/i }));

  // Mezőknek most enabled-nek kell lenni
  fireEvent.change(screen.getByLabelText(/Név/i), { target: { value: 'Admin Updated' } });

  // Mentés
  updateFelhasznalo.mockResolvedValueOnce({ /*...*/ });
  fireEvent.click(screen.getByRole('button', { name: /Mentés/i }));

  // Ellenőrizzük, hogy hívta-e
  expect(updateFelhasznalo).toHaveBeenCalledWith(123, { nev: 'Admin Updated', email: 'admin@teszt.hu' });
});
