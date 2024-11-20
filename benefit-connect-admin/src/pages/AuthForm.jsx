/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    userType: "admin",
  });

  const { url, setToken, setEmail, setIsAuthenticated } =
    useContext(AppContext);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      isSignUp & (!formData.fullname || !formData.email || !formData.password)
    ) {
      alert("All fields are required");
      return;
    }
    const endpoint = isSignUp
      ? url + "/api/auth/signup"
      : url + "/api/auth/adminSignIn";

    try {
      console.log(endpoint);
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log(result);
      if (result.status == "success") {
        setToken(result.data.token);
        setEmail(result.data.email);
        setIsAuthenticated(true);
        localStorage.setItem("token-admin", result.data.token);
        localStorage.setItem("email-admin", result.data.email);
        localStorage.setItem("isAuthenticated-admin", true);

        navigate("/benefit-list");
      } else {
        alert(result.message);
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="flex flex-auto items-center justify-center min-h-min mt-40">
      <div className=" bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h2>
        <div className="flex justify-center mt-4">
          <button
            className={`px-4 py-2 font-semibold ${
              !isSignUp
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => setIsSignUp(false)}
          >
            Sign In
          </button>
          <button
            className={`ml-4 px-4 py-2 font-semibold ${
              isSignUp
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => setIsSignUp(true)}
          >
            Sign Up
          </button>
        </div>
        <form onSubmit={handleSubmit} className="mt-6">
          {isSignUp && (
            <div className="mb-4">
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
