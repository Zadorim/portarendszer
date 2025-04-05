import React from 'react';
import AdminNavbar from '../components/AdminNavbar';

const AdminOldal = () => {
  return (
    <>
      <AdminNavbar />
      <div className="container mt-5 pt-5">
        <h2>Admin felület</h2>
        <p>Itt kezelheted a tanulókat, beállításokat és jelenléteket.</p>
      </div>
    </>
  );
};

export default AdminOldal;
