import { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { ThreeDots } from "react-loader-spinner";

const Inquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const { url, token, email } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchBenefitDetails = async () => {
      try {
        const response = await fetch(
          url + `/api/inquiry/getInquiriesByEmail/${email}`,
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
          setInquiries(data.data);
          console.log(data);
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
  }, []);

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
    <div className="max-w-7xl mx-auto min-h-screen px-4 py-6">
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-700 text-white text-left">
              <th className="py-3 px-6 border-b font-medium text-sm">Name</th>
              <th className="py-3 px-6 border-b font-medium text-sm">Email</th>
              <th className="py-3 px-6 border-b font-medium text-sm">
                Message
              </th>
              <th className="py-3 px-6 border-b font-medium text-sm text-center">
                Is Replied
              </th>
              <th className="py-3 px-6 border-b font-medium text-sm">
                Reply Message
              </th>
            </tr>
          </thead>
          <tbody>
            {inquiries.length > 0 ? (
              inquiries.map((contact, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-4 px-6 border-b text-sm font-medium">
                    {contact.name}
                  </td>
                  <td className="py-4 px-6 border-b text-sm">
                    {contact.email}
                  </td>
                  <td className="py-4 px-6 border-b text-sm">
                    {contact.message}
                  </td>
                  <td className="py-4 px-6 border-b text-sm text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-full ${
                        contact.isReplied
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {contact.isReplied ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="py-4 px-6 border-b text-sm">
                    {contact.replyMessage || "N/A"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-4 px-6 text-center text-gray-500">
                  No inquiries found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inquiries;
