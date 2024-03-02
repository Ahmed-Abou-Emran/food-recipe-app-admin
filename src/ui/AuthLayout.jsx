import React, { useEffect } from "react";
import styled from "styled-components";
import { Link, Outlet, useNavigate } from "react-router-dom";
import AuthLogo from "../assets/authLogo.png";
import { motion } from "framer-motion";
import { formVariants } from "../pages/Authentication/formAnimations";

function AuthLayout() {
  return (
    <AuthWrapper>
      <FormWrapper as={motion.div} layout>
        <LogoWrapper
          as={motion.div}
          variants={formVariants}
          initial="initial"
          animate="animate"
        >
          <Link to="/">
            <img src={AuthLogo} alt="Logo" />
          </Link>
        </LogoWrapper>
        <Outlet />
      </FormWrapper>
    </AuthWrapper>
  );
}

const AuthWrapper = styled.div`
  height: 100%;
  background-image: linear-gradient(
      51deg,
      rgba(55, 140, 47, 0.63) -22.39%,
      rgba(0, 0, 0, 0.62) 61.76%
    ),
    url("./src/assets/authBackground.png");
  background-position: center;
  background-size: cover;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 70rem) {
    height: auto;
    min-height: 100%;
  }
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--grey-100);
  gap: var(--spacing-40);
  border-radius: 1rem;

  width: clamp(30rem, 85%, 50rem);
  max-width: 100%;
  padding-inline: clamp(1rem, 0.2rem + 4vw, 5rem);
  padding-block: clamp(0.5rem, 1rem + 2vw, 2.5rem);
  /* overflow: hidden; */
  h1 {
    font-weight: 600;
    font-size: 1.5625rem;
  }

  p {
    font-size: 1rem;
    font-weight: 400;
    color: var(--grey-400);
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: var(--spacing-60);
  }
  @media (max-width: 70rem) {
    min-height: 100%;
    border-radius: revert;
  }
`;
const LogoWrapper = styled.div`
  height: 6rem;
  img {
    height: 100%;
  }
`;

export default AuthLayout;
