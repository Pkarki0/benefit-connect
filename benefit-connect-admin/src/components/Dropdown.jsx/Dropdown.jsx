/* eslint-disable react/prop-types */

const Dropdown = ({ value, onChange }) => {
  return (
    <div className="flex flex-col items-start gap-2 p-4">
      <select
        id="dropdown"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="" disabled>
          Select an option
        </option>
        <option value="Eligible To Apply">Eligible To Apply</option>
        <option value="In Review">In Review</option>
        <option value="Pending">Pending</option>
        <option value="Rejected">Rejected</option>
        <option value="On Hold">On Hold</option>
        <option value="Approved">Approved</option>
      </select>
    </div>
  );
};

export default Dropdown;
