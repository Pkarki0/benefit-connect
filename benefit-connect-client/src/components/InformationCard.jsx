/* eslint-disable react/prop-types */

const Card = ({ heading, children }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4 max-w-md w-full border border-[#221c08] text-justify">
      <h2 className="text-xl font-semibold mb-4">{heading}</h2>
      <div>{children}</div>
    </div>
  );
};

export default Card;
