import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaUsers as Users, FaHome as Home } from "react-icons/fa";
import { IoFastFoodOutline as Recipes } from "react-icons/io5";
import { BiCategory as Categories } from "react-icons/bi";
import { MdLockOpen as ChangePassword } from "react-icons/md";
import { FiLogOut as LogOut } from "react-icons/fi";
import ChangePasswordDialog from "../ChangePasswordDialog";
const navItems = [
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

const NavItems = ({ open }) => {
  const [openChangePassword, setOpenChangePassword] = React.useState(false);
  const navigate = useNavigate();
  const logOutHandler = () => {
    localStorage.removeItem("adminToken");
    navigate("./login");
  };

  return (
    <Nav open={open}>
      <ul>
        {navItems.map((item) => (
          <NavItem open={open} key={item.id} {...item} />
        ))}
      </ul>
      <button onClick={() => setOpenChangePassword(true)}>
        <ChangePassword /> <span>Change Password</span>
      </button>
      <ChangePasswordDialog
        open={openChangePassword}
        setOpen={setOpenChangePassword}
      />
      <button onClick={logOutHandler}>
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
        &.active {
          background: var(--grey-700);
          border-left: 2px solid var(--green-600);
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
    &:hover {
      overflow: hidden;
      background: var(--grey-700);
      border-left: 2px solid var(--green-600);
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
  transition: all 0.5s ease-in-out;

  span {
    display: ${({ open }) => (open ? "flex" : "none")};
    text-transform: capitalize;
  }
`;
export default NavItems;
