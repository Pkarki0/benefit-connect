import Introduction from "../components/Introduction";
import Information from "../components/Information";
import HomePageBenefits from "../components/HomePageBenefits";
import AdditionalInformation from "../components/AdditionalInformation";
import Sidebar from "./UserDashboard/Sidebar";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Home = () => {
  const { token } = useContext(AppContext);
  return (
    <div className="pt-36">
      {token && <Sidebar />}
      <div className={token ? "sm:ml-64" : `w-full`}>
        <Introduction />
        <Information />
        <HomePageBenefits />
        <AdditionalInformation />
      </div>
    </div>
  );
};

export default Home;
