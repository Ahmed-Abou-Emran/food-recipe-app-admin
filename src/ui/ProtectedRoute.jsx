import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // const adminToken = localStorage.getItem("adminToken");

  const adminToken = localStorage.getItem("adminToken");

  React.useEffect(() => {
    if (!adminToken) {
      navigate("/login");
    }
  }, []);

  if (adminToken) {
    return children;
  }
}

export default ProtectedRoute;
