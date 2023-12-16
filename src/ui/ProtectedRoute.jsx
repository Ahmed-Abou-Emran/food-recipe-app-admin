import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // const authToken = localStorage.getItem("authToken");

  const authToken = localStorage.getItem("authToken");

  React.useEffect(() => {
    if (!authToken) {
      navigate("/login");
    }
  }, []);

  if (authToken) {
    return children;
  }
}

export default ProtectedRoute;
