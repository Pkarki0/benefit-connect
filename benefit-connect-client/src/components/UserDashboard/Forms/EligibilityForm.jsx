/* eslint-disable no-unused-vars */
import { useState, useCallback, useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import { useNavigate } from "react-router-dom";
const steps = [
  {
    label: "Full Name",
    type: "text",
    name: "fullName",
    placeholder: "Enter your full name",
    required: true,
  },
  {
    label: "Email Address",
    type: "text",
    name: "email",
    placeholder: "Enter your email",
    required: true,
  },
  {
    label: "Are you up to date on filing your taxes?",
    type: "radio",
    name: "isTaxFiled",
    options: ["Yes", "No"],
    required: true,
  },
  {
    label: "Do you have vision care?",
    type: "radio",
    name: "isVisionCareRequired",
    options: ["Yes", "No"],
    required: true,
  },
  {
    label: "Is your prescription drug costs > $10k in a year?",
    type: "radio",
    name: "isPrescriptionDrugCostly",
    options: ["Yes", "No"],
    required: true,
  },
  {
    label: "Do you have a health insurance coverage from your employer?",
    type: "radio",
    name: "employerHealthCoverage",
    options: ["Yes", "No"],
    required: true,
  },
  {
    label: "Citizenship/Immigration Status",
    type: "radio",
    name: "immigrationStatus",
    options: [
      "US Citizen",
      "Permanent Resident",
      "Temporary Worker",
      "Student",
      "Other",
    ],
    required: true,
  },
  {
    label: "How old are you?",
    type: "radio",
    name: "age",
    options: [
      "<18",
      "18-20",
      "21-24",
      "25-29",
      "30-49",
      "50-54",
      "55-59",
      "60-64",
      "65-69",
      "70+",
    ],
    required: true,
  },
  {
    label:
      "Are you working? Where does your income come from? (Please check all that apply)",
    type: "checkbox",
    name: "employmentStatus",
    options: [
      "Employed, full-time",
      "Employed, part-time",
      "Unemployed",
      "Retired",
      "Student",
    ],
    required: true,
  },
  {
    label:
      "How much money does everyone in your household, together, make in one year?",
    type: "radio",
    name: "income",
    options: [
      "None",
      "Below $15K",
      "15,001-25,000",
      "25,001-35,000",
      "35,001-45,000",
      "45,001-55,000",
      "55,001-65,000",
      "65,001+",
    ],
    required: true,
  },
  {
    label: "Including yourself, how many people live in your home?",
    type: "radio",
    name: "familySize",
    options: ["1", "2", "3", "4", "5", "6", "7+"],
    required: true,
  },
  {
    label: "Do you care for any children under 18 years of age?",
    type: "radio",
    name: "careForChildrenUnder18",
    options: ["Yes", "No"],
    required: true,
  },
  {
    label: "Are you, or is anyone in your household, living with a disability?",
    type: "radio",
    name: "isAnyoneDisable",
    options: ["Yes", "No"],
    required: true,
  },
  {
    label: "Are you diabetic or had any surgery in the past 3 months?",
    type: "radio",
    name: "isDiabeticOrSurgery",
    options: ["Yes", "No"],
    required: true,
  },
  {
    label: "Where do you live?",
    type: "radio",
    name: "livingCondition",
    options: [
      "I am renting",
      "I live in social housing",
      "I own my home",
      "I don’t have a place to live",
    ],
    required: true,
  },
  {
    label: "Are you pregnant or expecting a child?",
    type: "radio",
    name: "isPregnant",
    options: ["Yes", "No"],
    required: true,
  },
  {
    label: "Length of stay in Canada since age 18?",
    type: "radio",
    name: "lengthOfStay",
    options: [
      "Less than 1 year",
      "1 to 4 years",
      "5 to 9 years",
      "10 to 20 years",
      "More than 20 years",
      "I'm under 18",
    ],
    required: true,
  },
  {
    label: "Terms & Conditions",
    type: "terms",
    name: "termsAccepted",
    info: "I confirm that the information provided in this form is accurate and truthful to the best of my knowledge. I understand that submitting false or misleading information may have consequences.",
    required: true,
  },
];
const EligibilityForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    isTaxFiled: "",
    isVisionCareRequired: "",
    isPrescriptionDrugCostly: "",
    employerHealthCoverage: "",
    isDiabeticOrSurgery: "",
    citizenshipStatus: "",
    age: "",
    immigrationStatus: "",
    employmentStatus: [],
    income: "",
    familySize: "",
    careForChildrenUnder18: "",
    isAnyoneDisable: "",
    livingCondition: "",
    isPregnant: "",
    lengthOfStay: "",
    termsAccepted: false,
  });
  const [errors, setErrors] = useState({});
  const { url } = useContext(AppContext);
  const navigate = useNavigate();

  const validate = useCallback(() => {
    const newErrors = {};
    const currentStep = steps[step];

    if (currentStep.required && !formData[currentStep.name]) {
      newErrors[currentStep.name] = `${currentStep.label} is required`;
    } else if (
      currentStep.required &&
      currentStep.name == "employmentStatus" &&
      formData[currentStep.name].length == 0
    ) {
      newErrors[currentStep.name] = `${currentStep.label} is required`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [step, formData]);

  const handleNext = useCallback(() => {
    if (validate()) {
      setStep((prevStep) => prevStep + 1);
    }
  }, [validate]);

  const handlePrevious = useCallback(() => {
    setStep((prevStep) => prevStep - 1);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => {
      if (type === "checkbox") {
        if (name === "termsAccepted") {
          return { ...prevData, [name]: checked };
        } else {
          return {
            ...prevData,
            [name]: checked
              ? [...(prevData[name] || []), value]
              : prevData[name].filter((v) => v !== value),
          };
        }
      } else {
        return { ...prevData, [name]: value };
      }
    });

    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const newUrl = url + "/api/eligibility/addEligibilityData";
      const response = await fetch(newUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Eligibility data added successfully!");

        navigate("/user-information");
      } else {
        alert(`Error: ${result}`);
      }
    } catch (error) {
      alert("An error occurred while submitting data");
    }
  };

  return (
    <div className="flex flex-col gap-8 mt-2">
      <div className="mx-auto text-2xl font-semibold text-gray-900 tracking-wide">
        Please fill out the form to get the eligible benefits
      </div>

      <div className="container mx-auto max-w-4xl p-8 bg-white shadow-lg rounded-xl border border-gray-200">
        <div className="progress-bar mb-8">
          <div className="flex items-center space-x-2">
            {steps &&
              steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 rounded-full transition-all duration-300 ease-in-out ${
                    index < step ? "bg-green-600" : "bg-gray-300"
                  }`}
                  style={{ width: `${100 / steps.length}%` }}
                ></div>
              ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step Label */}
          <div className="mb-4">
            <label className="block text-lg mb-2 font-semibold text-gray-800">
              {steps[step].label}
            </label>

            {/* Step Input Type */}
            {steps[step].type === "radio" && (
              <div className="space-y-2">
                {steps[step].options.map((option, index) => (
                  <label
                    key={index}
                    className="flex items-center mb-2 text-md text-gray-700"
                  >
                    <input
                      type="radio"
                      name={steps[step].name}
                      value={option}
                      checked={formData[steps[step].name] === option}
                      onChange={handleChange}
                      className="mr-4 w-5 h-5 border-gray-300 rounded-full transition-all duration-300"
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}

            {steps[step].type === "terms" &&
              !Array.isArray(steps[step].options) && (
                <div className="space-y-4">
                  <label className="flex items-center text-md text-gray-700">
                    <input
                      type="checkbox"
                      name="termsAccepted"
                      checked={formData.termsAccepted || false}
                      onChange={handleChange}
                      className="mr-4 w-5 h-5 border-gray-300 rounded-lg transition duration-300"
                    />
                    {steps[step].info}
                  </label>
                </div>
              )}

            {steps[step].type === "checkbox" && (
              <div className="space-y-6">
                {steps[step].options.map((option, index) => (
                  <label
                    key={index}
                    className="flex items-center text-md text-gray-700"
                  >
                    <input
                      type="checkbox"
                      name={steps[step].name}
                      value={option}
                      checked={(formData[steps[step].name] || []).includes(
                        option
                      )}
                      onChange={handleChange}
                      className="mr-4 w-5 h-5 border-gray-300 rounded-lg transition duration-300"
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}

            {steps[step].type === "text" && (
              <input
                type="text"
                name={steps[step].name}
                value={formData[steps[step].name] || ""}
                onChange={handleChange}
                placeholder={steps[step].placeholder}
                className="w-full p-4 mt-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-500 transition duration-200"
              />
            )}

            {/* Display validation error */}
            {errors[steps[step].name] && (
              <p className="text-red-500 text-sm mt-2">
                {errors[steps[step].name]}
              </p>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-10">
            {step > 0 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="bg-gray-300 text-gray-700 py-3 px-6 rounded-lg shadow-md hover:bg-gray-400 transition duration-300"
              >
                Previous
              </button>
            )}
            {step < steps.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-800 transition duration-300"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="bg-green-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-green-700 transition duration-300"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EligibilityForm;
