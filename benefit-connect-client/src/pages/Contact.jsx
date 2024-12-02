import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const Contact = () => {
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const { isAuthenticated, url } = useContext(AppContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(url + "/api/inquiry/addInquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
      });
      const data = await response.json();
      console.log("Data: ", data);

      if (response.ok) {
        setContactData({ name: "", email: "", message: "" });
        alert("Inquiry submitted successfully");
      }
    } catch (error) {
      console.log("Error occured: ", error);
    }

    console.log(contactData);
  };

  return (
    <div
      className={`${
        isAuthenticated ? "sm:ml-64" : "w-full"
      } flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 pt-32 pb-20`}
    >
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Contact Us</h1>

      <div className="max-w-xl w-full bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          How can we help you?
        </h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:gap-4">
            <div className="flex-1">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-600"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                onChange={handleChange}
                value={contactData.name}
                className="mt-2 block w-full border-gray-300 rounded-lg p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                onChange={handleChange}
                value={contactData.email}
                className="mt-2 block w-full border-gray-300 rounded-lg p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-600"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows="4"
              onChange={handleChange}
              value={contactData.message}
              className="mt-2 block w-full border-gray-300 rounded-lg p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Submit
          </button>
        </form>
      </div>

      <div className="mt-8 max-w-md w-full text-center space-y-2">
        <h2 className="text-lg font-semibold text-gray-700">
          Other Ways to Reach Us
        </h2>
        <p className="text-sm text-gray-600">
          <strong>Email:</strong>
          <a href="mailto:info@benefitconnect.org" className="text-indigo-600">
            info@benefitconnect.org
          </a>
        </p>
        <p className="text-sm text-gray-600">
          <strong>Phone:</strong>
          <a href="tel:+1234567890" className="text-indigo-600">
            +1 (234) 567-890
          </a>
        </p>
        <p className="text-sm text-gray-600">
          <strong>Address:</strong> 123 Benefits Way, Texas, USA
        </p>
      </div>
    </div>
  );
};

export default Contact;
