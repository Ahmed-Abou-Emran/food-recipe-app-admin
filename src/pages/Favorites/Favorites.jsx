import React from "react";
import styled from "styled-components";
import { useUserContext } from "../UserProvider";

const Favorites = () => {
  const { userData } = useUserContext();
  console.log(userData);
  const isAdmin = userData?.userType == "SuperAdmin";
  return (
    <Wrapper>
      {isAdmin && (
        <div>
          You are signed as an admin, you are not allowed to view the favorites
          pages. please sign in as a user to view the users page.
        </div>
      )}
      {!isAdmin && <div>Favorites</div>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-inline: var(--spacing-160);
  padding-block: var(--spacing-80);
`;
const SearchControls = styled.div`
  display: flex;
  width: 100%;
  padding-inline: var(--spacing-120);
  margin-block-end: var(--spacing-40);
  gap: var(--spacing-40);
`;
const SearchInput = styled.input`
  padding-inline: var(--spacing-30);
  padding-block: var(--spacing-20);
  border: 1px solid var(--green-300);
  border-radius: 0.5rem;
  flex: 5;

  &:focus {
    outline: 2px solid var(--green-600);
    outline-offset: 2px;
  }
`;

const SelectInput = styled.select`
  padding-inline: var(--spacing-30);
  padding-block: var(--spacing-20);
  border: 1px solid var(--green-300);
  border-radius: 0.5rem;
  flex: 2;

  &:focus {
    outline: 2px solid var(--green-600);
    outline-offset: 2px;
  }
`;
export default Favorites;
