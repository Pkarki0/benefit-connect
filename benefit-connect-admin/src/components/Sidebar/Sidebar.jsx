/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const Sidebar = () => {
  const { url, token, setToken } = useContext(AppContext);

  return (
    token && (
      <div className="w-40 min-h-screen border-r border-gray-300 bg-gray-100">
        <div className="pt-12 pl-4">
          <NavLink
            to="/benefit-list"
            className={({ isActive }) =>
              `flex items-center gap-4 p-2 rounded-l-lg hover:bg-gray-600 border-l border-t border-b border-gray-600 mb-2 shadow-lg ${
                isActive ? "bg-gray-800 text-white" : "text-black"
              }`
            }
          >
            <p className="text-lg font-medium">Benefit Lists</p>
          </NavLink>

          <NavLink
            to="/user-list"
            className={({ isActive }) =>
              `flex items-center gap-4 p-2 rounded-l-lg hover:bg-gray-600 border-l border-t border-b border-gray-600 mb-2 shadow-lg ${
                isActive ? "bg-gray-800 text-white" : "text-black"
              }`
            }
          >
            <p className="text-lg font-medium">Users</p>
          </NavLink>
        </div>
      </div>
    )
  );
};

export default Sidebar;
