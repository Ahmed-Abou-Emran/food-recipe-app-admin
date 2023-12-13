import React from "react";
import styled from "styled-components";
import { formatCurrency, range } from "../../utils/helpers";
import { IoFastFoodOutline as RecipesIcon } from "react-icons/io5";
import { FaRegEdit as Edit } from "react-icons/fa";
import {
  GrCaretNext as Next,
  GrCaretPrevious as Previous,
} from "react-icons/gr";

import { useCategories } from "../Categories/hooks";
import { useUpdateParams, useRecipes, useTags } from "./hooks";
import {
  AddRecipeDialog,
  DeleteRecipeDialog,
  UpdateRecipeDialog,
} from "./RecipesDialogs";
import { NoData, Loader } from "../../ui";

function Recipes() {
  const {
    recipes,
    totalNumberOfPages,
    refetchRecipes,
    isLoading: isLoadingRecipes,
  } = useRecipes();
  const { categories } = useCategories();
  const [tags] = useTags();
  const [params, updateParams] = useUpdateParams();

  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [currentRecipe, setCurrentRecipe] = React.useState({});

  const onEditHandler = (id) => {
    recipes.forEach((recipe) => {
      if (recipe.id === id) setCurrentRecipe(recipe);
    });
    setOpenEdit(true);
    console.log(currentRecipe);
  };

  return (
    <Wrapper>
      <AddNewItemWrapper>
        <Left>
          <h3>Recipes Table Details</h3>
          <p>You can check all details</p>
        </Left>
        <Right>
          <AddButton onClick={() => setOpenAdd(true)}>Add New Recipe</AddButton>
          {openAdd && (
            <AddRecipeDialog
              refetchRecipes={refetchRecipes}
              tags={tags}
              categories={categories}
              open={openAdd}
              setOpen={setOpenAdd}
            />
          )}
        </Right>
      </AddNewItemWrapper>

      <SearchControls>
        <SearchInput
          value={params?.name}
          onChange={(e) =>
            updateParams({ pageNumber: 1, name: e.target.value })
          }
          placeholder="Search By Recipe Name"
        />

        <SelectCategory
          value={params.categoryId}
          onChange={(e) =>
            updateParams({ pageNumber: 1, categoryId: e.target.value })
          }
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </SelectCategory>
      </SearchControls>
      <Table>
        <Header>
          <div>Name</div>
          <div>Image</div>
          <div>Price</div>
          <div>Description</div>
          <div>Category</div>
          <div>tag</div>
          <div>Actions</div>
        </Header>
        <Body>
          {openEdit && (
            <UpdateRecipeDialog
              refetchRecipes={refetchRecipes}
              tags={tags}
              categories={categories}
              open={openEdit}
              setOpen={setOpenEdit}
              recipe={{ ...currentRecipe }}
            />
          )}
          {isLoadingRecipes && <Loader />}
          {!isLoadingRecipes && recipes.length == 0 && <NoData />}
          {!isLoadingRecipes &&
            recipes.length > 0 &&
            recipes.map((recipe) => {
              const { id, name, description, price, imagePath, category, tag } =
                recipe;
              return (
                <Row key={id}>
                  <div>{name}</div>
                  <ImageWrapper>
                    {imagePath ? (
                      <img src={`https://upskilling-egypt.com/${imagePath}`} />
                    ) : (
                      <RecipesIcon />
                    )}
                  </ImageWrapper>
                  <div>{formatCurrency(price)}</div>
                  <div>{description}</div>
                  <div>{category[0]?.name || "---"}</div>
                  <div>{tag?.name || "---"}</div>
                  <ActionsWrapper>
                    <ActionTrigger onClick={() => onEditHandler(id)}>
                      <Edit />
                    </ActionTrigger>
                    <DeleteRecipeDialog
                      refetchRecipes={refetchRecipes}
                      id={id}
                    />
                  </ActionsWrapper>
                </Row>
              );
            })}
        </Body>
        <Footer>
          <Pagination>
            <Page
              onClick={() =>
                updateParams({ pageNumber: +params.pageNumber - 1 })
              }
              disabled={params.pageNumber == 1 ? true : false}
              style={
                params.pageNumber == 1
                  ? {
                      backgroundColor: "var(--green-200)",
                      cursor: "not-allowed",
                    }
                  : { backgroundColor: "var(--green-300)", cursor: "pointer" }
              }
            >
              <Previous />
            </Page>
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
            <Page
              onClick={() =>
                updateParams({ pageNumber: +params.pageNumber + 1 })
              }
              disabled={params.pageNumber == totalNumberOfPages ? true : false}
              style={
                params.pageNumber == totalNumberOfPages
                  ? {
                      backgroundColor: "var(--green-200)",
                      cursor: "not-allowed",
                    }
                  : { backgroundColor: "var(--green-300)", cursor: "pointer" }
              }
            >
              <Next />
            </Page>
          </Pagination>
          <PageSize
            type="number"
            placeholder="Enter Page Size"
            value={params.pageSize}
            onChange={(e) =>
              updateParams({ pageNumber: 1, pageSize: e.target.value })
            }
          ></PageSize>
        </Footer>
      </Table>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

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

const SelectCategory = styled.select`
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

const Table = styled.div``;
const Header = styled.div`
  position: sticky;
  top: 0;
  background: var(--green-200);
  padding-inline: var(--spacing-160);
  padding-block: var(--spacing-80);
  border-radius: 1rem;
  display: grid;
  grid-template-columns: repeat(3, 1.2fr) 2.5fr repeat(3, 1.2fr);

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
  grid-template-columns: repeat(3, 1.2fr) 2.5fr repeat(3, 1.2fr);
  padding-block: var(--spacing-30);
  gap: 0.5rem;
  div {
    display: flex;
    align-items: center;
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
    border-radius: 5px;
    border: 3px solid var(--grey-200);
    transition: transform 300ms ease-in-out;
    &:hover {
      transform: scale(2.5);
    }
  }
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
  min-height: 2rem;
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
export default Recipes;
