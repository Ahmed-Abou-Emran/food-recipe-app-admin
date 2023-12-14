import React from "react";
import { jwtDecode } from "jwt-decode";
import { usersURL } from "../services/END_POINTS";
import axios from "axios";
export const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = React.useState(null);
  const adminToken = localStorage.getItem("adminToken");

  React.useEffect(() => {
    const getCurrentUserData = () => {
      axios
        .get(`${usersURL}/currentUser`, {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        })
        .then((response) => {
          setUserData(response?.data);
        })
        .catch((error) => {});
    };

    getCurrentUserData();

    if (adminToken) {
      const decodedToken = jwtDecode(adminToken);
      setUserData(decodedToken);
    }
  }, [adminToken]);

  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
