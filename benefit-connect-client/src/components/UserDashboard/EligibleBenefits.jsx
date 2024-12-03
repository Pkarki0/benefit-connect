import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { ThreeDots } from "react-loader-spinner";
import EligibileBenefitCard from "./EligibileBenefitCard";
import images from "../../images";

const EligibleBenefits = () => {
  const [userEligibleBenefits, setUserEligibleBenefits] = useState([]);
  const { token, url, hasFilledEligibilityForm } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  const fetchUserEligibleBenefits = async () => {
    try {
      const response = await fetch(
        `${url}/api/user/getAllUserEligibleBenefits`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        const benefits = data.data;
        console.log(benefits);

        setUserEligibleBenefits(benefits.eligibleBenefits);

        setLoading(false);
      } else {
        console.error("Failed to fetch data:", response.statusText);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching user benefit information:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserEligibleBenefits();
    } else {
      setLoading(false);
    }
  }, [token]);

  const checkForUserEligibility = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${url}/api/user/checkForUserEligibility`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });
      if (response.ok) {
        const data = await response.json();
        const benefits = data.data;
        setUserEligibleBenefits(benefits);
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } else {
        console.error("Failed to fetch data:", response.statusText);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching user benefit information:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ThreeDots
          height="80"
          width="80"
          color="#3498db"
          ariaLabel="loading-indicator"
          visible={true}
        />
      </div>
    );
  }
  console.log("Data:", userEligibleBenefits);

  return (
    <div className="min-h-screen pt-4 flex flex-col">
      <div className="text-2xl font-semibold mx-auto">
        You are eligible for all of the below benefits
      </div>
      <div className="flex flex-wrap justify-center gap-8 m-4 p-4 mb-16">
        {hasFilledEligibilityForm == "true" &&
        userEligibleBenefits.length > 0 ? (
          userEligibleBenefits.map((benefit, index) => (
            <EligibileBenefitCard
              key={benefit._id}
              benefit={benefit}
              image={images[index]}
            />
          ))
        ) : (
          <div className="text-center text-gray-500">
            <p>No eligible benefits found.</p>
            <button
              onClick={checkForUserEligibility}
              className="p-4 m-4 bg-green-600 rounded text-white shadow-lg"
            >
              Check for my eligible benefits
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EligibleBenefits;
