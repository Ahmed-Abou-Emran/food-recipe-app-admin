import React from "react";
import { RecipesContext } from "./RecipesProvider";
import { recipesURL, tagsURL } from "../../services/END_POINTS";
import axios from "axios";

export const useUpdateParams = () => {
  const { params, updateParams } = React.useContext(RecipesContext);
  return [params, updateParams];
};

export const useRecipes = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { params, updateParams, recipes, setRecipes } =
    React.useContext(RecipesContext);
  const [totalNumberOfPages, setTotalNumberOfPages] = React.useState();
  const refetchRecipes = () => {
    updateParams(params);
  };
  React.useEffect(() => {
    const getRecipes = () => {
      setIsLoading(true);
      axios
        .get(`${recipesURL}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
          params,
        })
        .then((response) => {
          console.log({ recipes: response });
          const newRecipes = response?.data?.data;
          const newTotalNumberOfPages = response?.data?.totalNumberOfPages;
          setTotalNumberOfPages(newTotalNumberOfPages);
          setRecipes(newRecipes);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    // getRecipes();

    // to prevent sending unnecessary network requests to the backend
    const timerId = setTimeout(getRecipes, 500);
    return () => clearTimeout(timerId);
  }, [params]);

  return { recipes, totalNumberOfPages, refetchRecipes, isLoading };
};

export const useTags = () => {
  const [tags, setTags] = React.useState([]);
  const getTags = () => {
    axios
      .get(tagsURL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then((response) => {
        console.log({ tags: response?.data });
        const newTags = response?.data;
        setTags(newTags);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    getTags();
  }, []);

  return [tags, setTags];
};
