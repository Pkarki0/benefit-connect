/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useRef, useState } from "react";
import { AppContext } from "../../context/AppContext";

const Search = ({ setBenefits }) => {
  const { url } = useContext(AppContext);
  const [search, setSearch] = useState("");
  const debounceTimeout = useRef(null); // Ref to store the timeout ID

  const handleSearchBenefits = async (e) => {
    const value = e.target.value;
    setSearch(value);

    // Clear the previous timer if still typing
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Set a new timer
    debounceTimeout.current = setTimeout(async () => {
      try {
        const response = await fetch(url + "/api/benefit/searchBenefits", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ search: value }),
        });

        if (response.ok) {
          const data = await response.json();
          const benefits = data.data;
          setBenefits(benefits);
        }
      } catch (error) {
        console.error("Error fetching benefits:", error);
      }
    }, 500); // Adjust debounce delay (in ms) as needed
  };

  return (
    <form className="max-w-md mx-auto">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 19l-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="text"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search for Benefits"
          value={search}
          onChange={handleSearchBenefits}
          required
        />
      </div>
    </form>
  );
};

export default Search;
