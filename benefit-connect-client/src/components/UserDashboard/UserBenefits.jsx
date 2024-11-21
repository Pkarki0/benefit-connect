import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { ThreeDots } from "react-loader-spinner";
import parse from "html-react-parser";

const UserBenefits = () => {
  const [userBenefits, setUserBenefits] = useState({});
  const { token, url, hasFilledEligibilityForm } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  function truncateText(text, wordLimit) {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  }
  const fetchUserBenefits = async () => {
    try {
      const response = await fetch(
        `${url}/api/user/getAllUserAppliedBenefits`,
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
        console.log(data);
        const benefits = data.data;
        setUserBenefits(benefits);
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
      if (hasFilledEligibilityForm == "true") {
        fetchUserBenefits();
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }

    console.log(userBenefits);
  }, [token]);

  // const handleActionClick = (id) => {
  //   console.log(`Button clicked for row with id: ${id}`);
  // };

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
    <div className="min-h-screen overflow-x-auto px-8 py-2">
      <div className="overflow-hidden bg-white shadow-xl rounded-lg">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-blue-600 to-gray-800 text-white">
              <th className="px-6 py-4 text-left text-sm font-semibold tracking-wide">
                Title
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold tracking-wide">
                Description
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold tracking-wide">
                Immigration Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold tracking-wide">
                Employment Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold tracking-wide">
                Status
              </th>
              {/* <th className="px-6 py-4 text-center text-sm font-semibold tracking-wide">
                Action
              </th> */}
            </tr>
          </thead>
          <tbody>
            {userBenefits?.length > 0 &&
              userBenefits.map((benefit, index) => (
                <tr
                  key={benefit._id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100 transition-all ease-in-out duration-300 hover:shadow-lg`}
                >
                  <td className="border-t border-b border-gray-200 px-6 py-4 text-sm font-medium text-gray-700">
                    {benefit.title}
                  </td>
                  <td className="border-t border-b border-gray-200 px-6 py-4 text-sm font-medium text-gray-700">
                    {parse(truncateText(benefit.description, 12))}
                  </td>
                  <td className="border-t border-b border-gray-200 px-6 py-4 text-sm font-medium text-gray-700">
                    {benefit.immigrationStatus}
                  </td>
                  <td className="border-t border-b border-gray-200 px-6 py-4 text-sm font-medium text-gray-700">
                    {benefit.employmentStatus}
                  </td>
                  <td className="border-t border-b border-gray-200 px-6 py-4 text-sm font-medium text-gray-700">
                    {benefit.status ?? "No Status"}
                  </td>
                  {/* <td className="border-t border-b border-gray-200 px-6 py-4 text-sm text-center">
                    <button
                      onClick={() => handleActionClick(benefit._id)}
                      className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 py-3 rounded-lg text-sm font-semibold shadow-md hover:shadow-xl transform hover:scale-105 transition-all ease-in-out duration-200 focus:outline-none"
                    >
                      Action
                    </button>
                  </td> */}
                </tr>
              ))}
          </tbody>
        </table>
        {hasFilledEligibilityForm == "false" && (
          <div className="mx-auto p-4 m-2">
            Fill the eligibility form in the dashboard to get your eligible
            benefits. If you are eligible for the benefits, apply for the
            benefit to be visible and view your benefit status.
          </div>
        )}
      </div>
    </div>
  );
};

export default UserBenefits;
