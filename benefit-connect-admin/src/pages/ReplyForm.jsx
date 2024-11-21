import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";

const ReplyForm = () => {
  const { url, token } = useContext(AppContext);
  const [inquiry, setInquiry] = useState({});
  const [loading, setLoading] = useState(true);
  const [replyMessage, setReplyMessage] = useState("");

  const { inquiryId } = useParams();
  const navigate = useNavigate();
  const fetchInquiry = async () => {
    try {
      const response = await fetch(
        url + `/api/inquiry/getInquiryById/${inquiryId}`,
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
        setInquiry(data.data);
      } else {
        console.error("Failed to fetch inquiries");
      }
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async () => {
    if (!replyMessage.trim()) {
      alert("Please write a reply.");
      return;
    }

    try {
      const response = await fetch(
        url + `/api/inquiry/sendInquiryReply/${inquiryId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: JSON.stringify({ replyMessage: replyMessage }),
        }
      );
      console.log(response);
      if (response.ok) {
        setReplyMessage("");
        alert("Reply sent successfully");
        navigate("/inquiry-list");
      } else {
        console.error("Failed to reply to inquiry");
      }
    } catch (error) {
      console.error("Error replying to inquiry:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchInquiry();
    }
  }, []);

  if (loading) {
    return <div>Loading inquiries...</div>;
  }

  return (
    <div className="flex flex-col items-center p-6 w-full max-w-4xl mx-auto my-16 space-y-6">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-gray-900">Inquiry Details</h1>

      {/* Inquiry Details */}
      <div className="bg-white w-full p-6 rounded-lg shadow-lg">
        <div className="space-y-4">
          <p className="text-gray-800">
            <span className="font-bold text-gray-900">Name:</span>
            {inquiry.name}
          </p>
          <p className="text-gray-800">
            <span className="font-bold text-gray-900">Email:</span>
            {inquiry.email}
          </p>
          <p className="text-gray-800">
            <span className="font-bold text-gray-900">Message:</span>
            <span className="italic text-gray-600">{inquiry.message}</span>
          </p>
          <p className="text-gray-800">
            <span className="font-bold text-gray-900">Reply Status:</span>
            {inquiry.isReplied ? (
              <span className="text-green-600 font-medium">Replied</span>
            ) : (
              <span className="text-yellow-500 font-medium">Pending</span>
            )}
          </p>
        </div>
      </div>

      <div className="w-full">
        <textarea
          className="w-full h-40 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          placeholder="Write your reply here..."
          value={replyMessage}
          onChange={(e) => setReplyMessage(e.target.value)}
        ></textarea>
        <button
          onClick={handleReply}
          className="mt-4 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full font-medium"
        >
          Send Reply
        </button>
      </div>
    </div>
  );
};

export default ReplyForm;
