/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

export default function Header() {
  const {
    token,
    setToken,
    setIsAuthenticated,
    isAuthenticated,
    email,
    setEmail,
    setHasFilledEligibilityForm,
  } = useContext(AppContext);
  const navigate = useNavigate();

  function logoutHandler() {
    localStorage.removeItem("token-client");
    localStorage.removeItem("email-client");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("hasFilledEligibilityForm");

    setToken("");
    setIsAuthenticated(false);
    setEmail("");
    setHasFilledEligibilityForm(false);
    navigate("/signin");
  }

  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();

  return (
    <>
      <header className="flex shadow-md w-full py-4 px-4 sm:px-10 bg-gray-800 min-h-[70px] tracking-wide fixed z-50">
        <div className="flex flex-wrap items-center justify-between gap-5 lg:gap-16 w-full">
          <div className="flex items-center gap-2">
            <Link to="/">
              <img src={logo} alt="logo" className="w-24 rounded-full" />
            </Link>
            <div className="hidden lg:block">
              <h2 className="text-lg font-bold text-white">Benefit Connect</h2>
              <span className="text-xs italic text-white">
                Explore Financial Benefits
              </span>
            </div>
          </div>

          {/* Hamburger Menu */}
          <div
            className="relative xl:hidden"
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => setMenuOpen(false)}
          >
            <button className="text-white p-2 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            {menuOpen && (
              <div className="absolute top-full left-0 bg-white shadow-md rounded-md w-60">
                <ul className="space-y-3 p-4">
                  <li>
                    <Link
                      to="/"
                      className={`block font-semibold text-gray-700 hover:text-blue-500 ${
                        location.pathname === "/" ? "text-blue-500" : ""
                      }`}
                    >
                      Home
                    </Link>
                  </li>
                  {isAuthenticated && (
                    <li>
                      <Link
                        to="/benefits"
                        className={`block font-semibold text-gray-700 hover:text-blue-500 ${
                          location.pathname === "/benefits"
                            ? "text-blue-500"
                            : ""
                        }`}
                      >
                        Explore Benefits
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link
                      to="/about"
                      className={`block font-semibold text-gray-700 hover:text-blue-500 ${
                        location.pathname === "/about" ? "text-blue-500" : ""
                      }`}
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/disclaimer"
                      className={`block font-semibold text-gray-700 hover:text-blue-500 ${
                        location.pathname === "/disclaimer"
                          ? "text-blue-500"
                          : ""
                      }`}
                    >
                      Disclaimer
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className={`block font-semibold text-gray-700 hover:text-blue-500 ${
                        location.pathname === "/contact" ? "text-blue-500" : ""
                      }`}
                    >
                      Contact
                    </Link>
                  </li>
                  {isAuthenticated && (
                    <li>
                      <Link
                        to="/dashboard"
                        className={`block font-semibold text-gray-700 hover:text-blue-500 ${
                          location.pathname === "/dashboard"
                            ? "text-blue-500"
                            : ""
                        }`}
                      >
                        Dashboard
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>

          <div
            className={`hidden xl:flex w-auto flex-col lg:flex-row gap-5 lg:gap-8 items-center`}
          >
            <ul className="lg:flex gap-x-5">
              <li>
                <Link
                  to="/"
                  className={`hover:text-[#949faa] ${
                    location.pathname === "/" ? "text-[#02AEEF]" : "text-white"
                  } block font-semibold text-[15px]`}
                >
                  Home
                </Link>
              </li>
              {/* {isAuthenticated && (
                <li>
                  <Link
                    to="/benefits"
                    className={`hover:text-[#949faa] ${
                      location.pathname === "/benefits"
                        ? "text-[#02AEEF]"
                        : "text-white"
                    } block font-semibold text-[15px]`}
                  >
                    Explore Benefits
                  </Link>
                </li>
              )} */}
              <li>
                <Link
                  to="/about"
                  className={`hover:text-[#949faa] ${
                    location.pathname === "/about"
                      ? "text-[#02AEEF]"
                      : "text-white"
                  } block font-semibold text-[15px]`}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/disclaimer"
                  className={`hover:text-[#949faa] ${
                    location.pathname === "/disclaimer"
                      ? "text-[#02AEEF]"
                      : "text-white"
                  } block font-semibold text-[15px]`}
                >
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={`hover:text-[#949faa] ${
                    location.pathname === "/contact"
                      ? "text-[#02AEEF]"
                      : "text-white"
                  } block font-semibold text-[15px]`}
                >
                  Contact
                </Link>
              </li>
              {isAuthenticated && (
                <li>
                  <Link
                    to="/dashboard"
                    className={`hover:text-[#949faa] ${
                      location.pathname === "/dashboard"
                        ? "text-[#02AEEF]"
                        : "text-white"
                    } block font-semibold text-[15px]`}
                  >
                    Dashboard
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {!token ? (
            <div className="flex max-lg:ml-auto space-x-3">
              <Link
                to="/signin"
                className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-md group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
              >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Sign In
                </span>
              </Link>
            </div>
          ) : (
            <div className="flex max-lg:ml-auto space-x-3 gap-2 items-center">
              <div className="text-white">Welcome, {email}</div>
              <Link
                onClick={logoutHandler}
                className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-md group bg-gradient-to-br from-orange-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
              >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Logout
                </span>
              </Link>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
