import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaArrowRightLong as RightArrow } from "react-icons/fa6";
import { useUserContext } from "./UserProvider";

function Home() {
  const { userData } = useUserContext();
  const action = userData?.userType === "SuperAdmin" ? "Fill" : "View";

  return (
    <>
      <Wrapper>
        <Left>
          <h3>
            {action} the <span>Recipes</span>!
          </h3>
          <p>
            You can now {action} the meals easily using the table and form.
            Click
            <span> here</span> to {action} it with the table!
          </p>
        </Left>

        <Right>
          <LinkButton to="/recipes">
            {action} Recipes <RightArrow />
          </LinkButton>
        </Right>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  font-family: Roboto;
  background-color: var(--green-100);
  padding-inline: clamp(1rem, 0.4rem + 3vw, 4rem);
  padding-block: clamp(1rem, 0.6rem + 2vw, 3rem);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;

  @media (max-width: 60rem) {
    justify-content: center;
  }
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

  @media (max-width: 60rem) {
    text-align: center;
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
