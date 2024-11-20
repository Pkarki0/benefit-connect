/* eslint-disable no-unused-vars */
import Sidebar from "../components/UserDashboard/Sidebar";
import { Outlet } from "react-router-dom";

const UserDashboard = () => {
  return (
    <div>
      <Sidebar />
      <div className="sm:ml-64">
        <div className="pt-32">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
