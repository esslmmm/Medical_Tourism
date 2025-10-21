import React, { useState } from 'react';
import { X, MapPin } from 'lucide-react';
import Image from 'next/image';


// ✅ Type Definitions
interface Location {
  text: string;
  url: string;
}

interface ImportantInfo {
  not_allowed: string[];
  recommend_to_bring: string[];
  know_before_you_go: string[];
}

interface Attraction {
  name: string;
  description: string;
  highlights: string[];
  includes: string[];
  important_info: ImportantInfo;
  location: Location;
}

interface Trip {
  description: string;
  images: string[];
  title: string;
  duration: string;
  attractions: Attraction[];
  tags: string[];
  price: number;
  priceColor: string;
}

interface TripDetailModalProps {
  trip: Trip | null;
  isOpen: boolean;
  onClose: () => void;
}

// ✅ Mock Data
const tourism_package = {
  name: 'Phuket Trip',
  images: [
    {url:'/img/Homepage/Test.jpg', alt:'Medical facility'},
    {url:'/img/Homepage/Test.jpg', alt:'Medical facility'},
    {url:'/img/Homepage/Test.jpg', alt:'Medical facility'},
    {url:'/img/Homepage/Test4.jpg', alt:'Medical facility'},
    {url:'/img/Homepage/Test.jpg', alt:'Medical facility'},
    {url:'/img/Homepage/Test.jpg', alt:'Medical facility'},
  ],
  description: 'Ran-Tong is devoted to rescuing abused elephants from all over Thailand and surrounding countries. Every elephant rescued is brought to the sanctuary in Chiang Mai and cared for with great passion and enthusiasm. Our mission is not only geared towards the protection and prevention of abused Elephants in Thailand but also to educate the public about their long history within Thai culture. Founded in 2009, Ran-Tong has rescued over 40 elephants to date with the help of public generosity, support, and private donation they can continue their ongoing vital work. Our priority is animal welfare. At Ran-Tong Save & Rescue Elephant Centre, you will completely get to learn a lot about elephants and have a memorable experience with them.',
  trips : [
    {
      description: "Experience the best of Phuket with our 3-day tour package. Explore the stunning Phi Phi Islands, enjoy a city tour, and visit the iconic James Bond Island. Perfect for a summer holiday filled with relaxation and adventure.",
      images:["https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80","https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80","https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"],
      title: "Phuket Go Around",
      duration: "1 days",
      attractions: [{
        name:"Phi Phi Islands",
        description:"The Phi Phi Islands are a group of islands located in the Andaman Sea, off the coast of Thailand. They are known for their stunning beaches, crystal-clear waters, and vibrant marine life. The islands are a popular destination for tourists and offer a range of activities such as snorkeling, diving, and island hopping.",
        highlights: ["Experience the thrill of a speedboat to the stunning Phi Phi Islands","Snorkel in crystal-clear waters teeming with vibrant marine life.","Relax on pristine beaches and soak up the tropical sun.","Experience the thrill of a speedboat to the stunning Phi Phi Islands","Snorkel in crystal-clear waters teeming with vibrant marine life.","Relax on pristine beaches and soak up the tropical sun."],
        includes:["Hotel pickup and drop-off by air-conditioned vehicle","Speedboat transfer to and from Phi Phi Islands","Professional English-speaking guide","Snorkeling equipment and life jackets","Bottled water and refreshments on board","Experience the thrill of a speedboat to the stunning Phi Phi Islands","Snorkel in crystal-clear waters teeming with vibrant marine life.","Relax on pristine beaches and soak up the tropical sun."],
        important_info:{
          not_allowed:["People with back problems","Pregnant","Heart complaints or other serious medical conditions","Epilepsy","Motion sickness"],
          recommend_to_bring:["Swimwear and towel","Sunscreen and hat","Camera to capture the memories","Cash for personal expenses and tips"],
          know_before_you_go:["This tour involves a moderate amount of walking, including some uneven surfaces and stairs.","Snorkeling is subject to weather and sea conditions. The operator reserves the right to modify or cancel snorkeling activities for safety reasons.","Please inform us of any dietary restrictions or allergies in advance so we can accommodate your needs.","Children must be accompanied by an adult at all times during the tour."]
        },
        location:{
          text:"Royal Phuket Marina, 68, Thep Krasattri Rd, Tambon Ko Kaeo, 83000",
          url:"https://www.google.com/maps/@9.5488479,99.9470193,12.86z?hl=en-US&entry=ttu&g_ep=EgoyMDI1MTAwOC4wIKXMDSoASAFQAw%3D%3D"
        }
      }],
      tags: ["Summer", "Holiday", "Relax"],
      price: 2000,
      priceColor: "text-red-500",
    },
    {
      description: "Experience the best of Phuket with our 3-day tour package. Explore the stunning Phi Phi Islands, enjoy a city tour, and visit the iconic James Bond Island. Perfect for a summer holiday filled with relaxation and adventure.",
      images:["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80","https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80","https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",],
      title: "Summer Fun",
      duration: "2 days",
      attractions: [{
        name:"Phi Phi Islands",
        description:"The Phi Phi Islands are a group of islands located in the Andaman Sea, off the coast of Thailand. They are known for their stunning beaches, crystal-clear waters, and vibrant marine life. The islands are a popular destination for tourists and offer a range of activities such as snorkeling, diving, and island hopping.",
        highlights: ["Experience the thrill of a speedboat to the stunning Phi Phi Islands","Snorkel in crystal-clear waters teeming with vibrant marine life.","Relax on pristine beaches and soak up the tropical sun.","Experience the thrill of a speedboat to the stunning Phi Phi Islands","Snorkel in crystal-clear waters teeming with vibrant marine life.","Relax on pristine beaches and soak up the tropical sun."],
        includes:["Hotel pickup and drop-off by air-conditioned vehicle","Speedboat transfer to and from Phi Phi Islands","Professional English-speaking guide","Snorkeling equipment and life jackets","Bottled water and refreshments on board","Experience the thrill of a speedboat to the stunning Phi Phi Islands","Snorkel in crystal-clear waters teeming with vibrant marine life.","Relax on pristine beaches and soak up the tropical sun."],
        important_info:{
          not_allowed:["People with back problems","Pregnant","Heart complaints or other serious medical conditions","Epilepsy","Motion sickness"],
          recommend_to_bring:["Swimwear and towel","Sunscreen and hat","Camera to capture the memories","Cash for personal expenses and tips"],
          know_before_you_go:["This tour involves a moderate amount of walking, including some uneven surfaces and stairs.","Snorkeling is subject to weather and sea conditions. The operator reserves the right to modify or cancel snorkeling activities for safety reasons.","Please inform us of any dietary restrictions or allergies in advance so we can accommodate your needs.","Children must be accompanied by an adult at all times during the tour."]
        },
        location:{
          text:"Royal Phuket Marina, 68, Thep Krasattri Rd, Tambon Ko Kaeo, 83000",
          url:"https://www.google.com/maps/@9.5488479,99.9470193,12.86z?hl=en-US&entry=ttu&g_ep=EgoyMDI1MTAwOC4wIKXMDSoASAFQAw%3D%3D"
        }
      }, {
        name:"Phi Phi Islands",
        description:"The Phi Phi Islands are a group of islands located in the Andaman Sea, off the coast of Thailand. They are known for their stunning beaches, crystal-clear waters, and vibrant marine life. The islands are a popular destination for tourists and offer a range of activities such as snorkeling, diving, and island hopping.",
        highlights: ["Experience the thrill of a speedboat to the stunning Phi Phi Islands","Snorkel in crystal-clear waters teeming with vibrant marine life.","Relax on pristine beaches and soak up the tropical sun.","Experience the thrill of a speedboat to the stunning Phi Phi Islands","Snorkel in crystal-clear waters teeming with vibrant marine life.","Relax on pristine beaches and soak up the tropical sun."],
        includes:["Hotel pickup and drop-off by air-conditioned vehicle","Speedboat transfer to and from Phi Phi Islands","Professional English-speaking guide","Snorkeling equipment and life jackets","Bottled water and refreshments on board","Experience the thrill of a speedboat to the stunning Phi Phi Islands","Snorkel in crystal-clear waters teeming with vibrant marine life.","Relax on pristine beaches and soak up the tropical sun."],
        important_info:{
          not_allowed:["People with back problems","Pregnant","Heart complaints or other serious medical conditions","Epilepsy","Motion sickness"],
          recommend_to_bring:["Swimwear and towel","Sunscreen and hat","Camera to capture the memories","Cash for personal expenses and tips"],
          know_before_you_go:["This tour involves a moderate amount of walking, including some uneven surfaces and stairs.","Snorkeling is subject to weather and sea conditions. The operator reserves the right to modify or cancel snorkeling activities for safety reasons.","Please inform us of any dietary restrictions or allergies in advance so we can accommodate your needs.","Children must be accompanied by an adult at all times during the tour."]
        },
        location:{
          text:"Royal Phuket Marina, 68, Thep Krasattri Rd, Tambon Ko Kaeo, 83000",
          url:"https://www.google.com/maps/@9.5488479,99.9470193,12.86z?hl=en-US&entry=ttu&g_ep=EgoyMDI1MTAwOC4wIKXMDSoASAFQAw%3D%3D"
        }
      }],
      tags: ["Holiday", "Relax"],
      price: 1000,
      priceColor: "text-red-500",
    },
    {
      description: "Experience the best of Phuket with our 3-day tour package. Explore the stunning Phi Phi Islands, enjoy a city tour, and visit the iconic James Bond Island. Perfect for a summer holiday filled with relaxation and adventure.",
      images:["https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80","https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80","https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",],
      title: "Phuket City",
      duration: "3 day",
      attractions: [{
        name:"Phi Phi Islands",
        description:"The Phi Phi Islands are a group of islands located in the Andaman Sea, off the coast of Thailand. They are known for their stunning beaches, crystal-clear waters, and vibrant marine life. The islands are a popular destination for tourists and offer a range of activities such as snorkeling, diving, and island hopping.",
        highlights: ["Experience the thrill of a speedboat to the stunning Phi Phi Islands","Snorkel in crystal-clear waters teeming with vibrant marine life.","Relax on pristine beaches and soak up the tropical sun.","Experience the thrill of a speedboat to the stunning Phi Phi Islands","Snorkel in crystal-clear waters teeming with vibrant marine life.","Relax on pristine beaches and soak up the tropical sun."],
        includes:["Hotel pickup and drop-off by air-conditioned vehicle","Speedboat transfer to and from Phi Phi Islands","Professional English-speaking guide","Snorkeling equipment and life jackets","Bottled water and refreshments on board","Experience the thrill of a speedboat to the stunning Phi Phi Islands","Snorkel in crystal-clear waters teeming with vibrant marine life.","Relax on pristine beaches and soak up the tropical sun."],
        important_info:{
          not_allowed:["People with back problems","Pregnant","Heart complaints or other serious medical conditions","Epilepsy","Motion sickness"],
          recommend_to_bring:["Swimwear and towel","Sunscreen and hat","Camera to capture the memories","Cash for personal expenses and tips"],
          know_before_you_go:["This tour involves a moderate amount of walking, including some uneven surfaces and stairs.","Snorkeling is subject to weather and sea conditions. The operator reserves the right to modify or cancel snorkeling activities for safety reasons.","Please inform us of any dietary restrictions or allergies in advance so we can accommodate your needs.","Children must be accompanied by an adult at all times during the tour."]
        },
        location:{
          text:"Royal Phuket Marina, 68, Thep Krasattri Rd, Tambon Ko Kaeo, 83000",
          url:"https://www.google.com/maps/@9.5488479,99.9470193,12.86z?hl=en-US&entry=ttu&g_ep=EgoyMDI1MTAwOC4wIKXMDSoASAFQAw%3D%3D"
        }
      }, {
        name:"Phi Phi Islands",
        description:"The Phi Phi Islands are a group of islands located in the Andaman Sea, off the coast of Thailand. They are known for their stunning beaches, crystal-clear waters, and vibrant marine life. The islands are a popular destination for tourists and offer a range of activities such as snorkeling, diving, and island hopping.",
        highlights: ["Experience the thrill of a speedboat to the stunning Phi Phi Islands","Snorkel in crystal-clear waters teeming with vibrant marine life.","Relax on pristine beaches and soak up the tropical sun.","Experience the thrill of a speedboat to the stunning Phi Phi Islands","Snorkel in crystal-clear waters teeming with vibrant marine life.","Relax on pristine beaches and soak up the tropical sun."],
        includes:["Hotel pickup and drop-off by air-conditioned vehicle","Speedboat transfer to and from Phi Phi Islands","Professional English-speaking guide","Snorkeling equipment and life jackets","Bottled water and refreshments on board","Experience the thrill of a speedboat to the stunning Phi Phi Islands","Snorkel in crystal-clear waters teeming with vibrant marine life.","Relax on pristine beaches and soak up the tropical sun."],
        important_info:{
          not_allowed:["People with back problems","Pregnant","Heart complaints or other serious medical conditions","Epilepsy","Motion sickness"],
          recommend_to_bring:["Swimwear and towel","Sunscreen and hat","Camera to capture the memories","Cash for personal expenses and tips"],
          know_before_you_go:["This tour involves a moderate amount of walking, including some uneven surfaces and stairs.","Snorkeling is subject to weather and sea conditions. The operator reserves the right to modify or cancel snorkeling activities for safety reasons.","Please inform us of any dietary restrictions or allergies in advance so we can accommodate your needs.","Children must be accompanied by an adult at all times during the tour."]
        },
        location:{
          text:"Royal Phuket Marina, 68, Thep Krasattri Rd, Tambon Ko Kaeo, 83000",
          url:"https://www.google.com/maps/@9.5488479,99.9470193,12.86z?hl=en-US&entry=ttu&g_ep=EgoyMDI1MTAwOC4wIKXMDSoASAFQAw%3D%3D"
        }
      }, {
        name:"Phi Phi Islands",
        description:"The Phi Phi Islands are a group of islands located in the Andaman Sea, off the coast of Thailand. They are known for their stunning beaches, crystal-clear waters, and vibrant marine life. The islands are a popular destination for tourists and offer a range of activities such as snorkeling, diving, and island hopping.",
        highlights: ["Experience the thrill of a speedboat to the stunning Phi Phi Islands","Snorkel in crystal-clear waters teeming with vibrant marine life.","Relax on pristine beaches and soak up the tropical sun.","Experience the thrill of a speedboat to the stunning Phi Phi Islands","Snorkel in crystal-clear waters teeming with vibrant marine life.","Relax on pristine beaches and soak up the tropical sun."],
        includes:["Hotel pickup and drop-off by air-conditioned vehicle","Speedboat transfer to and from Phi Phi Islands","Professional English-speaking guide","Snorkeling equipment and life jackets","Bottled water and refreshments on board","Experience the thrill of a speedboat to the stunning Phi Phi Islands","Snorkel in crystal-clear waters teeming with vibrant marine life.","Relax on pristine beaches and soak up the tropical sun."],
        important_info:{
          not_allowed:["People with back problems","Pregnant","Heart complaints or other serious medical conditions","Epilepsy","Motion sickness"],
          recommend_to_bring:["Swimwear and towel","Sunscreen and hat","Camera to capture the memories","Cash for personal expenses and tips"],
          know_before_you_go:["This tour involves a moderate amount of walking, including some uneven surfaces and stairs.","Snorkeling is subject to weather and sea conditions. The operator reserves the right to modify or cancel snorkeling activities for safety reasons.","Please inform us of any dietary restrictions or allergies in advance so we can accommodate your needs.","Children must be accompanied by an adult at all times during the tour."]
        },
        location:{
          text:"Royal Phuket Marina, 68, Thep Krasattri Rd, Tambon Ko Kaeo, 83000",
          url:"https://www.google.com/maps/@9.5488479,99.9470193,12.86z?hl=en-US&entry=ttu&g_ep=EgoyMDI1MTAwOC4wIKXMDSoASAFQAw%3D%3D"
        }
      }],
      tags: ["Holiday", "Relax"],
      price: 500,
      priceColor: "text-red-500",
    },
  ]
};
// ✅ Trip Detail Modal Component
const TripDetailModal: React.FC<TripDetailModalProps> = ({ trip, isOpen, onClose }) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  
      const [selectedImage, setSelectedImage] = useState(
        tourism_package.images.length > 0 ? tourism_package.images[0] : null
      );

  if (!isOpen || !trip) return null;

  const toggleSection = (attractionIndex: number, section: string) => {
    const key = `${attractionIndex}-${section}`;
    setExpandedSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="fixed inset-0 backdrop-blur-xs bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 max-w-6xl w-full relative overflow-y-auto max-h-[90vh] border border-gray-300">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-3xl">
          <h2 className="text-2xl font-bold text-gray-900">{trip.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Image Gallery */}
        <div>
                                    {selectedImage && (
                                      <div className="mb-4 w-full flex justify-center">
                                        <Image
                                          src={selectedImage.url}
                                          alt={selectedImage.alt}
                                          width={600}
                                          height={400}
                                          className="w-full max-w-4xl h-auto object-cover rounded-lg"
                                        />
                                      </div>
                                    )}
                      
                                    <div className="flex gap-4 overflow-x-auto py-2">
                                      {tourism_package.images.map((img, i) => (
                                        <button
                                          key={i}
                                          onClick={() => setSelectedImage(img)}
                                          className={`flex-shrink-0 border-2 rounded-lg overflow-hidden ${
                                            selectedImage!.url === img.url
                                              ? "border-teal-500"
                                              : "border-transparent"
                                          }`}
                                        >
                                          <Image
                                            src={img.url}
                                            alt={img.alt}
                                            width={150}
                                            height={100}
                                            className="w-[150px] h-auto object-cover"
                                          />
                                        </button>
                                      ))}
                                    </div>
                                </div>
        {/* <div className="px-6 pt-6">
          <div className="grid grid-cols-3 gap-2 mb-6">
            <div className="col-span-2 row-span-2">
              <img
                src={trip.images[0]}
                alt={trip.title}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            <div className="space-y-2">
              <img
                src={trip.images[1] || trip.images[0]}
                alt={trip.title}
                className="w-full h-32 object-cover rounded-2xl"
              />
              <div className="relative">
                <img
                  src={trip.images[2] || trip.images[0]}
                  alt={trip.title}
                  className="w-full h-32 object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-2xl flex items-center justify-center">
                  <span className="text-white font-semibold">See all photos</span>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* Description */}
        <div className="px-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Description <span className="text-orange-500 font-normal">({trip.duration})</span>
          </h3>
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            {tourism_package.description}
          </p>

          {/* Tags */}
          <div className="flex gap-2">
            {trip.tags.map((tag: string, index: number) => (
              <span
                key={index}
                className="px-4 py-1.5 bg-teal-100 text-teal-700 text-sm rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Attractions */}
        {trip.attractions.map((attraction: Attraction, attractionIndex: number) => (
          <div key={attractionIndex} className="px-6 mb-6 border-t border-gray-200 pt-6">
            <div className="flex gap-4 mb-4">
              <div className="grid grid-cols-2 gap-2 w-64 flex-shrink-0">
                  <img
                    key={trip.title}
                    src={trip.images[0]}
                    alt={attraction.name}
                    className=" object-cover rounded-xl"
                  />
              </div>

              {/* Name & Description */}
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{attraction.name}</h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-2">
                  {attraction.description}
                </p>
                {/* highlightss */}
            <div className="mb-4">
              <h4 className="text-base font-bold text-gray-900 mb-2">highlightss</h4>
              <ul className="space-y-1">
                {attraction.highlights
                  .slice(0, expandedSections[`${attractionIndex}-highlightss`] ? undefined : 3)
                  .map((item: string, i: number) => (
                    <li key={i} className="text-gray-700 text-sm flex items-start">
                      <span className="text-gray-400 mr-2">•</span>
                      {item}
                    </li>
                  ))}
              </ul>
              {attraction.highlights.length > 3 && (
                <button
                  onClick={() => toggleSection(attractionIndex, 'highlightss')}
                  className="text-teal-400 text-sm font-medium mt-2"
                >
                  {expandedSections[`${attractionIndex}-highlightss`] ? 'See less' : 'See more'}
                </button>
              )}
            </div>

            {/* includess */}
            <div className="mb-4">
              <h4 className="text-base font-bold text-gray-900 mb-2">includess</h4>
              <ul className="space-y-1">
                {attraction.includes
                  .slice(0, expandedSections[`${attractionIndex}-includess`] ? undefined : 3)
                  .map((item: string, i: number) => (
                    <li key={i} className="text-gray-700 text-sm flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      {item}
                    </li>
                  ))}
              </ul>
              {attraction.includes.length > 3 && (
                <button
                  onClick={() => toggleSection(attractionIndex, 'includess')}
                  className="text-teal-400 text-sm font-medium mt-2"
                >
                  {expandedSections[`${attractionIndex}-includess`] ? 'See less' : 'See more'}
                </button>
              )}
            </div>

            {/* Important Information */}
<div className="mb-6">
  <h4 className="text-base font-bold text-gray-900 mb-3">Important Information</h4>

  {/* Not Allowed */}
  <div className="mb-3">
    <h5 className="font-semibold text-red-500 mb-1">🚫 Not Allowed</h5>
    <ul className="space-y-1">
      {attraction.important_info.not_allowed
        .slice(0, expandedSections[`${attractionIndex}-not_allowed`] ? undefined : 3)
        .map((item: string, i: number) => (
          <li key={i} className="text-gray-700 text-sm flex items-start">
            <span className="text-red-400 mr-2">•</span>
            {item}
          </li>
        ))}
    </ul>
    {attraction.important_info.not_allowed.length > 3 && (
      <button
        onClick={() => toggleSection(attractionIndex, 'not_allowed')}
        className="text-teal-400 text-sm font-medium mt-2"
      >
        {expandedSections[`${attractionIndex}-not_allowed`] ? 'See less' : 'See more'}
      </button>
    )}
  </div>

  {/* Recommend to Bring */}
  <div className="mb-3">
    <h5 className="font-semibold text-teal-500 mb-1">🎒 Recommend to Bring</h5>
    <ul className="space-y-1">
      {attraction.important_info.recommend_to_bring
        .slice(0, expandedSections[`${attractionIndex}-recommend`] ? undefined : 3)
        .map((item: string, i: number) => (
          <li key={i} className="text-gray-700 text-sm flex items-start">
            <span className="text-teal-400 mr-2">✓</span>
            {item}
          </li>
        ))}
    </ul>
    {attraction.important_info.recommend_to_bring.length > 3 && (
      <button
        onClick={() => toggleSection(attractionIndex, 'recommend')}
        className="text-teal-400 text-sm font-medium mt-2"
      >
        {expandedSections[`${attractionIndex}-recommend`] ? 'See less' : 'See more'}
      </button>
    )}
  </div>

  {/* Know Before You Go */}
  <div>
    <h5 className="font-semibold text-orange-500 mb-1">ℹ️ Know Before You Go</h5>
    <ul className="space-y-1">
      {attraction.important_info.know_before_you_go
        .slice(0, expandedSections[`${attractionIndex}-know`] ? undefined : 3)
        .map((item: string, i: number) => (
          <li key={i} className="text-gray-700 text-sm flex items-start">
            <span className="text-orange-400 mr-2">•</span>
            {item}
          </li>
        ))}
    </ul>
    {attraction.important_info.know_before_you_go.length > 3 && (
      <button
        onClick={() => toggleSection(attractionIndex, 'know')}
        className="text-teal-400 text-sm font-medium mt-2"
      >
        {expandedSections[`${attractionIndex}-know`] ? 'See less' : 'See more'}
      </button>
    )}
  </div>
</div>


            {/* Location */}
            <div>
              <h4 className="text-base font-bold text-gray-900 mb-3">Location</h4>
              <div className="bg-gray-100 rounded-xl h-48 flex items-center justify-center mb-3 overflow-hidden">
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.123456789!2d99.9470193!3d9.5488479!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMzInNTUuOSJOIDk5wrA1NiczNy4zIkU!5e0!3m2!1sen!2sth!4v1234567890`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Location Map"
                />
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 text-sm">{attraction.location.text}</p>
              </div>
            </div>
              </div>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ✅ Trip List Component
const TripsList: React.FC = () => {
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSeeDetails = (trip: Trip) => {
    setSelectedTrip(trip);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTrip(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Trip</h1>
      </div>

      {/* Trip List Card */}
      {/* <div className="space-y-4">
  {tourism_package.trips.map((trip: Trip, index: number) => (
    <div
      key={index}
      className="bg-white rounded-2xl drop-shadow-lg border border-gray-300 p-4 mb-4"
    >
      <div className="flex gap-6">
        <div className="flex-shrink-0">
          <img
            src={trip.images[0]}
            alt={trip.title}
            className="w-56 h-full object-cover rounded-2xl"
          />
        </div>
        <div className="flex-1 py-2">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                {trip.title}{' '}
                <span className="text-orange-500 font-normal">({trip.duration})</span>
              </h3>
              <ul className="text-gray-600 text-sm space-y-1">
                {trip.attractions.map((attraction: Attraction, idx: number) => (
                  <li key={idx} className="flex items-center">
                    <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                    {attraction.name}
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => handleSeeDetails(trip)}
              className="text-teal-400 hover:text-teal-500 text-sm font-medium flex items-center gap-1"
            >
              See details
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          <div className="flex gap-2 mb-4">
            {trip.tags.map((tag: string, idx: number) => (
              <span
                key={idx}
                className="px-3 py-1 bg-teal-100 text-teal-700 text-sm rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-baseline gap-1">
              <span className="text-gray-600 text-sm">Start from</span>
              <span className="text-gray-400 text-sm">฿</span>
              <span className={`text-2xl font-bold ${trip.priceColor}`}>
                {trip.price.toLocaleString()}
              </span>
            </div>
            <button className="px-6 py-2 border-2 border-teal-200 text-teal-400 hover:bg-teal-50 rounded-full font-medium transition-colors">
              Choose
            </button>
          </div>
        </div>
      </div>
    </div>
  ))}
</div> */}

      <div className="space-y-4">
  {tourism_package.trips.map((trip: Trip, index: number) => (
    <div
      key={index}
      className="bg-white rounded-2xl drop-shadow-lg border border-gray-300 p-4 mb-4"
    >
      <div className="flex gap-6">
        <div className="flex-shrink-0">
          <img
            src={trip.images[0]}
            alt={trip.title}
            className="w-32 h-48 object-cover rounded-2xl"
          />
        </div>

        <div className="flex-1 py-2 flex flex-col">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                {trip.title}{' '}
                <span className="text-orange-500 font-normal">({trip.duration})</span>
              </h3>
              <ul className="text-gray-600 text-sm space-y-1">
                {trip.attractions.map((attraction: Attraction, idx: number) => (
                  <li key={idx} className="flex items-center">
                    <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                    {attraction.name}
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => handleSeeDetails(trip)}
              className="text-teal-400 hover:text-teal-500 text-sm font-medium flex items-center gap-1"
            >
              See details
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          <div className="flex gap-2">
            {trip.tags.map((tag: string, idx: number) => (
              <span
                key={idx}
                className="px-3 py-1 bg-teal-100 text-teal-700 text-sm rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>



          <div className="flex justify-between items-center mt-auto">
            <div className="flex items-baseline gap-1">
              <span className="text-gray-600 text-sm">Start from</span>
              <span className="text-gray-400 text-sm">฿</span>
              <span className={`text-2xl font-bold ${trip.priceColor}`}>
                {trip.price.toLocaleString()}
              </span>
            </div>
            <button className="px-6 py-2 border-2 border-teal-200 text-teal-400 hover:bg-teal-50 rounded-full font-medium transition-colors">
              Choose
            </button>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>

      <TripDetailModal trip={selectedTrip} isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default TripsList;
