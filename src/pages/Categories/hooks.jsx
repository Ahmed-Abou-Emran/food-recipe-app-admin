import React from "react";
import { CategoriesContext } from "./CategoriesProvider";
import { categoriesURL } from "../../services/END_POINTS";
import axios from "axios";

export const useUpdateParams = () => {
  const { params, updateParams } = React.useContext(CategoriesContext);
  console.log(params);
  return [params, updateParams];
};

export const useCategories = () => {
  const { params, updateParams, categories, setCategories } =
    React.useContext(CategoriesContext);
  const [totalNumberOfPages, setTotalNumberOfPages] = React.useState();

  const refetchCategories = () => {
    updateParams(params);
  };
  React.useEffect(() => {
    const getCategories = () => {
      axios
        .get(`${categoriesURL}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
          params,
        })
        .then((response) => {
          console.log(response);
          const newCategories = response?.data?.data;
          const newTotalNumberOfPages = response?.data?.totalNumberOfPages;
          console.log(newTotalNumberOfPages);
          setTotalNumberOfPages(newTotalNumberOfPages);
          setCategories(newCategories);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getCategories();
  }, [params]);
  return { categories, totalNumberOfPages, refetchCategories };
};
