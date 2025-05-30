"use client";

type ServiceType = "accommodation_booking" | "Interpreter";

interface ServicesProps {
  selectedServices: Record<ServiceType, boolean>;
  setSelectedServices: React.Dispatch<React.SetStateAction<Record<ServiceType, boolean>>>;
}

const AdditionService: React.FC<ServicesProps> = ({selectedServices, setSelectedServices}) => {

  const toggleSelection = (service: ServiceType) => {
    setSelectedServices((prev) => ({
      ...prev,
      [service]: !prev[service],
    }));
  };


  return (
    <div className="min-h-screen bg-[#d4e7df] flex justify-center items-center p-6">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">
          Addition Service
        </h1>

        {/* Selected Services Section */}
        <div className="mb-6 bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-gray-800">Selected Services:</h3>
          <p className="text-gray-600 text-lg">
            {selectedServices.accommodation_booking && "Accommodation "}
            {selectedServices.Interpreter && "Interpreter"}
            {!selectedServices.accommodation_booking && !selectedServices.Interpreter && "None"}
          </p>
        </div>

        {/* Service Cards */}
        <div className="space-y-6">
          {/* Accommodation Card */}
          <div
            title="Click to select or deselect Accommodation"
            className={`flex items-center p-6 rounded-2xl shadow-lg transition-all duration-300 cursor-pointer border-2 relative ${
              selectedServices.accommodation_booking
                ? "bg-green-100 border-green-500 scale-105"
                : "bg-white border-gray-300 hover:shadow-xl hover:scale-105"
            }`}
            onClick={() => toggleSelection("accommodation_booking")}
          >
            <img
              src="/img/room1.png"
              alt="Accommodation"
              className="w-1/3 h-40 object-cover rounded-lg"
            />
            <div className="ml-6 flex-1">
              <h2 className="text-2xl font-bold text-gray-800">Accommodation</h2>
              <p className="text-gray-600 text-lg mt-2">Options:</p>
              <ul className="mt-3 space-y-3">
                <li className="bg-gray-100 px-4 py-3 rounded-lg shadow-sm hover:bg-gray-200 transition">
                  The Heritage Chiang Rai Hotel and Convention
                </li>
                <li className="bg-gray-100 px-4 py-3 rounded-lg shadow-sm hover:bg-gray-200 transition">
                  The Legacy of The Legend Chiang Rai Boutique River Resort & Spa
                </li>
                <li className="bg-gray-100 px-4 py-3 rounded-lg shadow-sm hover:bg-gray-200 transition">
                  Le Meridien Chiang Rai Resort, Thailand
                </li>
              </ul>
            </div>
          </div>

          {/* Interpreter Card */}
          <div
            title="Click to select or deselect Interpreter"
            className={`flex items-center p-6 rounded-2xl shadow-lg transition-all duration-300 cursor-pointer border-2 relative ${
              selectedServices.Interpreter
                ? "bg-green-100 border-green-500 scale-105"
                : "bg-white border-gray-300 hover:shadow-xl hover:scale-105"
            }`}
            onClick={() => toggleSelection("Interpreter")}
          >
            <img
              src="/img/package_detail/interpreter.png"
              alt="Interpreter"
              className="w-1/3 h-40 object-cover rounded-lg"
            />
            <div className="ml-6 flex-1">
              <h2 className="text-2xl font-bold text-gray-800">Interpreter</h2>
              <p className="text-gray-600 text-lg mt-2">Options:</p>
              <ul className="mt-3 space-y-3">
                <li className="bg-gray-100 px-4 py-3 rounded-lg shadow-sm hover:bg-gray-200 transition">
                  English Language
                </li>
                <li className="bg-gray-100 px-4 py-3 rounded-lg shadow-sm hover:bg-gray-200 transition">
                  Burmese Language
                </li>
                <li className="bg-gray-100 px-4 py-3 rounded-lg shadow-sm hover:bg-gray-200 transition">
                  Arabic Language
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionService;
