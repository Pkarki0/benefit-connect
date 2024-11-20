/* eslint-disable react/prop-types */
import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AppContext";

const ProtectedRoute = ({ Component, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default ProtectedRoute;
