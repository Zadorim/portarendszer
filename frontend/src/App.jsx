import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import KezdoOldal from './pages/KezdoOldal';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminOldal from './pages/AdminOldal';
import TanulokOldal from './pages/TanulokOldal';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<KezdoOldal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminOldal />} />
        <Route path="/admin/tanulok" element={<TanulokOldal />} />
      </Routes>
    </Router>
  );
}

export default App;
