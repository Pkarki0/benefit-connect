/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import parser from "html-react-parser";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const EligibileBenefitCard = ({ benefit, image }) => {
  const { url, token } = useContext(AppContext);
  const navigate = useNavigate();
  function truncateText(text, wordLimit) {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  }

  const handleBenefitApply = async (e) => {
    e.preventDefault();
    const userConfirmed = window.confirm(
      "Are you sure you want to apply for this benefit?"
    );

    if (!userConfirmed) {
      return;
    }
    try {
      const newUrl = url + "/api/user/applyUserEligibility";
      console.log(newUrl);

      const response = await fetch(newUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({ appliedBenefitId: benefit._id }),
      });

      console.log(response);

      if (response.ok) {
        alert("Benefit applied successfully!");
        navigate("/dashboard/user-benefits");
      } else {
        alert("Error applying benefit!");
      }
    } catch (error) {
      alert("An error occurred while submitting data");
    }
  };

  return (
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto sm:h-80 md:h-96 border border-gray-200 rounded-lg shadow-lg shadow-slate-400 bg-[#F4F2EF] dark:border-gray-700 p-4 hover:bg-slate-100 overflow-hidden">
      <div className="flex justify-center items-center">
        <img
          className="w-24 h-24 sm:w-32 sm:h-32 object-cover my-2"
          src={image}
          alt=""
        />
      </div>
      <div className="flex flex-col items-center p-5">
        <div>
          <h5 className="mb-2 text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-gray-900">
            {benefit.title}
          </h5>
        </div>
        <div className="mb-3 text-sm sm:text-base font-normal text-gray-700 tinymce-content">
          {parser(truncateText(benefit.description, 10))}
        </div>
        <div className="flex gap-4">
          <Link
            to={`/benefit-details/${benefit._id}`}
            className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            View Full Details
          </Link>

          <Link
            onClick={handleBenefitApply}
            className={`inline-block mt-4 px-4 py-2 rounded-md ${
              benefit?.isApplied
                ? "bg-gray-400 text-gray-200 cursor-not-allowed pointer-events-none"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            {benefit?.isApplied ? "Already Applied" : "Apply for Benefit"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EligibileBenefitCard;
