// src/components/AdminVisszaGomb.js
import React from "react";
import { Button } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function AdminVisszaGomb({ title = null }) {
  const navigate = useNavigate();

  return (
    <div className="d-flex align-items-center mb-3">
      <Button 
        variant="outline-secondary" 
        onClick={() => navigate(-1)}
        className="me-3"
      >
        <FaArrowLeft />
      </Button>
      {title && <h2 className="mb-0">{title}</h2>}
    </div>
  );
}

export default AdminVisszaGomb;
