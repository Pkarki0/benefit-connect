/* eslint-disable no-unused-vars */
import Dashboard from "../components/UserDashboard/Dashboard";
import Sidebar from "../components/UserDashboard/Sidebar";
import { Outlet, Route, Routes } from "react-router-dom";
import UserBenefits from "../components/UserDashboard/UserBenefits";
import UserInformation from "../components/UserDashboard/UserInformation";
import AllBenefits from "../components/UserDashboard/AllBenefits";
import Inquiries from "./Inquiries";

const UserDashboard = () => {
  return (
    <div>
      <Sidebar />
      <div className="sm:ml-64">
        <div className="pt-32">
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="user-benefits" element={<UserBenefits />} />
            <Route path="user-information" element={<UserInformation />} />
            <Route path="all-benefits" element={<AllBenefits />} />
            <Route path="inquiries" element={<Inquiries />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
