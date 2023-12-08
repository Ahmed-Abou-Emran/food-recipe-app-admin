import axios from "axios";
import React from "react";
import { FaRegUserCircle as RegularUser } from "react-icons/fa";
import styled from "styled-components";

import { DeleteUserDialog, ViewUserDialog } from "./UsersDialogs";
import { useUpdateParams, useUsers } from "./UsersProvider";
import { range } from "../../utils/helpers";
import { NoData } from "../../ui";

function Users() {
  const [params, updateParams] = useUpdateParams();
  const { users, totalNumberOfPages } = useUsers();
  return (
    <Wrapper>
      <AddNewItemWrapper>
        <Left>
          <h3>Users Table Details</h3>
          <p>You can check all details</p>
        </Left>
      </AddNewItemWrapper>
      <SearchControls>
        <SearchInput
          value={params?.userName}
          onChange={(e) => updateParams({ userName: e.target.value })}
          placeholder="Search By User Name"
        />
        <SelectRole
          value={params?.groups}
          onChange={(e) => updateParams({ groups: e.target.value })}
        >
          <option value="">Select Role</option>
          <option value="1">Super Admin</option>
          <option value="2">System User</option>
          <option value="">All</option>
        </SelectRole>
      </SearchControls>
      <Table>
        <Header>
          <div>Avatar</div>
          <div>User Name</div>
          <div>Role</div>
          <div>Actions</div>
        </Header>
        {users.length > 0 && (
          <Body>
            {users.map((user) => (
              <Row key={user.id}>
                <ImageWrapper>
                  {user.imagePath ? (
                    <img
                      src={`https://upskilling-egypt.com/${user.imagePath}`}
                    />
                  ) : (
                    <RegularUser />
                  )}
                </ImageWrapper>
                <div>{user.userName}</div>
                <div>
                  {user.group.name == "SystemUser"
                    ? "System User"
                    : "Super Admin"}
                </div>
                <ActionsWrapper>
                  <ViewUserDialog user={user} />
                  {user.group.name === "SystemUser" ? (
                    <DeleteUserDialog id={user.id} itemName="user" />
                  ) : (
                    ""
                  )}
                </ActionsWrapper>
              </Row>
            ))}
          </Body>
        )}
        {users.length == 0 && <NoData />}
        <Footer>
          <Pagination>
            {range(1, +totalNumberOfPages + 1).map((i) => (
              <Page
                onClick={() => updateParams({ pageNumber: i })}
                disabled={params.pageNumber == i}
                style={{
                  backgroundColor:
                    params.pageNumber == i ? "var(--green-600)" : null,
                }}
                key={i}
              >
                {i}
              </Page>
            ))}
          </Pagination>
          <PageSize
            type="number"
            placeholder="Enter Page Size"
            value={params.pageSize}
            onChange={(e) => updateParams({ pageSize: e.target.value })}
          ></PageSize>
        </Footer>
      </Table>
    </Wrapper>
  );
}

const Wrapper = styled.div``;
const AddNewItemWrapper = styled.div`
  font-family: Roboto;
  padding-inline: var(--spacing-160) var(--spacing-100);
  padding-block-end: var(--spacing-100);
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
  }

  p {
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: 0.04rem;
  }
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
  flex-grow: 5;

  &:focus {
    outline: 2px solid var(--green-600);
    outline-offset: 2px;
  }
`;
const SelectRole = styled.select`
  padding-inline: var(--spacing-30);
  padding-block: var(--spacing-20);
  flex-grow: 3;
  border: 1px solid var(--green-300);
  border-radius: 0.5rem;
  &:focus {
    outline: 2px solid var(--green-600);
    outline-offset: 2px;
  }
`;
const Table = styled.div``;
const Header = styled.div`
  background: var(--green-200);
  padding-inline: var(--spacing-160);
  padding-block: var(--spacing-80);
  /* border-top-left-radius: 1rem;
  border-top-right-radius: 1rem; */
  border-radius: 1rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  font-style: normal;
  font-weight: 700;
  text-transform: uppercase;
`;
const Body = styled.div`
  & > div:nth-child(even) {
    background: var(--green-100);
  }
`;
const Row = styled.div`
  padding-inline: var(--spacing-160);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
  padding-block: var(--spacing-30);
`;

const ImageWrapper = styled.div`
  width: 5rem;
  height: 5rem;
  font-size: 5rem;
  color: var(--grey-400);
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
    border-radius: 50%;
    border: 3px solid var(--grey-200);
    transition: transform 300ms ease-in-out;
    &:hover {
      transform: scale(2);
    }
  }
`;

const ActionsWrapper = styled.div`
  display: flex;
  gap: 2rem;
`;

const Footer = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Pagination = styled.div`
  margin-block-start: var(--spacing-40);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-20);
`;
const PageSize = styled.input`
  color: var(--grey-100);
  font-weight: 700;
  width: 10rem;
  background: var(--green-300);
  padding-inline: 0.5rem;
  padding-block: 0.2rem;

  &::placeholder {
    color: var(--grey-800);
  }
`;
const Page = styled.button`
  color: var(--grey-100);
  padding-inline: 0.5rem;

  background: var(--green-500);
  border-radius: 0.2rem;
  cursor: pointer;
  transition: all 300ms ease-in-out;
  &:hover {
    background: var(--green-600);
  }
`;

export default Users;
