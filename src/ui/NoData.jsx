import React from "react";
import styled from "styled-components";
import { NoData as NoDataImage } from "../assets";
const NoData = ({ children }) => {
  return (
    <Wrapper>
      <ImageWrapper>
        <img src={NoDataImage} />
      </ImageWrapper>
      <h4>No Data!</h4>
      <p>{children}</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-block: 1rem;
`;
const ImageWrapper = styled.div`
  height: 16rem;
  img {
    height: 100%;
  }
`;
export default NoData;
