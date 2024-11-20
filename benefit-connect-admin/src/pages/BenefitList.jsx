/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import parse from "html-react-parser";
const BenefitsList = () => {
  const [benefits, setBenefits] = useState([]);
  const [selectedBenefit, setSelectedBenefit] = useState(null);
  const { url, token } = useContext(AppContext);

  function truncateText(text, wordLimit) {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  }

  // Fetch all benefits
  useEffect(() => {
    const fetchBenefits = async () => {
      try {
        const response = await fetch(url + "/api/benefit/getAllBenefits", {
          headers: {
            method: "GET",
            "Content-Type": "application/json",
            token: token,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const benefits = data.data;
          setBenefits(benefits);
        }
      } catch (error) {
        console.error("Error fetching benefits:", error);
      }
    };
    fetchBenefits();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this benefit?"
    );

    if (confirmDelete) {
      await fetch(`${url}/api/benefit/deleteBenefit/${id}`)
        .then(() => {
          setBenefits(benefits.filter((benefit) => benefit._id !== id));
        })
        .catch((error) => alert("Error deleting benefit:", error));
      alert("Delete Operation was Successful");
    } else {
      alert("Delete Operation was Cancelled");
    }
  };

  const handleView = (benefit) => {
    setSelectedBenefit(benefit);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-2xl font-semibold mb-4">Benefits List</h2>
        <Link to="/add-benefit">
          <button
            type="button"
            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Add Benefit
          </button>
        </Link>
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full table-auto text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {benefits?.map((benefit) => (
                <tr key={benefit._id} className="border-b">
                  <td className="px-4 py-2">{benefit.title}</td>
                  <td className="px-4 py-2">
                    {parse(truncateText(benefit.description, 12))}
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      onClick={() => handleView(benefit)}
                    >
                      View
                    </button>
                    <Link
                      className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                      to={`/add-benefit/edit/${benefit._id}`}
                    >
                      Edit
                    </Link>
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      onClick={() => handleDelete(benefit._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Section */}
      {selectedBenefit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto w-full max-w-4xl">
            <h3 className="text-xl font-semibold mb-4 text-center">
              View Benefit
            </h3>
            <div className="space-y-4">
              <div>
                <strong>Title:</strong>
                <div>{selectedBenefit.title}</div>
              </div>
              <div>
                <strong>Description:</strong>
                <div className="tinymce-content">
                  {parse(selectedBenefit.description)}
                </div>
              </div>
              <div>
                <strong>Eligibility Data:</strong>
                <div className="tinymce-content">
                  <div>{parse(selectedBenefit.eligibilityData)}</div>
                </div>
              </div>
              <div>
                <strong>Identification Required:</strong>
                <div>{selectedBenefit.identificationRequired}</div>
              </div>
              <div>
                <strong>Identification Required Data:</strong>
                <div className="tinymce-content">
                  <div>{parse(selectedBenefit.identificationRequiredData)}</div>
                </div>
              </div>
              <div>
                <strong>Is Application Easy:</strong>
                <div>{selectedBenefit.isApplicationEasy}</div>
              </div>
              <div>
                <strong>How To Apply:</strong>
                <div className="tinymce-content">
                  <div>{parse(selectedBenefit.howToApplyData)}</div>
                </div>
              </div>
              <div>
                <strong>Is Tax Filing Required:</strong>
                <div>{selectedBenefit.isTaxFilingRequired}</div>
              </div>
              <div>
                <strong>Is Vision Care Required:</strong>
                <div>{selectedBenefit.isVisionCareRequired}</div>
              </div>
              <div>
                <strong>Is Prescription Drug Costly:</strong>
                <div>{selectedBenefit.isPrescriptionDrugCostly}</div>
              </div>
              <div className="mt-4 flex justify-center">
                <button
                  className="px-4 py-2 bg-gray-500 text-white rounded-md"
                  onClick={() => setSelectedBenefit(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BenefitsList;
