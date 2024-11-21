import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

const InquiryList = () => {
  const { url, token } = useContext(AppContext);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  function truncateText(text, wordLimit) {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  }

  const fetchContacts = async () => {
    try {
      const response = await fetch(url + "/api/inquiry/getAllInquiries", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setContacts(data.data);
      } else {
        console.error("Failed to fetch inquiries");
      }
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchContacts();
    }
  }, []);

  if (loading) {
    return <div>Loading inquiries...</div>;
  }

  return (
    <div className="p-6 mx-auto min-h-screen">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-800">
        Inquiries List
      </h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-500">
          <thead className="text-xs uppercase bg-gray-200 text-gray-700">
            <tr>
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">Email</th>
              <th className="px-6 py-4 font-medium">Message</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {contacts.map((contact) => (
              <tr
                key={contact._id}
                className="hover:bg-gray-100 transition duration-150 ease-in-out"
              >
                <td className="px-6 py-4">{contact.name}</td>
                <td className="px-6 py-4">{contact.email}</td>
                <td className="px-6 py-4 text-ellipsis overflow-hidden whitespace-nowrap max-w-xs">
                  {truncateText(contact.message, 20)}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded ${
                      contact.isReplied
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {contact.isReplied ? "Replied" : "Pending"}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  {!contact.isReplied ? (
                    <Link
                      to={`/replyTo/${contact._id}`}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                    >
                      Reply
                    </Link>
                  ) : (
                    <span className="text-gray-400">N/A</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InquiryList;
