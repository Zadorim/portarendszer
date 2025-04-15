import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../pages/Login';

// Mockold a login függvényt
jest.mock('../api/authApi', () => ({
  login: jest.fn()
}));
import { login as mockLogin } from '../api/authApi';

test('sikeres bejelentkezés admin userrel', async () => {
  // 1. Mockold a login hívást
  mockLogin.mockResolvedValueOnce({
    token: 'TEST_TOKEN',
    username: 'adminuser',
    role: 'admin'
  });

  // 2. render a MemoryRouter-rel 
  render(<Login />, { wrapper: MemoryRouter });

  // 3. kitöltöd a mezőket
  fireEvent.change(screen.getByLabelText(/Felhasználónév/i), {
    target: { value: 'adminuser' }
  });
  fireEvent.change(screen.getByLabelText(/Jelszó/i), {
    target: { value: 'adminpwd' }
  });

  // 4. rákattintasz a bejelentkezés gombra
  fireEvent.click(screen.getByRole('button', { name: /Bejelentkezés/i }));

  // 5. Várunk, hogy a mock lefusson
  expect(mockLogin).toHaveBeenCalledWith('adminuser', 'adminpwd');

  // 6. Ellenőrizzük, hogy localStorage-be beállítás történt
  expect(localStorage.getItem('token')).toBe('TEST_TOKEN');
  // A navigáció is kipróbálható, de MemoryRouter-rel kicsit összetettebb
});
