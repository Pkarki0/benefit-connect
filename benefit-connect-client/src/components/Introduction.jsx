import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Introduction = () => {
  const { token } = useContext(AppContext);

  return (
    <div className="flex flex-col items-center justify-center p-4 mb-8 text-justify">
      <h1 className="text-4xl font-bold mb-4">Benefit Connect</h1>
      <p className="text-lg text-center mb-6">
        Your guide to government benefits that can help put more money in your
        pocket.
      </p>

      <div className="flex items-center gap-4">
        <div className="bg-white shadow-md rounded-lg p-6 mb-8 max-w-md w-full border border-black">
          <h2 className="text-xl font-semibold mb-2">
            Answer questions to help us find benefits for you.
          </h2>
          <p className="mb-4">
            Your answers to questions are stored securely. We do not share your
            personal information.
          </p>
          <div className="flex items-center justify-between mb-4">
            <p className="text-lg font-semibold">
              {!token && (
                <Link
                  to="/signin"
                  className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-md group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                >
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Sign In
                  </span>
                </Link>
              )}
            </p>
            <p className="text-lg font-semibold">0%</p>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-2 mb-4">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: "0%" }}
            ></div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-8 mb-8 max-w-md w-full border border-black">
          <h2 className="text-xl font-semibold mb-4">Important Information</h2>
          <ul className="list-disc list-inside mb-4">
            <li>
              The Benefits Wayfinder was created by Prosper USA, a national
              charity that works with partners in all sectors to develop and
              promote financial policies, programs and resources that transform
              lives and help Canadians to prosper.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
