/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext({});

const AppContextProvider = (props) => {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const url = "http://localhost:4000";

  useEffect(() => {
    async function loadData() {
      if (localStorage.getItem("token-admin")) {
        const jwtToken = localStorage.getItem("token-admin");
        const email = localStorage.getItem("email-admin");

        setIsAuthenticated(true);
        setToken(jwtToken);
        setEmail(email);
      }
    }
    loadData();
  }, [token, isAuthenticated]);

  const contextValue = {
    url,
    token,
    setToken,
    email,
    setEmail,
    isAuthenticated,
    setIsAuthenticated,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
