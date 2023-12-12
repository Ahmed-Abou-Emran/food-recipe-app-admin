import React from "react";
import { useSearchParams } from "react-router-dom";

export const RecipesContext = React.createContext();

const RecipesProvider = ({ children }) => {
  const [recipes, setRecipes] = React.useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [params, setParams] = React.useState({
    pageSize: searchParams.get("pageSize") || 5,
    pageNumber: searchParams.get("pageNumber") || 1,
    name: searchParams.get("name") || "",
    categoryId: searchParams.get("categoryId") || "",
  });

  const updateParams = ({
    name = params?.name,
    categoryId = params?.categoryId,
    pageNumber = params?.pageNumber,
    pageSize = params?.pageSize,
  }) => {
    const newParams = { ...params, name, categoryId, pageNumber, pageSize };
    setParams(newParams);
    setSearchParams(newParams);
  };

  return (
    <RecipesContext.Provider
      value={{ updateParams, params, recipes, setRecipes }}
    >
      {children}
    </RecipesContext.Provider>
  );
};

export default RecipesProvider;
