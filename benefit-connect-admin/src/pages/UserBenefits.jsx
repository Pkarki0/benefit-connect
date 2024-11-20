/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import parse from "html-react-parser";
import { AppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import Dropdown from "../components/Dropdown.jsx/Dropdown";

const UserBenefits = () => {
  const [userBenefits, setUserBenefits] = useState({});
  const [user, setUser] = useState({});
  const { token, url } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [dropdownChange, setDropdownChange] = useState(false);

  function truncateText(text, wordLimit) {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  }
  const { userId } = useParams();

  // Handler to update dropdown value for a specific row
  const handleDropdownChange = async (benefitId, status) => {
    try {
      const response = await fetch(`${url}/api/user/changeUserBenefitStatus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({
          benefitUserId: userId,
          benefitId: benefitId,
          status: status,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data.data);
        setLoading(false);
        setDropdownChange(true);
      } else {
        console.error("Failed to fetch data:", response.statusText);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching user benefit information:", error);
      setLoading(false);
    }
  };

  const fetchUserBenefitsById = async () => {
    try {
      const response = await fetch(
        `${url}/api/user/getAllUserEligibleBenefitsByUserId/${userId}`,
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
        const userData = data.data;
        setUserBenefits(userData.eligibleBenefits);
        setUser({ fullname: userData?.fullname, email: userData?.email });
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
      fetchUserBenefitsById();
    } else {
      setLoading(false);
    }
    setDropdownChange(false);
    console.log(userBenefits);
  }, [token, dropdownChange]);

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
    <div className="min-h-screen overflow-x-auto px-8 py-8">
      <div className="my-4">
        Eligible Benefits for user:
        <span className="font-semibold text-lg mx-2">
          {user.fullname} ({user.email})
        </span>
      </div>
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
              <th className="px-6 py-4 text-center text-sm font-semibold tracking-wide">
                Change Status
              </th>
            </tr>
          </thead>
          <tbody>
            {userBenefits.length > 0 &&
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
                    {benefit.status ? benefit.status : "Not Applied"}
                  </td>
                  <td className="border-t border-b border-gray-200 px-6 py-4 text-sm text-center">
                    {/* <button
                      onClick={() => handleActionClick(benefit._id)}
                      className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 py-3 rounded-lg text-sm font-semibold shadow-md hover:shadow-xl transform hover:scale-105 transition-all ease-in-out duration-200 focus:outline-none"
                    >
                      Action
                    </button> */}
                    <Dropdown
                      value={benefit?.status}
                      onChange={(value) =>
                        handleDropdownChange(benefit._id, value)
                      }
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserBenefits;
