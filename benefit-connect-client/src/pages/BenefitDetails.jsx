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
      }  mx-auto px-4 py-32 min-h-screen`}
    >
      <div className="max-w-4xl mx-auto bg-white rounded-lg p-6 space-y-4">
        <h1 className="text-3xl font-semibold text-gray-900">
          {benefit.title}
        </h1>

        <div className="space-y-4">
          <div>
            <strong className="text-lg">Description:</strong>
            <div className="tinymce-content text-gray-700">
              {parser(benefit.description)}
            </div>
          </div>
          <div>
            <strong className="text-lg">Eligibility Data:</strong>
            <div className="tinymce-content text-gray-700">
              {parser(benefit.eligibilityData)}
            </div>
          </div>
          <div>
            <strong className="text-lg">Identification Required:</strong>
            <p className="text-gray-700">{benefit.identificationRequired}</p>
          </div>
          <div>
            <strong className="text-lg">Identification Required Data:</strong>
            <div className="tinymce-content text-gray-700">
              {parser(benefit.identificationRequiredData)}
            </div>
          </div>
          <div>
            <strong className="text-lg">Is Application Easy:</strong>
            <p className="text-gray-700">{benefit.isApplicationEasy}</p>
          </div>
          <div>
            <strong className="text-lg">How To Apply:</strong>
            <div className="tinymce-content text-gray-700">
              {parser(benefit.howToApplyData)}
            </div>
          </div>
          <div>
            <strong className="text-lg">Is Tax Filing Required:</strong>
            <p className="text-gray-700">{benefit.isTaxFilingRequired}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitDetails;
