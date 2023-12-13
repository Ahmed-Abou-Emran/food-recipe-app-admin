import React from "react";
import styled from "styled-components";
function Loader() {
  return (
    <Wrapper>
      <StyledLoader />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-inline: auto;
  height: 5rem;
  margin-block: 2rem;
`;

const StyledLoader = styled.span`
  height: 1rem;
  position: relative;

  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 50%;
    transform: translate(-50%, 10%);
    top: 0;
    background: var(--green-600);
    width: 16px;
    height: 16px;
    border-radius: 50%;
    animation: jump 0.5s ease-in infinite alternate;
  }

  &::after {
    background: #0000;
    color: var(--green-300);
    top: 100%;
    box-shadow: 32px -20px, -32px -20px;
    animation: split 0.5s ease-out infinite alternate;
  }

  @keyframes split {
    0% {
      box-shadow: 8px -20px, -8px -20px;
    }
    100% {
      box-shadow: 32px -20px, -32px -20px;
    }
  }
  @keyframes jump {
    0% {
      transform: translate(-50%, -150%);
    }
    100% {
      transform: translate(-50%, 10%);
    }
  }
`;

export default Loader;
