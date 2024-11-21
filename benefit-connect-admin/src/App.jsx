import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import "react-toastify/dist/ReactToastify.css";
import BenefitForm from "./pages/BenefitForm";
import BenefitList from "./pages/BenefitList";
import AuthForm from "./pages/AuthForm";
import { useContext, useEffect } from "react";
import { AppContext } from "./context/AppContext";
import "./index.css";
import UserList from "./pages/UserList";
import UserBenefits from "./pages/UserBenefits";
import { jwtDecode } from "jwt-decode";

const App = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AppContext);
  const navigate = useNavigate();
  useEffect(() => {
    const tk = localStorage.getItem("token-admin");
    if (tk) {
      try {
        const decodedToken = jwtDecode(tk);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          alert("Your session has expired. Please log in again.");
          localStorage.removeItem("token-admin");
          localStorage.removeItem("email-admin");
          localStorage.removeItem("isAuthenticated-admin");
          setIsAuthenticated(false);

          navigate("/login");
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token-admin");
        localStorage.removeItem("email-admin");
        localStorage.removeItem("isAuthenticated-admin");
        setIsAuthenticated(false);
        navigate("/login");
      }
    } else {
      setIsAuthenticated(false);
    }
  }, [setIsAuthenticated, navigate]);
  return (
    <div>
      {isAuthenticated ? (
        <div>
          <Navbar />
          <hr />
          <div className="flex gap-8">
            <Sidebar />
            <Routes>
              <Route
                path="/add-benefit/:formType?/:benefitId?"
                element={<BenefitForm />}
              />
              <Route path="/benefit-list" element={<BenefitList />} />
              <Route path="/user-list" element={<UserList />} />
              <Route path="/user-benefits/:userId" element={<UserBenefits />} />

              <Route
                path="/"
                element={<Navigate to="/benefit-list" replace />}
              />
              <Route
                path="/login"
                element={<Navigate to="/benefit-list" replace />}
              />
            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<AuthForm />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
