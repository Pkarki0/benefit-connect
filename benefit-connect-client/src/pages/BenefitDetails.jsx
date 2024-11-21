import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import parser from "html-react-parser";
import { ThreeDots } from "react-loader-spinner";

const BenefitDetails = () => {
  const { benefitId } = useParams();
  const [benefit, setBenefit] = useState(null);
  const { url, isAuthenticated } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBenefitDetails = async () => {
      try {
        const response = await fetch(
          url + `/api/benefit/getBenefitById/${benefitId}`
        );
        if (response.ok) {
          const data = await response.json();
          setBenefit(data.data);
          setLoading(false);
        } else {
          console.error("Error fetching benefit details");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching benefit details:", error);
        setLoading(false);
      }
    };

    fetchBenefitDetails();
  }, [benefitId]);

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
    <div
      className={`${
        isAuthenticated ? "sm:ml-64" : "w-full"
      } mx-auto px-6 py-24 min-h-screen`}
    >
      <div className="max-w-4xl mx-auto bg-white p-8 space-y-6">
        <h1 className="text-4xl font-semibold text-gray-900">
          {benefit.title}
        </h1>

        <div className="space-y-6">
          <div className="space-y-3">
            <strong className="text-xl text-gray-800">Description:</strong>
            <div className="tinymce-content text-gray-700 text-base">
              {parser(benefit.description)}
            </div>
          </div>
          <div className="space-y-3">
            <strong className="text-xl text-gray-800">Eligibility Data:</strong>
            <div className="tinymce-content text-gray-700 text-base">
              {parser(benefit.eligibilityData)}
            </div>
          </div>
          <div className="space-y-3">
            <strong className="text-xl text-gray-800">
              Identification Required:
            </strong>
            <p className="text-gray-700 text-base">
              {benefit.identificationRequired}
            </p>
          </div>
          <div className="space-y-3">
            <strong className="text-xl text-gray-800">
              Identification Required Data:
            </strong>
            <div className="tinymce-content text-gray-700 text-base">
              {parser(benefit.identificationRequiredData)}
            </div>
          </div>
          <div className="space-y-3">
            <strong className="text-xl text-gray-800">
              Is Application Easy:
            </strong>
            <p className="text-gray-700 text-base">
              {benefit.isApplicationEasy}
            </p>
          </div>
          <div className="space-y-3">
            <strong className="text-xl text-gray-800">How To Apply:</strong>
            <div className="tinymce-content text-gray-700 text-base">
              {parser(benefit.howToApplyData)}
            </div>
          </div>
          <div className="space-y-3">
            <strong className="text-xl text-gray-800">
              Is Tax Filing Required:
            </strong>
            <p className="text-gray-700 text-base">
              {benefit.isTaxFilingRequired}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitDetails;
