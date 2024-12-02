/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import logo from "../assets/logo.png";
import { AppContext } from "../context/AppContext";

export default function Signup() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const {
    url,
    token,
    setToken,
    setIsAuthenticated,
    setHasFilledEligibilityForm,
    setEmail,
  } = useContext(AppContext);
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const name = e.target.id;
    const value = e.target.value;
    setFormData((data) => ({ ...formData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.fullname ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setErrorMessage("All fields are required");
      return;
    }

    if (formData.password != formData.confirmPassword) {
      setErrorMessage("Password and Confirm Password should match");
      return;
    }

    try {
      const { confirmPassword, ...bodyData } = formData;

      const res = await fetch(url + "/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      const jsonData = await res.json();

      if (jsonData.status === "error") {
        return setErrorMessage(jsonData.message);
      }
      if (jsonData.status == "success") {
        localStorage.setItem("token-client", jsonData.data.token);
        localStorage.setItem("email-client", jsonData.data.email);
        localStorage.setItem("isAuthenticated", true);
        localStorage.setItem(
          "hasFilledEligibilityForm",
          jsonData.data.hasFilledEligibilityForm
        );

        setToken(jsonData.data.token);
        setIsAuthenticated(true);
        setEmail(jsonData.data.email);
        setHasFilledEligibilityForm(jsonData.data.hasFilledEligibilityForm);
        navigate("/dashboard");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return !token ? (
    <div className="min-h-screen pt-36">
      <div className="flex p-3 max-w-5xl mx-auto flex-col md:flex-row md:items-center gap-24">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className="font-bold text-4xl">
            <div className="flex items-center gap-2 flex-col">
              <img src={logo} alt="logo" className="w-fit rounded-full" />
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

        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {errorMessage && (
              <div className="mt-5 text-red-600">{errorMessage}</div>
            )}
            <div className="mb-4">
              <label
                htmlFor="fullname"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Full Name
              </label>
              <input
                type="FullName"
                id="fullname"
                name="FullName"
                className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600  dark:text-black dark:placeholder-gray-400
								dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                placeholder="Enter your full name"
                required
                onChange={onChangeHandler}
                value={formData.fullname}
              />
            </div>

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
                name="Email"
                className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600  dark:text-black dark:placeholder-gray-400
								dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                placeholder="Enter your Email"
                required
                onChange={onChangeHandler}
                value={formData.email}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="Password"
                className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:text-black dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                placeholder="Enter your Password"
                required
                onChange={onChangeHandler}
                value={formData.password}
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="ConfirmPassword"
                className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:text-black dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                placeholder="Confirm your password"
                required
                onChange={onChangeHandler}
                value={formData.confirmPassword}
              />
            </div>

            <button
              type="submit"
              className="group flex items-center justify-center p-2 text-center font-medium relative focus:z-10 focus:outline-none text-white bg-gradient-to-r from-green-500 to-blue-500 enabled:hover:bg-gradient-to-l focus:ring-purple-200 dark:focus:ring-purple-800 rounded-lg focus:ring-2"
            >
              Sign Up
            </button>
          </form>
          <div className="flex gap-2 text-sm mt-4 mb-6">
            <span>Have an account?</span>
            <Link to="/signin" className="text-blue-500">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  ) : (
    navigate("/")
  );
}
