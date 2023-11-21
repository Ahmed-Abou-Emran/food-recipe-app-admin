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
`;

const StyledLoader = styled.span`
  height: 1.25rem;
  width: 1.25rem;
  border: 5px dotted #fff;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  animation: rotation 2s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Loader;
