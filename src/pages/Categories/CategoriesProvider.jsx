import React from "react";
import { categoriesURL } from "../../services/END_POINTS";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

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

export const useUpdateParams = () => {
  const { params, updateParams } = React.useContext(CategoriesContext);
  console.log(params);
  return [params, updateParams];
};

export const useCategories = () => {
  const { params, updateParams, categories, setCategories } =
    React.useContext(CategoriesContext);
  const [totalNumberOfPages, setTotalNumberOfPages] = React.useState();
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
  const refetchCategories = () => {
    updateParams(params);
  };
  React.useEffect(() => {
    getCategories();
  }, [params]);
  return { categories, totalNumberOfPages, refetchCategories };
};

export default CategoriesProvider;
