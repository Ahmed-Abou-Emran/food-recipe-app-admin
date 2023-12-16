import React from "react";
import { jwtDecode } from "jwt-decode";
import { usersURL } from "../services/END_POINTS";
import axios from "axios";
export const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = React.useState(null);
  const [authToken, setAuthToken] = React.useState(() =>
    localStorage.getItem("authToken")
  );

  const loginHandler = (token) => {
    localStorage.setItem("authToken", token);
    setAuthToken(token);
  };
  const logOutHandler = () => {
    localStorage.removeItem("authToken");
    setAuthToken(null);
  };

  React.useEffect(() => {
    const getCurrentUserData = () => {
      axios
        .get(`${usersURL}/currentUser`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((response) => {
          console.log(response?.data);
          const resData = response?.data;
          setUserData({
            ...resData,
            userType: resData?.group?.name,
          });
        })
        .catch((error) => {});
    };

    if (authToken) getCurrentUserData();

    if (authToken) {
      const decodedToken = jwtDecode(authToken);
      setUserData(decodedToken);
    } else {
      setUserData(null);
    }
  }, [authToken]);

  return (
    <UserContext.Provider
      value={{ userData, setUserData, loginHandler, logOutHandler, authToken }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  let { userData, loginHandler, logOutHandler } = React.useContext(UserContext);

  return { userData, loginHandler, logOutHandler };
};

export default UserProvider;
