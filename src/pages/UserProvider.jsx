import React from "react";
import { jwtDecode } from "jwt-decode";

export const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = React.useState(null);
  const adminToken = localStorage.getItem("adminToken");

  React.useEffect(() => {
    if (adminToken) {
      const decodedToken = jwtDecode(adminToken);
      setUserData(decodedToken);
      console.log(decodedToken);
    }
  }, [adminToken]);

  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
