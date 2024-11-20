/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from "react";
import Modal from "react-modal";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isBenefitModalOpen, setIsBenefitModalOpen] = useState(false);

  const { url, token } = useContext(AppContext);
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch the users from the server using fetch API
    const fetchUsers = async () => {
      try {
        const response = await fetch(url + "/api/user/getAllUsers", {
          headers: {
            method: "GET",
            "Content-Type": "application/json",
            token: token,
          },
        });
        const data = await response.json();
        setUsers(data); // Update state with the fetched data
      } catch (error) {
        console.error("Error fetching data:", error); // Handle any errors
      }
    };
    fetchUsers();
  }, [url]);

  const openUserModal = (user) => {
    setSelectedUser(user);
    setIsUserModalOpen(true);
  };

  const closeModal = () => {
    setIsUserModalOpen(false);
    setIsBenefitModalOpen(false);
    setSelectedUser(null);
  };

  const openBenefitModal = async (benefitId) => {
    try {
      const response = await fetch(`/api/benefit/getBenefitById/${benefitId}`, {
        headers: {
          method: "GET",
          "Content-Type": "application/json",
          token: token,
        },
      });
      const data = await response.json();
      console.log(benefitId);
      setIsBenefitModalOpen(true);
    } catch (error) {
      console.error("Error fetching benefit:", error);
    }
  };

  const handleViewUserEligibleBenefits = async (userId) => {
    console.log("User List: ", userId);
    navigate(`/user-benefits/${userId}`);
  };

  return (
    <div className="mx-auto p-6 min-h-screen">
      <h1 className="text-2xl font-extrabold text-gray-800 mb-6 text-center">
        Users List
      </h1>

      <div className="w-full overflow-x-auto shadow-lg rounded-lg bg-white">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-left text-sm font-semibold uppercase">
              <th className="px-6 py-4">Full Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">User Type</th>
              <th className="px-6 py-4">Eligible</th>
              <th className="px-6 py-4">Eligibility Form Filled</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr
                key={user._id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100`}
              >
                <td className="px-6 py-4 text-gray-700">{user.fullname}</td>
                <td className="px-6 py-4 text-gray-700">{user.email}</td>
                <td className="px-6 py-4 text-gray-700">{user.userType}</td>
                <td className="px-6 py-4 text-gray-700">
                  {user.isEligible ? "Yes" : "No"}
                </td>
                <td className="px-6 py-4 text-gray-700">
                  {user.hasFilledEligibilityForm ? "Yes" : "No"}
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex flex-wrap gap-2">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600"
                      onClick={() => openUserModal(user)}
                    >
                      View Details
                    </button>
                    {user.eligibleBenefits.length > 0 && (
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded shadow-md hover:bg-green-600"
                        onClick={() => handleViewUserEligibleBenefits(user._id)}
                      >
                        Eligible Benefits
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isUserModalOpen}
        onRequestClose={closeModal}
        className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-lg mx-auto mt-24"
      >
        <h2 className="text-2xl font-semibold mb-4">User Details</h2>
        {selectedUser ? (
          <div className="space-y-4">
            <p>
              <span className="font-bold">Full Name:</span>{" "}
              {selectedUser.fullname}
            </p>
            <p>
              <span className="font-bold">Email:</span> {selectedUser.email}
            </p>
            <p>
              <span className="font-bold">User Type:</span>{" "}
              {selectedUser.userType}
            </p>
            <p>
              <span className="font-bold">Eligible:</span>{" "}
              {selectedUser.isEligible ? "Yes" : "No"}
            </p>
            <p>
              <span className="font-bold">Eligibility Form Filled:</span>{" "}
              {selectedUser.hasFilledEligibilityForm ? "Yes" : "No"}
            </p>
            <p>
              <span className="font-bold">Eligible Benefits:</span>{" "}
              {selectedUser.eligibleBenefits.length > 0 ? (
                <ul className="list-disc ml-5">
                  {selectedUser.eligibleBenefits.map((benefit) => (
                    <li key={benefit._id}>
                      <button
                        className="text-blue-500 hover:underline"
                        onClick={() => openBenefitModal(benefit._id)}
                      >
                        {benefit.name}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                "No eligible benefits available."
              )}
            </p>
          </div>
        ) : (
          <p>Loading user details...</p>
        )}
        <button
          className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          onClick={closeModal}
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default UserList;
