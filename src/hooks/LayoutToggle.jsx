import { FaTh, FaBars } from "react-icons/fa";

const LayoutToggle = ({ isTable, setIsTable }) => {
  return (
    <div className="flex gap-4 justify-end items-center mb-6">
      <button
        onClick={() => setIsTable(false)}
        className={`p-2 rounded hover:bg-gray-200 ${
          !isTable ? "bg-blue-100 text-blue-600" : "text-gray-500"
        }`}
      >
        <FaTh size={20} />
      </button>
      <button
        onClick={() => setIsTable(true)}
        className={`p-2 rounded hover:bg-gray-200 ${
          isTable ? "bg-blue-100 text-blue-600" : "text-gray-500"
        }`}
      >
        <FaBars size={20} />
      </button>
    </div>
  );
};

export default LayoutToggle;
