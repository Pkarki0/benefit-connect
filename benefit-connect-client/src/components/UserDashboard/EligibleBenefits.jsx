import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { ThreeDots } from "react-loader-spinner";
import EligibileBenefitCard from "./EligibileBenefitCard";
import images from "../../images";

const EligibleBenefits = () => {
  const [userEligibleBenefits, setUserEligibleBenefits] = useState({});
  const { token, url } = useContext(AppContext);
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

    console.log(userEligibleBenefits);
  }, [token]);

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

  return (
    <div className="min-h-screen pt-4 flex flex-col">
      <div className="text-2xl font-semibold mx-auto">
        You are eligible for all of the below benefits
      </div>
      <div className="flex flex-wrap justify-center gap-8 m-4 p-4 mb-16">
        {userEligibleBenefits.length > 0 &&
          userEligibleBenefits.map((benefit, index) => (
            <EligibileBenefitCard
              key={benefit._id}
              benefit={benefit}
              image={images[index]}
            />
          ))}
      </div>
    </div>
  );
};

export default EligibleBenefits;
