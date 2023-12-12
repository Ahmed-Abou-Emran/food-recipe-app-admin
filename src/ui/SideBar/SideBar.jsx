import React from "react";
import styled from "styled-components";
import { SideBarLogo } from "../../assets";
import { FaArrowRightLong as RightArrow } from "react-icons/fa6";
import NavItems from "./NavItems";
function SideBar() {
  const [open, setOpen] = React.useState(true);
  return (
    <Wrapper open={open}>
      <MenuToggle open={open} onClick={() => setOpen((prev) => !prev)}>
        <LogoWrapper open={open}>
          <img src={SideBarLogo} />
        </LogoWrapper>
      </MenuToggle>
      <NavItems open={open} />
    </Wrapper>
  );
}

const Wrapper = styled.aside`
  position: sticky;
  top: 0;
  height: 100svh;
  position: sticky;
  top: 0;
  left: 0;
  grid-area: sidebar;
  align-self: start;
  border-radius: 0rem 3.625rem 0rem 0rem;
  background: var(--Primary, #1f263e);
  width: ${({ open }) => (open ? "15rem" : "5rem")};

  transition: all 0.5s ease-in-out;
`;

const MenuToggle = styled.div`
  cursor: pointer;
`;

const LogoWrapper = styled.div`
  margin-inline-start: 0.5rem;
  width: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem 0rem;
`;

export default SideBar;
