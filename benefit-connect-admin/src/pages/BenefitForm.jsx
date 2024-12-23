/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useCallback, useContext, useEffect } from "react";
import TextEditor from "../components/TextEditor/TextEditor";
import { AppContext } from "../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";

const steps = [
  {
    label: "Benefit Title",
    type: "text",
    name: "title",
    placeholder: "Enter the title for the benefit",
    required: true,
  },
  {
    label: "Is identification required for the benefit?",
    type: "radio",
    name: "identificationRequired",
    options: ["Yes", "No"],
    required: true,
  },
  {
    label: "What are the identification documents required?",
    type: "identificationEditor",
    name: "identificationRequiredData",
    placeholder: "Enter the identification documents required for the benefit",
    required: true,
  },
  {
    label: "Benefit Description",
    type: "descriptionEditor",
    name: "description",
    placeholder: "Enter the description for the benefit",
    required: true,
  },
  {
    label: "Is the application easy or complex?",
    type: "radio",
    name: "isApplicationEasy",
    options: ["Easy", "Complex"],
    required: true,
  },

  {
    label: "Is tax filing required for the benefit?",
    type: "radio",
    name: "isTaxFilingRequired",
    options: ["Yes", "No"],
    required: true,
  },
  {
    label: "Does this benefit provide vision care?",
    type: "radio",
    name: "isVisionCareRequired",
    options: ["Yes", "No"],
    required: true,
  },
  {
    label:
      "Does this benefit require prescription drugs to cost > $10k in a year?",
    type: "radio",
    name: "isPrescriptionDrugCostly",
    options: ["Yes", "No"],
    required: true,
  },
  {
    label:
      "Does this benefit require health insurance coverage from the employer?",
    type: "radio",
    name: "employerHealthCoverage",
    options: ["Yes", "No"],
    required: true,
  },
  {
    label: "Required Age bracket for the benefit?",
    type: "radio",
    name: "age",
    options: ["<18", "18-29", "30-49", "50-59", "60-69", "70+", "None"],
    required: true,
  },
  {
    label:
      "What type of citizenship or immigration status does this benefit require?",
    type: "radio",
    name: "immigrationStatus",
    options: [
      "US Citizen",
      "Permanent Resident",
      "Temporary Worker",
      "Student",
      "Any",
    ],
    required: true,
  },
  {
    label:
      "What kind of income source should the applicant have? (Please check all that apply)",
    type: "checkbox",
    name: "employmentStatus",
    options: [
      "Employed, Full-time",
      "Employed, Part-time",
      "Unemployed",
      "Retired",
      "Student",
      "Any",
    ],
    required: true,
  },
  {
    label:
      "How much money does the applicant in their household, together, make in one year?",
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
      "Not Required",
    ],
    required: true,
  },
  {
    label: "Including self, how many people should live in the same home?",
    type: "radio",
    name: "familySize",
    options: ["1", "2", "3", "4", "5", "6", "7+", "Not Required"],
    required: true,
  },
  {
    label:
      "Does the benefit require for the applicant to care for any children under 18 years of age?",
    type: "radio",
    name: "careForChildrenUnder18",
    options: ["Yes", "No"],
    required: true,
  },
  {
    label:
      "Should the applicant, or anyone in the household, living with a disability, a requirement for the benefit?",
    type: "radio",
    name: "isAnyoneDisable",
    options: ["Yes", "No"],
    required: true,
  },
  {
    label:
      "Does this benefit require applicant to be diabetic or had any surgery in the past 3 months?",
    type: "radio",
    name: "isDiabeticOrSurgery",
    options: ["Yes", "No"],
    required: true,
  },
  {
    label: "What should be the living condition of applicant?",
    type: "radio",
    name: "livingCondition",
    options: [
      "I am renting",
      "I live in social housing",
      "I own my home",
      "I don’t have a place to live",
      "Not Required",
    ],
    required: true,
  },
  {
    label:
      "Does the benefit require applicant to be pregnant or expecting a child?",
    type: "radio",
    name: "isPregnant",
    options: ["Yes", "No"],
    required: true,
  },
  {
    label: "Length of stay in USA required since age 18?",
    type: "radio",
    name: "lengthOfStay",
    options: [
      "Less than 1 year",
      "1 to 4 years",
      "5 to 9 years",
      "10 to 20 years",
      "More than 20 years",
      "I'm under 18",
      "Not Required",
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

const BenefitForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    identificationRequired: "",
    identificationRequiredData: "",
    isApplicationEasy: "",
    isTaxFilingRequired: "",
    isVisionCareRequired: "",
    isPrescriptionDrugCostly: "",
    employerHealthCoverage: "",
    isDiabeticOrSurgery: "",
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
  const { url, token } = useContext(AppContext);
  const { formType, benefitId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchBenefit = async () => {
      try {
        const response = await fetch(
          `${url}/api/benefit/getBenefitById/${benefitId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
          }
        );
        if (response.ok) {
          const fetchedData = await response.json();
          const benefit = fetchedData.data;

          setFormData((prevData) => ({
            ...prevData,
            ...benefit,
          }));
        }
      } catch (error) {
        console.error("Error fetching benefit:", error);
      }
    };

    if (benefitId && formType === "edit") {
      fetchBenefit();
    }
  }, [benefitId, formType, url]);

  const validate = () => {
    const newErrors = {};

    steps.forEach((field) => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      } else if (
        field.required &&
        field.name === "employmentStatus" &&
        formData[field.name].length === 0
      ) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => {
      if (type === "checkbox") {
        if (name === "termsAccepted") {
          return { ...prevData, [name]: checked };
        }
        return {
          ...prevData,
          [name]: checked
            ? [...(prevData[name] || []), value]
            : prevData[name].filter((v) => v !== value),
        };
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
      let newUrl = url + "/api/benefit/addBenefit";
      if (benefitId && formType === "edit") {
        newUrl = url + `/api/benefit/updateBenefit/${benefitId}`;
      }

      const response = await fetch(newUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        if (formType == "edit") {
          alert("Benefit data updated successfully!");
        } else {
          alert("Benefit data added successfully!");
        }
        navigate("/");
      } else {
        alert(`Error: ${result}`);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("An error occurred while submitting data");
    }
  };

  return (
    <div className="container mx-auto mt-16 max-w-7xl">
      <h4 className="font-semibold text-3xl text-gray-800 mb-8 text-center">
        Create a New Benefit
      </h4>
      <form onSubmit={handleSubmit} className="p-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((field, index) => (
            <div key={index} className="space-y-4">
              <label className="block text-lg font-medium text-gray-800">
                {field.label}
              </label>

              {/* Radio Inputs */}
              {field.type === "radio" && (
                <div className="space-y-3">
                  {field.options.map((option, key) => (
                    <label
                      key={key}
                      className="flex items-center gap-3 text-gray-700 hover:text-gray-900 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={field.name}
                        value={option}
                        checked={formData[field.name] === option}
                        onChange={handleChange}
                        className="form-radio h-5 w-5 text-blue-600"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              )}

              {/* Checkbox Inputs */}
              {field.type === "checkbox" && (
                <div className="space-y-3">
                  {field.options.map((option, key) => (
                    <label
                      key={key}
                      className="flex items-center gap-3 text-gray-700 hover:text-gray-900 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        name={field.name}
                        value={option}
                        checked={formData[field.name]?.includes(option)}
                        onChange={handleChange}
                        className="form-checkbox h-5 w-5 text-blue-600"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              )}

              {/* Text Inputs */}
              {field.type === "text" && (
                <input
                  type="text"
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out"
                />
              )}

              {/* Text Editors */}
              {[
                "identificationEditor",
                "eligibilityEditor",
                "howToApplyEditor",
                "descriptionEditor",
              ].includes(field.type) && (
                <TextEditor
                  editorValue={formData[field.name]}
                  handleChange={(content) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      [field.name]: content,
                    }))
                  }
                />
              )}

              {/* Terms Checkbox */}
              {field.type === "terms" && (
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name={field.name}
                    checked={formData[field.name]}
                    onChange={handleChange}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="text-gray-700">{field.info}</span>
                </div>
              )}

              {/* Validation Errors */}
              {errors[field.name] && (
                <p className="text-red-500 text-sm">{errors[field.name]}</p>
              )}
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-8 rounded-full shadow-lg hover:bg-gradient-to-l hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 ease-in-out"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default BenefitForm;
