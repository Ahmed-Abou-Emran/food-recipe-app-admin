import axios from "axios";
import { usersURLs } from "../../services/END_POINTS";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "../../hooks";

const getUsers = async (params) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = axios.get(usersURLs.getAllUsers, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const useUsers = (params) => {
  const debouncedParams = useDebounce(params);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["users", debouncedParams],
    queryFn: () => getUsers(debouncedParams),
  });

  // this contains users array, totalNumberOfPages, pageSize,
  const allData = data?.data;

  return {
    users: allData?.data,
    // params,
    totalNumberOfPages: allData?.totalNumberOfPages,
    isLoading,
    isError,
  };
};
