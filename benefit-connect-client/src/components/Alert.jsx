/* eslint-disable react/prop-types */

const Alert = ({ alert }) => {
  return (
    <div>
      {alert.show && (
        <div
          className={`fixed bottom-4 right-4 w-full max-w-xs px-4 py-3 text-white rounded-lg shadow-md animate-fade-in-out ${
            alert.type === "info"
              ? "bg-blue-500"
              : alert.type === "success"
              ? "bg-green-500"
              : alert.type === "warning"
              ? "bg-yellow-500"
              : "bg-red-500"
          }`}
        >
          <p>{alert.message}</p>
        </div>
      )}
    </div>
  );
};

export default Alert;
