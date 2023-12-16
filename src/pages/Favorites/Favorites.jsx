import React from "react";
import styled from "styled-components";
import { useUserContext } from "../UserProvider";
import { useFavoriteRecipes, useTags, useUpdateParams } from "./hooks";
import { useCategories } from "../Categories/hooks";
import FavoriteItem from "./FavoriteItem";
import { Loader, NoData } from "../../ui";

const Favorites = () => {
  const { userData } = useUserContext();
  const {
    favoriteRecipes,
    totalNumberOfPages,
    refetchFavoriteRecipes,
    isLoading: isLoadingFavoriteRecipes,
  } = useFavoriteRecipes();
  const { categories } = useCategories();
  const [tags] = useTags();
  const [params, updateParams] = useUpdateParams();

  console.log(favoriteRecipes);
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
      {!isAdmin && (
        <>
          <SearchControls>
            <SearchInput
              // value={params?.name}
              // onChange={(e) =>
              //   updateParams({ pageNumber: 1, name: e.target.value })
              // }
              placeholder="Search By Recipe Name"
            />
            <SelectInput
            // value={params.categoryId}
            // onChange={(e) =>
            //   updateParams({ pageNumber: 1, categoryId: e.target.value })
            // }
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </SelectInput>
            <SelectInput
              value={params.tagId}
              onChange={(e) =>
                updateParams({ pageNumber: 1, tagId: e.target.value })
              }
            >
              <option value="">All Tags</option>
              {tags.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
            </SelectInput>
          </SearchControls>
          {/* {<Loader />} */}
          {favoriteRecipes.length == 0 && <NoData />}
          {favoriteRecipes.length > 0 && (
            <RecipesWrapper>
              {favoriteRecipes.map(({ id, recipe }) => (
                <FavoriteItem key={id} id={id} recipe={recipe} />
              ))}
            </RecipesWrapper>
          )}
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div``;
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

const RecipesWrapper = styled.div`
  padding-inline: var(--spacing-160);
  padding-block: var(--spacing-80);
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(min(15rem, 100%), 1fr));
`;
export default Favorites;
