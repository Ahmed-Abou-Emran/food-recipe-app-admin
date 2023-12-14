import React from "react";
import styled from "styled-components";
import { FaChevronDown as ArrowDown } from "react-icons/fa";
import { MdNotificationsActive as Notification } from "react-icons/md";
import { IoIosSearch as Search } from "react-icons/io";
import { UserContext } from "../../pages/UserProvider";
import { FaRegUserCircle as RegularUser } from "react-icons/fa";

function NavBar() {
  const userData = React.useContext(UserContext);

  return (
    <Wrapper>
      <SearchForm>
        <input type="text" placeholder="Search Here" />
        <button>
          <Search />
        </button>
      </SearchForm>
      <Avatar>
        <ImageWrapper>
          {!userData?.imagePath ? (
            <RegularUser />
          ) : (
            <img src={`https://upskilling-egypt.com//${userData?.imagePath}`} />
          )}
        </ImageWrapper>
        <span>{userData?.userName || "user"}</span>
      </Avatar>
      <ArrowDown size="1rem" />
      <Notification size="1.5rem" />
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  /* position: sticky;
  top: 1rem;
  z-index: 1; */
  grid-area: navbar;
  display: flex;
  align-items: center;
  border-radius: 1rem;
  margin-inline-end: 1rem;
  margin-block-start: 1rem;
  padding-inline: 1rem 2rem;
  gap: 2rem;
  background: var(--grey-200);
  box-shadow: 0.3px 0.5px 0.7px hsl(var(--grey-900) / 0.36),
    0.8px 1.6px 2px -0.8px hsl(var(--grey-900) / 0.36),
    2.1px 4.1px 5.2px -1.7px hsl(var(--grey-900) / 0.36),
    5px 10px 12.6px -2.5px hsl(var(--grey-900) / 0.36);
`;

const SearchForm = styled.form`
  max-width: 50rem;
  background: var(--grey-100);
  display: flex;
  align-items: center;
  gap: 0.2rem;
  margin-inline-end: auto;
  border-radius: 0.5rem;
  height: 2rem;
  flex-grow: 1;
  svg {
    flex-shrink: 0;
    font-size: 1.5rem;
  }
  input {
    flex-grow: 1;
    width: 100%;
    height: 100%;
    padding-inline: 1rem;
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    background: var(--grey-100);
    border: none;
    &:focus {
      outline: 2px solid var(--green-500);
      outline-offset: 2px;
    }
  }

  button {
    height: 100%;
    border: none;
    background: none;
    padding-inline: 0.5rem;
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
    order: -1;
    &:focus {
      outline: 2px solid var(--green-400);
    }
  }
`;
const ImageWrapper = styled.div`
  img {
    width: 100%;
  }
  svg {
    font-size: 2.4rem;
  }
`;
const Avatar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  & ${ImageWrapper} {
    width: 2.5rem;
    height: 2.5rem;
    img {
      flex-shrink: 0;
      border-radius: 50%;
      border: 1px solid var(--grey-300);
    }
  }
`;
export default NavBar;
