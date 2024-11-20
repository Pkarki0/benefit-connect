import { useContext } from "react";
import Overview from "./Overview";
import { AppContext } from "../../context/AppContext";
import EligibleBenefits from "./EligibleBenefits";

const Dashboard = () => {
  const { hasFilledEligibilityForm } = useContext(AppContext);
  console.log(hasFilledEligibilityForm);
  return (
    <div className="min-h-screen">
      {hasFilledEligibilityForm ? <EligibleBenefits /> : <Overview />}
    </div>
  );
};

export default Dashboard;
