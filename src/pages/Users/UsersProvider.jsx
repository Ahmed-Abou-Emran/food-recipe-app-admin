import React from "react";
import { usersURL } from "../../services/END_POINTS";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export const UsersContext = React.createContext();

const UsersProvider = ({ children }) => {
  const [users, setUsers] = React.useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [params, setParams] = React.useState({
    pageSize: searchParams.get("pageSize") || 5,
    pageNumber: searchParams.get("pageNumber") || 1,
    userName: searchParams.get("userName") || "",
    groups: searchParams.get("groups") || "",
  });

  console.log(searchParams);
  console.log([...searchParams]);

  const updateParams = ({
    userName = params.userName,
    groups = params.groups,
    pageNumber = params.pageNumber,
    pageSize = params.pageSize,
  }) => {
    const NewParams = { ...params, userName, groups, pageNumber, pageSize };
    setParams(NewParams);
    setSearchParams(NewParams);
  };

  return (
    <UsersContext.Provider value={{ updateParams, params, users, setUsers }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUpdateParams = () => {
  const { params, updateParams } = React.useContext(UsersContext);

  console.log(params);
  return [params, updateParams];
};

export const useUsers = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { updateParams, params, users, setUsers } =
    React.useContext(UsersContext);
  const [totalNumberOfPages, setTotalNumberOfPages] = React.useState();

  const getUsers = () => {
    setIsLoading(true);
    axios
      .get(`${usersURL}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        params,
      })
      .then((response) => {
        console.log(response);
        const NewUsers = response?.data?.data;
        const NewTotalNumberOfPages = response?.data?.totalNumberOfPages;
        console.log(NewTotalNumberOfPages);
        setTotalNumberOfPages(NewTotalNumberOfPages);
        setUsers(NewUsers);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const refetchUsers = () => {
    updateParams(params);
  };
  React.useEffect(() => {
    getUsers();
  }, [params]);
  return { users, totalNumberOfPages, refetchUsers, isLoading };
};
export default UsersProvider;
