import "./index.css";
import Footer from "./components/Footer";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AppContext } from "./context/AppContext";
import Header from "./components/Header";
import Website from "./pages/Website";
import UserDashboard from "./pages/UserDashboard";
import { jwtDecode } from "jwt-decode";

// App Component
function App() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AppContext);

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token-client");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          alert("Your session has expired. Please log in again.");
          localStorage.removeItem("token-client");
          localStorage.removeItem("email-client");
          localStorage.removeItem("isAuthenticated");

          setIsAuthenticated(false);
          navigate("/signin");
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token-client");
        localStorage.removeItem("email-client");
        localStorage.removeItem("isAuthenticated");
        setIsAuthenticated(false);
        navigate("/");
      }
    } else {
      setIsAuthenticated(false);
    }
  }, [setIsAuthenticated, navigate]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="*" element={<Website />} />
        <Route
          path="/dashboard/*"
          element={isAuthenticated ? <UserDashboard /> : <Navigate to="/" />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
