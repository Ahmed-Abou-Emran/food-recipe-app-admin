import React from "react";
import styled from "styled-components";
import HeaderContents from "./HeaderContents";
import { useLocation } from "react-router-dom";

function Header() {
  const { pathname } = useLocation();
  console.log(pathname);

  const { h3, paragraph, imagePath } =
    HeaderContents[pathname.split("/")[1]] || HeaderContents.home;
  console.log(imagePath);
  return (
    <Wrapper>
      <h3>{h3}</h3>
      <p>{paragraph}</p>
      <ImageWrapper>
        <img src={imagePath} />
      </ImageWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  grid-area: header;
  /* background-image: url("./src/assets/test.svg");
  background-position: cover;
  background-size: 100% 100%; */

  background-image: url("./src/assets/header-bg.svg"),
    linear-gradient(to right, var(--green-700), var(--green-600));
  background-position: center;
  background-size: 100% 100%;
  height: 15rem;
  /* width: 100%; */
  padding-inline-start: var(--spacing-160);

  border-radius: 1rem;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  color: var(--grey-100);
  h3 {
    font-size: 2.5rem;
  }
  p {
    max-width: 30rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: 0.03rem;
  }
`;

const ImageWrapper = styled.div`
  height: 12rem;
  position: absolute;
  right: 4rem;
  bottom: 0.5rem;
  /* transition: all 300ms ease-in-out; */
  animation: flying 4s cubic-bezier(0.4, 0, 0.2, 1) infinite;

  img {
    height: 100%;
  }
`;

export default Header;
