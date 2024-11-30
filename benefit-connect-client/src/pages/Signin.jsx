/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";

export default function Signin() {
  const [htmlFormData, sethtmlFormData] = useState({
    email: "",
    password: "",
  });

  const {
    url,
    token,
    setToken,
    setIsAuthenticated,
    email,
    setHasFilledEligibilityForm,
    setEmail,
  } = useContext(AppContext);
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    sethtmlFormData({ ...htmlFormData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newUrl = url + "/api/auth/signin";
    if (htmlFormData.email != "" && htmlFormData.password != "") {
      const response = await axios.post(newUrl, htmlFormData);
      console.log(response);
      if (response.status == 200) {
        localStorage.setItem("token-client", response.data.data.token);
        localStorage.setItem("email-client", response.data.data.email);
        localStorage.setItem("isAuthenticated", true);
        localStorage.setItem(
          "hasFilledEligibilityForm",
          response.data.data.hasFilledEligibilityForm
        );

        setToken(response.data.data.token);
        setIsAuthenticated(true);
        setEmail(response.data.data.email);
        setHasFilledEligibilityForm(
          response.data.data.hasFilledEligibilityForm
        );
        navigate("/dashboard");
      } else {
        alert("Invalid username or password! Please try again!");
        navigate("/signin");
      }
    }
  };
  return !token ? (
    <div className="min-h-screen pt-44 text-black">
      <div className="flex p-4 max-w-5xl mx-auto flex-col md:flex-row md:items-center gap-40">
        <div className="flex-1">
          <Link to="/" className="font-bold text-4xl">
            <div className="flex items-center gap-2">
              <img src={logo} alt="logo" className="w-48 rounded-full" />

              <div>
                <h2 className="text-lg font-bold text-black">
                  Benefit Connect
                </h2>
                <span className="text-xs italic text-black">
                  Explore Financial Benefits
                </span>
              </div>
            </div>
          </Link>
          <p className="text-sm mt-5">
            This is a demo project. You can sign in with your email and password
            or Google
          </p>
        </div>
        {/* right */}

        <div className="flex-1 text-black">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600  dark:text-black dark:placeholder-gray-400
								dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                placeholder="Enter your email"
                onChange={onChangeHandler}
                value={htmlFormData.email}
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:text-black dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                placeholder="Enter your password"
                onChange={onChangeHandler}
                value={htmlFormData.password}
                required
              />
            </div>

            <button
              type="submit"
              className="group flex items-center justify-center p-2 text-center font-medium relative focus:z-10 focus:outline-none text-white bg-gradient-to-r from-green-500 to-blue-500 enabled:hover:bg-gradient-to-l focus:ring-purple-200 dark:focus:ring-purple-800 rounded-lg focus:ring-2"
            >
              Sign In
            </button>
          </form>

          <div className="flex gap-2 text-sm mt-5">
            <span>Don&apos;t have an account?</span>
            <Link to="/signup" className="text-blue-500">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  ) : (
    navigate("/")
  );
}
