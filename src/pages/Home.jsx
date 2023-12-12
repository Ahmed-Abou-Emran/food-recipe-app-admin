import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaArrowRightLong as RightArrow } from "react-icons/fa6";
import DialogDemo, { DeleteDialog } from "../ui/Dialog/Dialog";

function Home() {
  return (
    <>
      <Wrapper>
        <Left>
          <h3>
            Fill the <span>Recipes</span> !
          </h3>
          <p>
            you can now fill the meals easily using the table and form , click
            here and fill it with the table !
          </p>
        </Left>
        <Right>
          <LinkButton to="/recipes">
            Fill Recipes <RightArrow />
          </LinkButton>
        </Right>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  font-family: Roboto;
  background-color: var(--green-100);
  padding-inline: var(--spacing-160) var(--spacing-100);
  padding-block: var(--spacing-100);
  border-radius: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Left = styled.div`
  max-width: 30rem;
  h3 {
    color: #1f263e;
    font-size: 1.5rem;
    font-weight: 500;

    span {
      color: var(--green-600);
      font-weight: 600;
    }
  }

  p {
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: 0.04rem;
  }
`;
const Right = styled.div``;
const LinkButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-family: Inter;
  font-size: 1rem;
  font-weight: 700;
  text-align: center;
  text-decoration: none;
  background-color: var(--green-600);
  color: var(--grey-100);
  padding-inline: var(--spacing-100);
  padding-block: var(--spacing-40);
  border-radius: 0.5rem;

  span {
    font-weight: 900;
  }
`;

export default Home;
