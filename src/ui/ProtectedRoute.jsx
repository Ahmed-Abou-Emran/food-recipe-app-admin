import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const adminToken = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!adminToken) {
      navigate("/login");
    }
  }, [adminToken, navigate]);

  if (adminToken) {
    return children;
  }
}

export default ProtectedRoute;
