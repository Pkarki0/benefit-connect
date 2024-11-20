import { useContext, useEffect, useState } from "react";
import Search from "./Search";
import { AppContext } from "../../context/AppContext";
import images from "../../images";
import SupportCard from "../SupportCard";
import { ThreeDots } from "react-loader-spinner";

const AllBenefits = () => {
  const { url } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [benefits, setBenefits] = useState([]);

  useEffect(() => {
    const fetchBenefits = async () => {
      try {
        const response = await fetch(url + "/api/benefit/getAllBenefits");
        if (response.ok) {
          const data = await response.json();
          const benefits = data.data;
          setBenefits(benefits);
          setLoading(false);
        } else {
          console.error("Failed to fetch data:", response.statusText);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching benefits:", error);
        setLoading(false);
      }
    };

    fetchBenefits();
  }, []);

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
    <div className="min-h-screen">
      <Search setBenefits={setBenefits} />
      <div className="flex flex-wrap justify-center gap-8 m-4 p-4 mb-16">
        {benefits.length > 0 &&
          benefits.map((benefit, index) => (
            <SupportCard
              key={benefit._id}
              benefit={benefit}
              image={images[index]}
            />
          ))}
      </div>
    </div>
  );
};

export default AllBenefits;
