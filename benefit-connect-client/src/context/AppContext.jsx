/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext({});

const AppContextProvider = (props) => {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");

  const [isAuthenticated, setIsAuthenticated] = useState(
    () => JSON.parse(localStorage.getItem("isAuthenticated")) || false
  );
  const [hasFilledEligibilityForm, setHasFilledEligibilityForm] = useState(
    () => JSON.parse(localStorage.getItem("hasFilledEligibilityForm")) || false
  );
  const url = "http://localhost:4000";

  useEffect(() => {
    async function loadData() {
      if (localStorage.getItem("token-client")) {
        const jwtToken = localStorage.getItem("token-client");
        const email = localStorage.getItem("email-client");
        const hasFilledEligibilityForm = localStorage.getItem(
          "hasFilledEligibilityForm"
        );
        setToken(jwtToken);
        setEmail(email);
        setHasFilledEligibilityForm(hasFilledEligibilityForm);
      }
      console.log(token);
    }
    loadData();
  }, [token, isAuthenticated]);

  const contextValue = {
    url,
    token,
    isAuthenticated,
    setIsAuthenticated,
    setToken,
    email,
    setEmail,
    hasFilledEligibilityForm,
    setHasFilledEligibilityForm,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
