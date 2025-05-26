import React from 'react';
import { render, screen } from '@testing-library/react';
import PortasOldal from '../pages/PortasOldal';
jest.mock('../api/tanuloApi', () => ({
  getTanulok: jest.fn()
}));
import { getTanulok } from '../api/tanuloApi';

test('tanulók betöltése és megjelenítése', async () => {
  getTanulok.mockResolvedValueOnce([
    { id: 1, nev: 'Kis Béla', osztalyNev: '1A', specHazavitel: false },
    { id: 2, nev: 'Nagy Anna', osztalyNev: '1A', specHazavitel: true }
  ]);

  render(<PortasOldal />);

  // A mock adatokra vár
  // Ellenőrizzük, hogy Kis Béla és Nagy Anna is megjelenik
  expect(await screen.findByText(/Kis Béla/i)).toBeInTheDocument();
  expect(await screen.findByText(/Nagy Anna/i)).toBeInTheDocument();
});
