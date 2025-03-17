const facilities = [
    "Free Wi-Fi",
    "Pool with view",
    "Free parking",
    "Fitness center",
    "Restaurant",
    "Bar",
    "Front desk [24-hour]",
    "Airport transfer",
  ];
  
  export default function FacilityList() {
    return (
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3">Facilities</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-gray-700">
          {facilities.map((facility, index) => (
            <p key={index} className="flex items-center space-x-2">
              ✅ <span>{facility}</span>
            </p>
          ))}
        </div>
      </div>
    );
  }
  