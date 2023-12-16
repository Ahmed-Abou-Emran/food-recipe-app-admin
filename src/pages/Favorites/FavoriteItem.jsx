import React from "react";
import styled from "styled-components";
import { FiHeart as Heart } from "react-icons/fi";
import { DefaultFood } from "../../assets";
import axios from "axios";
import { favoriteRecipesURL } from "../../services/END_POINTS";
import { toast } from "react-hot-toast";
import { useFavoriteRecipes } from "./hooks";
import { formatCurrency } from "../../utils/helpers";

const FavoriteItem = ({ recipe, id }) => {
  const { refetchFavoriteRecipes } = useFavoriteRecipes();
  const deleteFavorite = () => {
    axios
      .delete(
        `${favoriteRecipesURL}/${id}`,
        // { id: id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      )
      .then((response) => {
        toast.success(
          response?.data?.message || "The recipe is deleted from favorites"
        );
        refetchFavoriteRecipes();
      })
      .catch((error) => {
        toast.error(
          error?.data?.data?.message ||
            "Something Went wrong, Unable to delete the recipe from favorites"
        );
      });
  };
  return (
    <Wrapper>
      <ImageWrapper>
        <img
          src={
            recipe.imagePath
              ? `https://upskilling-egypt.com/${recipe.imagePath}`
              : DefaultFood
          }
        />
      </ImageWrapper>
      <Details>
        <Name>{recipe.name}</Name>
        <Labels>
          <Category>{recipe?.category[0]?.name}</Category>
          <Tag>{recipe?.tag.name}</Tag>
        </Labels>
        <Description>{recipe.description}</Description>
        <Currency>{formatCurrency(recipe.price)}</Currency>
        <ActionWrapper>
          <ActionTrigger onClick={() => deleteFavorite(id)}>
            <Heart />
          </ActionTrigger>
        </ActionWrapper>
      </Details>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  color: var(--grey-100);
  border-radius: 1rem;
  overflow: hidden;
  background: #1f263e;
  transition: all 300ms ease-in-out;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);

  button:has(svg) {
    opacity: 0;
    transform: translateX(5rem);
  }
  &:hover {
    transform: scale(1.02);
    button:has(svg) {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;
const ImageWrapper = styled.div`
  width: 100%;
  height: 8rem;
  border: 1px solid var(--grey-800);
  img {
    width: 100%;
    height: 100%;
    border-top-right-radius: 1rem;
    border-top-left-radius: 1rem;
    object-fit: cover;
    object-position: center;
  }
`;

const Details = styled.div`
  padding-inline: var(--spacing-40);
  padding-block: var(--spacing-50);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  min-height: 12rem;
`;

const Name = styled.div`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 1.3;
  border-bottom: 3px solid var(--grey-300);
  margin-block-end: var(--spacing-20);
`;
const Labels = styled.div`
  align-self: stretch;
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
`;
const Label = styled.div`
  padding-inline: 0.5rem;
  padding-block: 0.2rem;
  border-radius: 0.5rem;
  min-width: 5rem;
  display: flex;
  justify-content: center;
`;
const Category = styled(Label)`
  background: var(--green-500);
`;
const Tag = styled(Label)`
  background: var(--green-600);
`;

const Description = styled.div``;
const Currency = styled.div`
  color: var(--grey-300);
  font-size: 0.825rem;
  font-weight: 300;
`;
const ActionWrapper = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 0.5rem;
  margin-block-start: auto;
  align-self: stretch;
  display: flex;
  justify-content: flex-end;
`;

const ActionTrigger = styled.button`
  background: var(--green-100);
  border: none;
  border-radius: 0.5rem;
  padding: 0.2rem;
  margin-block-start: var(--spacing-20);
  margin-inline-end: var(--spacing-40);
  color: var(--grey-600);
  transition: all 300ms ease-in-out;
  cursor: pointer;
  &:focus,
  &:hover {
    transform: scale(1.2);
  }
  svg {
    font-size: 2rem;
    transition: all 300ms ease-in-out;
    stroke-width: 1px;
    fill: red;
    &:hover {
      color: var(--grey-800);
      /* transform: scale(2) rotate(2turn); */
      outline: none;
      fill: var(--grey-100);
    }
  }
`;

export default FavoriteItem;
