import React from "react";
import styled from "styled-components";
import HeaderContents from "./HeaderContents";
import { useLocation } from "react-router-dom";
import { useUserContext } from "../../pages/UserProvider";

function Header() {
  const { userData } = useUserContext();
  const { pathname } = useLocation();

  const currentPath = pathname.split("/")[1];
  const { h3, paragraph, imagePath } =
    HeaderContents[currentPath] || HeaderContents.home;
  return (
    <Wrapper>
      <ContentWrapper>
        <h3>
          {h3}
          {currentPath === "home" ? userData?.userName : null}
        </h3>
        <p>{paragraph}</p>
      </ContentWrapper>
      <ImageWrapper>
        <img src={imagePath} />
      </ImageWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  grid-area: header;
  background-image: url("./src/assets/header-bg.svg"),
    linear-gradient(to right, var(--green-700), var(--green-600));
  background-position: center;
  background-size: cover;
  padding-inline: clamp(1rem, 0.4rem + 3vw, 4rem);
  padding-block: var(--spacing-80);
  border-radius: 1rem;
  display: flex;
  justify-content: space-between;

  align-items: center;
  gap: var(--spacing-80);

  color: var(--grey-100);
  h3 {
    font-size: clamp(2rem, 1.8rem + 1vw, 3rem);
  }
  p {
    max-width: 30rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: 0.03rem;
  }

  @media (max-width: 72rem) {
    flex-direction: column;
    justify-content: center;
  }
`;

const ContentWrapper = styled.div`
  @media (max-width: 72rem) {
    text-align: center;

    h3 {
      line-height: 1.1;
      margin-block-end: var(--spacing-50);
    }
  }
`;
const ImageWrapper = styled.div`
  height: 12rem;
  /* transition: all 300ms ease-in-out; */
  animation: flying 4s cubic-bezier(0.4, 0, 0.2, 1) infinite;

  img {
    height: 100%;
  }
`;

export default Header;
