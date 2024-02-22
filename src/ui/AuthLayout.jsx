import React, { useEffect } from "react";
import styled from "styled-components";
import { Outlet, useNavigate } from "react-router-dom";

function AuthLayout() {
  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  );
}

const Wrapper = styled.div`
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

export default AuthLayout;
