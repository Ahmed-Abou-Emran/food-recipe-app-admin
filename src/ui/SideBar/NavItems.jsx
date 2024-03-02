import React from "react";

import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ChangePasswordDialog from "../ChangePasswordDialog";

import { IoFastFoodOutline as Recipes } from "react-icons/io5";
import {
  FiHome as Home,
  FiUsers as Users,
  FiGrid as Categories,
  FiHeart as Heart,
  FiLock as Lock,
  FiLogOut as LogOut,
} from "react-icons/fi";
import { useUserContext } from "../../pages/UserProvider";

const adminNavItems = [
  {
    id: 1,
    name: "home",
    path: "/home",
    icon: <Home />,
  },
  {
    id: 2,
    name: "users",
    path: "/users",
    icon: <Users />,
  },
  {
    id: 3,
    name: "recipes",
    path: "/recipes",
    icon: <Recipes />,
  },
  {
    id: 4,
    name: "categories",
    path: "/categories",
    icon: <Categories />,
  },
];
const userNavItems = [
  {
    id: 1,
    name: "home",
    path: "/home",
    icon: <Home />,
  },

  {
    id: 3,
    name: "recipes",
    path: "/recipes",
    icon: <Recipes />,
  },

  { id: 5, name: "favorites", path: "/favorites", icon: <Heart /> },
];

const NavItems = ({ open }) => {
  const navigate = useNavigate();
  const { userData, logOutHandler } = useUserContext();
  const [openChangePassword, setOpenChangePassword] = React.useState(false);
  const logOut = () => {
    logOutHandler();
    navigate("./login");
  };

  return (
    <Nav open={open}>
      <ul>
        {userData?.userType == "SuperAdmin" &&
          adminNavItems.map((item) => (
            <NavItem open={open} key={item.id} {...item} />
          ))}
        {userData?.userType == "SystemUser" &&
          userNavItems.map((item) => (
            <NavItem open={open} key={item.id} {...item} />
          ))}
      </ul>
      <button onClick={() => setOpenChangePassword(true)}>
        <Lock /> <span>Change Password</span>
      </button>
      <ChangePasswordDialog
        key={openChangePassword}
        open={openChangePassword}
        setOpen={setOpenChangePassword}
      />
      <button onClick={logOut}>
        <LogOut />
        <span>Logout</span>
      </button>
    </Nav>
  );
};

const NavItem = ({ path, name, icon, open }) => {
  return (
    <li>
      <NavLinkStyled open={open} to={path}>
        {icon}
        <span>{name}</span>
      </NavLinkStyled>
    </li>
  );
};

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  ul {
    list-style: none;
    li {
      a {
        display: flex;
        text-decoration: none;
        padding-inline-start: 1rem;
        border: 2px solid transparent;
        &:hover,
        &:focus,
        &.active {
          background: var(--grey-700);
          border-left: 2px solid var(--green-600);
          outline: none;
        }
      }

      svg {
        flex-shrink: 0;
        width: 1.5rem;
        height: 1.5rem;
      }
    }

    li:last-of-typ {
      margin-block-start: auto;
    }
  }

  button {
    display: flex;
    /* margin-block-start: 3rem; */
    /* overflow: hidden; */
    gap: 1rem;
    color: var(--grey-200);
    text-decoration: none;
    padding: 1rem;
    font-size: 1rem;
    cursor: pointer;
    border: 2px solid transparent;
    background: none;
    &:hover,
    &:focus {
      overflow: hidden;
      background: var(--grey-700);
      border-left: 2px solid var(--green-600);
      outline: none;
    }
    svg {
      flex-shrink: 0;
      width: 1.5rem;
      height: 1.5rem;
    }
    span {
      display: ${({ open }) => (open ? "block" : "none")};
    }
  }
`;
const NavLinkStyled = styled(NavLink)`
  display: flex;
  align-items: center;

  color: var(--grey-200);
  padding: 1rem 0rem;
  font-size: 1rem;
  text-decoration: none;
  gap: 1rem;

  span {
    display: ${({ open }) => (open ? "flex" : "none")};
    text-transform: capitalize;
  }
`;
export default NavItems;
