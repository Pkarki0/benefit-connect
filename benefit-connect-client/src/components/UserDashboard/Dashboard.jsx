import { useContext } from "react";
import Overview from "./Overview";
import { AppContext } from "../../context/AppContext";
import EligibleBenefits from "./EligibleBenefits";

const Dashboard = () => {
  const { hasFilledEligibilityForm } = useContext(AppContext);

  return (
    <div className="min-h-screen">
      {hasFilledEligibilityForm === "true" ? (
        <EligibleBenefits />
      ) : (
        <Overview />
      )}
    </div>
  );
};

export default Dashboard;
