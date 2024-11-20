import SupportCard from "./SupportCard";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import images from "../images";
const Benefits = () => {
  const { url } = useContext(AppContext);

  const [benefits, setBenefits] = useState([]);

  useEffect(() => {
    const fetchBenefits = async () => {
      try {
        const response = await fetch(url + "/api/benefit/getAllBenefits");
        if (response.ok) {
          const data = await response.json();
          const benefits = data.data;
          const showBenefits = benefits?.slice(0, 6);
          setBenefits(showBenefits);
        }
      } catch (error) {
        console.error("Error fetching benefits:", error);
      }
    };

    fetchBenefits();
  });

  if (benefits.length == 0) {
    return <div className="pt-40 min-h-screen">Loading data...</div>;
  }

  return (
    <>
      <div className="min-h-screen pt-8">
        <div className="text-2xl pt-28 font-semibold text-center">
          Not sure where to start? Use one of our helpful starting points below
          or Sign In to know your eligible benefits
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {benefits.map((benefit, index) => (
            <SupportCard
              key={benefit._id}
              benefit={benefit}
              image={images[index]}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Benefits;
