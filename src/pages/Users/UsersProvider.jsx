import React from "react";
import { usersURL } from "../../services/END_POINTS";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export const UsersContext = React.createContext();

const UsersProvider = ({ children }) => {
  let [searchParams, setSearchParams] = useSearchParams();

  console.log([...searchParams]);
  const [params, setParams] = React.useState({
    pageSize: searchParams.get("pageSize") || 5,
    pageNumber: searchParams.get("pageNumber") || 1,
    userName: searchParams.get("userName") || "",
    groups: searchParams.get("groups") || "",
  });
  const [users, setUsers] = React.useState([]);

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
  const { params, users, setUsers } = React.useContext(UsersContext);
  const [totalNumberOfPages, setTotalNumberOfPages] = React.useState();
  const getUsers = () => {
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
      });
  };

  React.useEffect(() => {
    getUsers();
  }, [params]);
  return { users, totalNumberOfPages };
};
export default UsersProvider;