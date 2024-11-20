/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import parser from "html-react-parser";
import { Link } from "react-router-dom";

function truncateText(text, wordLimit) {
  const words = text.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return text;
}

const SupportCard = ({ benefit, image }) => {
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
        <a href="#">
          <h5 className="mb-2 text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-gray-900">
            {benefit.title}
          </h5>
        </a>
        <div className="mb-3 text-sm sm:text-base font-normal text-gray-700 tinymce-content">
          {parser(truncateText(benefit.description, 10))}
        </div>
        <Link
          to={`/benefit-details/${benefit._id}`}
          className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          View Full Details
        </Link>
      </div>
    </div>
  );
};

export default SupportCard;
