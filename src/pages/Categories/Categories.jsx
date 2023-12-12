import React from "react";
import styled from "styled-components";
import { range } from "../../utils/helpers";
import { FaRegEdit as Edit } from "react-icons/fa";
import {
  AddCategoryDialog,
  DeleteCategoryDialog,
  UpdateCategoryDialog,
} from "./CategoriesDialogs";
import { useCategories, useUpdateParams } from "./hooks";

function Categories() {
  const { categories, totalNumberOfPages, refetchCategories } = useCategories();
  const [params, updateParams] = useUpdateParams();

  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [currentCategory, setCurrentCategory] = React.useState(null);

  const onEditHandler = (id) => {
    categories.forEach((category) => {
      if (category.id === id) setCurrentCategory(category);
    });
    setOpenEdit(true);
    console.log(currentCategory);
  };

  const handlePageClick = (e) => {
    updateParams({ name: e.target.value });
  };

  return (
    <Wrapper>
      <AddNewItemWrapper>
        <Left>
          <h3>Categories Table Details</h3>
          <p>You can check all details</p>
        </Left>
        <Right>
          <AddButton onClick={() => setOpenAdd(true)}>
            Add New Category
          </AddButton>
          <AddCategoryDialog
            refetchCategories={refetchCategories}
            open={openAdd}
            setOpen={setOpenAdd}
          />
        </Right>
      </AddNewItemWrapper>
      <SearchControls>
        <SearchInput
          value={params?.name}
          onChange={handlePageClick}
          placeholder="Search By Category Name"
        />
      </SearchControls>
      <Table>
        <Header>
          <div>Name</div>
          <div>Actions</div>
        </Header>
        <Body>
          <UpdateCategoryDialog
            refetchCategories={refetchCategories}
            key={currentCategory?.id}
            open={openEdit}
            setOpen={setOpenEdit}
            id={currentCategory?.id}
            name={currentCategory?.name}
          />
          {categories.map(({ id, name }) => (
            <Row key={id}>
              <span>{name}</span>
              <ActionsWrapper>
                <ActionTrigger onClick={() => onEditHandler(id)}>
                  <Edit />
                </ActionTrigger>
                <DeleteCategoryDialog
                  refetchCategories={refetchCategories}
                  id={id}
                  name={name}
                />
              </ActionsWrapper>
            </Row>
          ))}
        </Body>
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
const Right = styled.div``;
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
const AddButton = styled.button`
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
  border: none;
  transition: background-color 300ms ease-in-out;
  &:hover {
    cursor: pointer;

    background-color: var(--green-500);
  }
`;
const ActionsWrapper = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const ActionTrigger = styled.button`
  color: var(--grey-600);
  transition: all 300ms ease-in-out;
  &:focus,
  &:hover {
    color: var(--grey-800);
    transform: scale(2);
    outline: none;
  }
  svg {
    font-size: 1.5rem;
  }
  border: none;
  background: none;
  cursor: pointer;
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

const Table = styled.div``;
const Header = styled.div`
  background: var(--green-200);
  padding-inline: var(--spacing-160);
  padding-block: var(--spacing-80);
  border-radius: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;

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
  grid-template-columns: 1fr 1fr;
  padding-block: var(--spacing-30);
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

export default Categories;
