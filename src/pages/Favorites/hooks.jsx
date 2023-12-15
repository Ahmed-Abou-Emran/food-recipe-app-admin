import React from "react";
import { favoriteRecipesURL, tagsURL } from "../../services/END_POINTS";
import axios from "axios";
import { FavoriteRecipesContext } from "./FavoritesProvider";

export const useUpdateParams = () => {
  const { params, updateParams } = React.useContext(FavoriteRecipesContext);
  return [params, updateParams];
};

export const useFavoriteRecipes = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { params, updateParams, recipes, setFavoriteRecipes } =
    React.useContext(FavoriteRecipesContext);
  const [totalNumberOfPages, setTotalNumberOfPages] = React.useState(null);
  const refetchRecipes = () => {
    updateParams(params);
  };
  React.useEffect(() => {
    const getFavoriteRecipes = () => {
      setIsLoading(true);
      axios
        .get(`${favoriteRecipesURL}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          params,
        })
        .then((response) => {
          const newFavoriteRecipes = response?.data?.data;
          const newTotalNumberOfPages = response?.data?.totalNumberOfPages;
          setTotalNumberOfPages(newTotalNumberOfPages);
          setFavoriteRecipes(newFavoriteRecipes);
        })
        .catch((error) => {})
        .finally(() => {
          setIsLoading(false);
        });
    };

    // getFavoriteRecipes();

    // to prevent sending unnecessary network requests to the backend
    const timerId = setTimeout(getFavoriteRecipes, 500);
    return () => clearTimeout(timerId);
  }, [params]);

  return {
    recipes,
    totalNumberOfPages,
    refetchRecipes,
    isLoading,
  };
};

export const useTags = () => {
  const [tags, setTags] = React.useState([]);
  const getTags = () => {
    axios
      .get(tagsURL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        const newTags = response?.data;
        setTags(newTags);
      })
      .catch((error) => {});
  };

  React.useEffect(() => {
    getTags();
  }, []);

  return [tags, setTags];
};
