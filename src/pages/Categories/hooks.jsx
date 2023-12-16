import React from "react";
import { CategoriesContext } from "./CategoriesProvider";
import { categoriesURL } from "../../services/END_POINTS";
import axios from "axios";

export const useUpdateParams = () => {
  const { params, updateParams } = React.useContext(CategoriesContext);

  return [params, updateParams];
};

export const useCategories = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { params, updateParams, categories, setCategories } =
    React.useContext(CategoriesContext);
  const [totalNumberOfPages, setTotalNumberOfPages] = React.useState();

  const refetchCategories = () => {
    updateParams(params);
  };
  React.useEffect(() => {
    const getCategories = () => {
      setIsLoading(true);
      axios
        .get(`${categoriesURL}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          params,
        })
        .then((response) => {
          const newCategories = response?.data?.data;
          const newTotalNumberOfPages = response?.data?.totalNumberOfPages;

          setTotalNumberOfPages(newTotalNumberOfPages);
          setCategories(newCategories);
        })
        .catch((error) => {})
        .finally(() => setIsLoading(false));
    };
    getCategories();
  }, [params]);
  return { categories, totalNumberOfPages, refetchCategories, isLoading };
};
