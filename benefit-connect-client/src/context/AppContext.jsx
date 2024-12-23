/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext({});

const AppContextProvider = (props) => {
  const [token, setToken] = useState(
    () => localStorage.getItem("token-client") || ""
  );
  const [email, setEmail] = useState(
    () => localStorage.getItem("email-client") || ""
  );

  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("isAuthenticated") || false
  );
  const [hasFilledEligibilityForm, setHasFilledEligibilityForm] = useState(
    () => localStorage.getItem("hasFilledEligibilityForm") || false
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
    }
    loadData();
  }, [token, isAuthenticated, hasFilledEligibilityForm]);

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
