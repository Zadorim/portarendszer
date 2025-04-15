// AdminOldal.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
// A MemoryRouter segítségével tudjuk szimulálni a route-okat
import { MemoryRouter } from 'react-router-dom';
import AdminOldal from '../pages/AdminOldal';

// Mockoljuk a useNavigate hookot, hogy lásd hova navigálna
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));
const mockNavigate = jest.fn();

describe('AdminOldal tesztek', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test('Megjelenik a vezérlőpult cím', () => {
    render(<AdminOldal />, { wrapper: MemoryRouter });
    expect(screen.getByText('Admin vezérlőpult')).toBeInTheDocument();
  });

  test('Kártyák megjelennek és kattintáskor navigál', () => {
    render(<AdminOldal />, { wrapper: MemoryRouter });

    // Például a "Tantermek kezelése" menüpont
    // -- ez a Card.Title vagy Card.Text lesz
    const tantermekCardTitle = screen.getByText('Tantermek kezelése');
    expect(tantermekCardTitle).toBeInTheDocument();

    // Kattintás a Card-ra
    fireEvent.click(tantermekCardTitle);

    // Elvárt, hogy a navigate('/admin/tanterem') hívódjon
    expect(mockNavigate).toHaveBeenCalledWith('/admin/tanterem');
  });
});
