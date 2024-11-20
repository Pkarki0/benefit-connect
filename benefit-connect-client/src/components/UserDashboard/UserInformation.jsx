import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { ThreeDots } from "react-loader-spinner";
function UserInformation() {
  const [userInformation, setUserInformation] = useState({});
  const { token, url } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  const fetchUserEligibilityInformation = async () => {
    try {
      const response = await fetch(
        `${url}/api/eligibility/getEligibilityByUserId`,
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
        setUserInformation(data.data);
        setLoading(false);
      } else {
        console.error("Failed to fetch data:", response.statusText);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching user eligibility information:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserEligibilityInformation();
    } else {
      setLoading(false);
    }
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
    <form className="max-w-5xl mx-auto p-8 space-y-6 bg-white shadow-lg rounded-lg min-h-screen mb-8">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-semibold text-gray-800">
          User Information
        </h2>
        <p className="text-gray-600">Review the details below</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { label: "Full Name", value: userInformation.fullName },
          { label: "Email", value: userInformation.email },
          { label: "Tax Filed", value: userInformation.isTaxFiled },
          {
            label: "Vision Care Required",
            value: userInformation.isVisionCareRequired,
          },
          {
            label: "Prescription Drug Costly",
            value: userInformation.isPrescriptionDrugCostly,
          },
          {
            label: "Employer Health Coverage",
            value: userInformation.employerHealthCoverage,
          },
          {
            label: "Diabetic or Surgery",
            value: userInformation.isDiabeticOrSurgery,
          },
          {
            label: "Citizenship Status",
            value: userInformation.citizenshipStatus,
          },
          { label: "Age", value: userInformation.age },
          {
            label: "Immigration Status",
            value: userInformation.immigrationStatus,
          },
          {
            label: "Employment Status",
            value: userInformation.employmentStatus?.join(" || "),
          },
          { label: "Income", value: userInformation.income },
          { label: "Family Size", value: userInformation.familySize },
          {
            label: "Care for Children Under 18",
            value: userInformation.careForChildrenUnder18,
          },
          { label: "Anyone Disabled", value: userInformation.isAnyoneDisable },
          { label: "Living Condition", value: userInformation.livingCondition },
          { label: "Pregnant", value: userInformation.isPregnant },
          { label: "Length of Stay", value: userInformation.lengthOfStay },
        ].map((field, index) => (
          <div key={index}>
            <label className="block text-sm font-medium text-gray-700">
              {field.label}
            </label>
            <input
              type="text"
              value={field.value || ""}
              disabled
              className="mt-2 block w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-600"
            />
          </div>
        ))}
      </div>
    </form>
  );
}

export default UserInformation;
