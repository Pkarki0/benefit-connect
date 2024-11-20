/* eslint-disable no-unused-vars */
import { assets } from "../../assets/assets";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { url, token, setToken, email, setEmail, setIsAuthenticated } =
    useContext(AppContext);
  console.log(email);

  const navigate = useNavigate();
  function logoutHandler() {
    localStorage.removeItem("token-admin");
    localStorage.removeItem("isAuthenticated-admin");
    localStorage.removeItem("email-admin");

    setToken("");
    setEmail("");
    setIsAuthenticated(false);
    navigate("/login");
  }
  return (
    token && (
      <div className="flex flex-wrap justify-between items-center py-2 px-4 bg-gray-100 shadow-md">
        {/* Left Section */}
        <div className="flex items-center gap-2 sm:gap-4">
          <img
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
            src={assets.profile_image}
            alt="Profile"
          />
          <span className="text-xs sm:text-sm font-medium text-gray-800">
            Welcome, {email}
          </span>
        </div>

        {/* Right Section */}
        <button
          onClick={logoutHandler}
          className="mt-2 sm:mt-0 px-3 py-2 sm:px-4 sm:py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
        >
          Sign Out
        </button>
      </div>
    )
  );
};

export default Navbar;
