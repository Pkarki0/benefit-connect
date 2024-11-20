/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import EligibilityForm from "./Forms/EligibilityForm";

const Overview = () => {
  const { url, token, setToken } = useContext(AppContext);

  return (
    <div className="min-h-screen">
      <EligibilityForm />
    </div>
  );
};

export default Overview;
