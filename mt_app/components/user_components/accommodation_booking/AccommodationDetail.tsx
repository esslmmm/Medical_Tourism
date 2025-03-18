const accommodations = [
  {
    id: 1,
    name: "The Heritage Chiang Rai Hotel and Convention",
    address: "65 Moo 4, Mai Khao Soi 4, Mai Khao, Phuket 83110, Thailand",
    rating: 4.7,
    reviews: 480,
    description:
      "Splash Beach Resort, nestled beside Mai Khao Beach, offers group travelers the thrill of Splash Jungle Water Park. The expansive pillarless ballroom, set amidst lush gardens, is perfect for events, combining adventure with tranquility.",
    facilities: [
      "Free Wi-Fi",
      "Pool with view",
      "Free parking",
      "Fitness center",
      "Restaurant",
      "Bar",
      "24-hour Front Desk",
      "Airport transfer",
    ],
    rooms: [
      { type: "Deluxe Twins", count: 1 },
      { type: "Deluxe King", count: 1 },
    ],
    originalPrice: 20000,
    discountPrice: 10000,
  },
];

const AccommodationDetails = () => {
  return (
    <div className="p-10 flex justify-center">
      {accommodations.map((hotel) => (
        <div key={hotel.id} className="max-w-5xl w-full bg-white p-8 flex flex-col lg:flex-row gap-8">
          {/* Left Section: Hotel Info */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold">{hotel.name}</h2>
            <p className="text-gray-600 mt-2">{hotel.address}</p>
            <a href="#" className="text-green-500 font-medium mt-2 flex items-center">
              See map 📍
            </a>
            <div className="mt-4 flex items-center gap-2 text-lg font-semibold">
              ⭐ {hotel.rating}/5 <span className="text-gray-500">({hotel.reviews})</span>
            </div>
            <p className="text-gray-700 mt-4">{hotel.description}</p>

            {/* Facilities List */}
            <h3 className="text-xl font-semibold mt-6">Facilities</h3>
            <div className="grid grid-cols-2 gap-3 mt-2 text-gray-700">
              {hotel.facilities.map((facility, index) => (
                <span key={index}>✔ {facility}</span>
              ))}
            </div>
          </div>

          {/* Right Section: Booking Card */}
          <div>
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 border border-gray-200">
            <h3 className="text-xl font-bold mb-4">Booking Detail</h3>
            {hotel.rooms.map((room, index) => (
              <div key={index} className="flex justify-between pb-2 mb-2 text-gray-400">
                <span>{room.type}</span> <span>{room.count} room</span>
              </div>
            ))}
            <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-2 mt-10">
              <span className="text-gray-400">Total Original Price</span>
              <span className="text-red-600 px-2 py-1 rounded line-through">
                {hotel.originalPrice.toLocaleString()} USD
              </span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-2">
              <span>Total rooms</span> <span>{hotel.rooms.length} rooms</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-1">
              <span>Total price</span> <span>{hotel.discountPrice.toLocaleString()} USD</span>
            </div>
            <p className="text-gray-500 text-sm flex justify-center mt-20 ">
              You save <p className="text-black ">{hotel.originalPrice - hotel.discountPrice} </p> USD on this booking
            </p>
            
            
          </div>
          <button className="w-full bg-green-500 text-white py-3 rounded-lg mt-4 hover:bg-green-600">
              Book Now
            </button>
          </div>

        </div>
        
      ))}
    </div>
  );
};

export default AccommodationDetails;
