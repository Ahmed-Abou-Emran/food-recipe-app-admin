import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import NavBar from "./NavBar";
import SideBar from "./SideBar/";
function AppLayout() {
  return (
    <Wrapper>
      <SideBar />
      <NavBar />
      <Main>
        <Header />
        <Outlet />
      </Main>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  /* height: 100%; */
  display: grid;
  grid-template-areas:
    "sidebar navbar navbar"
    "sidebar main main"
    "sidebar main main";
  grid-template-columns: auto 1fr 1fr;
  grid-template-rows: 5rem 1fr 1fr;
  gap: 1rem;
`;
const Main = styled.main`
  grid-area: main;
  display: flex;
  gap: 2rem;
  padding-inline-end: var(--spacing-40);
  margin-block: var(--spacing-40) var(--spacing-100);
  flex-direction: column;
  /* overflow: auto; */
`;

export default AppLayout;
