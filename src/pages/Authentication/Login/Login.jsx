import React from "react";
import LoginForm from "./LoginForm";

import { useNavigate } from "react-router-dom";
export const Login = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (localStorage.getItem("authToken")) {
      navigate("/home");
    }
  }, [navigate]);

  return <LoginForm />;
};
