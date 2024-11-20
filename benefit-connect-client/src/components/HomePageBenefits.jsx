import SupportCard from "./SupportCard";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import images from "../images";
const HomePageBenefits = () => {
  const { url, token } = useContext(AppContext);

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
  }, []);

  if (benefits.length == 0) {
    return <div className="pt-40 min-h-screen">Loading data...</div>;
  }

  return (
    <>
      <div>
        <div className="text-2xl pt-20 font-semibold text-center">
          Not sure where to start? Use one of our helpful starting points below{" "}
          <p>
            {!token && (
              <Link
                to="/benefits"
                className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-md group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800 mt-4"
              >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  See all benefits
                </span>
              </Link>
            )}
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-8 m-4 p-4 mb-16">
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

export default HomePageBenefits;
