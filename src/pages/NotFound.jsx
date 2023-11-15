import React from "react";
import styled from "styled-components";
import NotFoundBackground from "../assets/notFound.png";
import Logo from "../assets/AuthLogo.png";
import { Link } from "react-router-dom";
function NotFound() {
  return (
    <Wrapper>
      <ContentWrapper>
        <LogoWrapper>
          <LogoLink to="/">
            <img src={Logo} alt="Logo" />
          </LogoLink>
        </LogoWrapper>
        <Content>
          <h2>Opps.</h2>
          <h3>Page Not Found</h3>
          <p>
            This Page doesn’t exist or was removed! We suggest you back to home.
          </p>

          <Link to="/app/home"> &larr; Back to Home</Link>
        </Content>
      </ContentWrapper>
      <ImageWrapper>
        <img src={NotFoundBackground} alt=" " />
      </ImageWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  height: 100%;
`;
const ContentWrapper = styled.div`
  width: clamp(15rem, 65%, 40rem);
  max-width: 100%;
  position: relative;
  z-index: 1;
  padding-inline: var(--spacing-130);
  padding-block: var(--spacing-100);
`;
const Content = styled.div`
  /* margin-inline-start: var(--spacing-280); */
  display: flex;
  flex-direction: column;
  align-items: start;
  h2 {
    color: var(--green-950);
    font-size: 2.5rem;
    font-weight: 700;
  }
  h3 {
    color: var(--green-600);
    font-size: 2rem;
    font-weight: 400;
    margin-bottom: var(--spacing-80);
  }
  p {
    color: var(--green-950);
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: 0.04rem;
  }

  a {
    margin-block-start: var(--spacing-160);
    text-decoration: none;
    text-align: center;
    align-self: stretch;
    border-radius: 0.5rem;
    background: var(--green-600);
    padding-block: var(--spacing-50);
    padding-inline: var(--spacing-80);
    color: var(--grey-100);
    border: none;
    transition: background 0.2s ease-in-out;

    &:hover {
      background: var(--green-700);
      cursor: pointer;
    }
  }
`;

const ImageWrapper = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  z-index: 0;
  height: 100%;
  img {
    height: 100%;
  }
`;

const LogoWrapper = styled.div`
  height: 6rem;
  margin-block-end: var(--spacing-200);
  img {
    height: 100%;
  }
`;

const LogoLink = styled(Link)`
  text-decoration: none;
`;

export default NotFound;
