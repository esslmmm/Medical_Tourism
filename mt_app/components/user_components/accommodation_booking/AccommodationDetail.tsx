const accommodations = [
  {
    id: 1,
    name: "Wanasom Resort",
    address: "333 Moo1 Tambon ThaSud, Amphur Muang, Chiangrai, Tha Sut, Chiang Rai, Thailand, 57100",
    rating: 4.7,
    reviews: 480,
    description:
      "The car parking and the Wi-Fi are always free, so you can stay in touch and come and go as you please. Conveniently situated in the Tha Sut part of Chiang Rai, this property puts you close to attractions and interesting dining options. Don't leave before paying a visit to the famous Wat Rong Khun. This 3-star property features restaurant to make your stay more indulgent and memorable.",
    facilities: [
      "Free Wi-Fi",
      "Pool with view",
      "Free parking",
      "Fitness center",
      "Restaurant",,
      "24-hour Front Desk",
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
            <a href="https://maps.app.goo.gl/j6BP8rAziBPpPECbA" className="text-green-500 font-medium mt-2 flex items-center">
              See map 📍
            </a>

            <p className="text-gray-700 mt-4">{hotel.description}</p>

            {/* Facilities List */}
            <h3 className="text-xl font-semibold mt-6">Facilities</h3>
            <div className="grid grid-cols-2 gap-3 mt-2 text-gray-700">
              {hotel.facilities.map((facility, index) => (
                <span key={index}>✔ {facility}</span>
              ))}
            </div>
          </div>
        </div>
        
      ))}
    </div>
  );
};

export default AccommodationDetails;
