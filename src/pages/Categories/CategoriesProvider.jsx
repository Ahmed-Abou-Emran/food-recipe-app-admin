import React from "react";
import { useSearchParams } from "react-router-dom";

export const CategoriesContext = React.createContext();

const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = React.useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [params, setParams] = React.useState({
    pageSize: searchParams.get("pageSize") || 5,
    pageNumber: searchParams.get("pageNumber") || 1,
    name: searchParams.get("name") || "",
  });

  const updateParams = ({
    name = params?.name,
    pageNumber = params?.pageNumber,
    pageSize = params?.pageSize,
  }) => {
    const newParams = { ...params, name, pageNumber, pageSize };
    setParams(newParams);
    setSearchParams(newParams);
  };

  return (
    <CategoriesContext.Provider
      value={{ updateParams, params, categories, setCategories }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export default CategoriesProvider;
