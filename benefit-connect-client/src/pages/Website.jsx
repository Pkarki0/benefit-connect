import Benefits from "../components/Benefits";
import Signin from "./Signin";
import Signup from "./Signup";
import { Route, Routes } from "react-router-dom";
import About from "./About";
import Disclaimer from "./Disclaimer";
import Contact from "./Contact";
import Home from "../components/Home";
import Error from "./Error";
import Sidebar from "../components/UserDashboard/Sidebar";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import BenefitDetails from "./BenefitDetails";
const Website = () => {
  const { token } = useContext(AppContext);

  return (
    <>
      {token && <Sidebar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/benefits" element={<Benefits />} />
        <Route
          path="/benefit-details/:benefitId"
          element={<BenefitDetails />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};

export default Website;
