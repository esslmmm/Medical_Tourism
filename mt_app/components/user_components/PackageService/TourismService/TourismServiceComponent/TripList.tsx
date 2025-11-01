

"use client";
import React, { useState, useEffect } from 'react';
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

interface TripListProps {
  onTripSelect?: (trip: any) => void;
}

interface Attraction {
  name: string;
  description: string;
  images: string[];
  highlights: string[];
  includes: string[];
  important_info: ImportantInfo;
  location: Location;
}

interface Trip {
  description: string;
  image?: string;
  title: string;
  duration: number;
  attractions: Attraction[];
  tags: string[];
  guide_price: number;
  car_service_price: number;
  priceColor: string;
}

interface TripDetailModalProps {
  trip: Trip | null;
  isOpen: boolean;
  onClose: () => void;
}

// ✅ Mock Data
const tourism_service = {
  name: 'Phuket Trip',
  city: 'Phuket',
  languages:[
  { name: "English", flag: "🇬🇧" },
  { name: "Arabic", flag: "🇸🇦" },
  { name: "Japanese", flag: "🇯🇵" },
  { name: "Chinese", flag: "🇨🇳" },
  { name: "Korean", flag: "🇰🇷" },
  { name: "Thai", flag: "🇹🇭" },
  { name: "Spanish", flag: "🇪🇸" },
  { name: "French", flag: "🇫🇷" },
  { name: "German", flag: "🇩🇪" },
  { name: "Italian", flag: "🇮🇹" },
  { name: "Russian", flag: "🇷🇺" },
  { name: "Hindi", flag: "🇮🇳" },
  { name: "Other", flag: "🌐" },
],
  images: [
    {url:'/img/Homepage/Mfu.JPG', alt:'Medical facility'},
    {url:'/img/Homepage/hospital3.png', alt:'Medical facility'},
    {url:'/img/Homepage/Test.jpg', alt:'Medical facility'},
    {url:'/img/Homepage/hospital4.png', alt:'Medical facility'},
    {url:'/img/Homepage/hospital5.png', alt:'Medical facility'},
    {url:'/img/Homepage/Test.jpg', alt:'Medical facility'},
  ],
  description: 'Ran-Tong is devoted to rescuing abused elephants from all over Thailand and surrounding countries. Every elephant rescued is brought to the sanctuary in Chiang Mai and cared for with great passion and enthusiasm. Our mission is not only geared towards the protection and prevention of abused Elephants in Thailand but also to educate the public about their long history within Thai culture. Founded in 2009, Ran-Tong has rescued over 40 elephants to date with the help of public generosity, support, and private donation they can continue their ongoing vital work. Our priority is animal welfare. At Ran-Tong Save & Rescue Elephant Centre, you will completely get to learn a lot about elephants and have a memorable experience with them.',
  trips : [
    {
      description: "Experience the best of Phuket with our 3-day tour package. Explore the stunning Phi Phi Islands, enjoy a city tour, and visit the iconic James Bond Island. Perfect for a summer holiday filled with relaxation and adventure.",
      title: "Phuket Go Around",
      image:"/img/Homepage/hospital3.png",
      duration: 1,
      adult_price: 1000,
      child_price: 500,
      guide_price: 1000,
      car_service_price: 600,
      attractions: [{
        name:"Phi Phi Islands",
        images:["/img/Homepage/hospital3.png","/img/Homepage/hospital4.png","/img/Homepage/hospital5.png"],
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
      priceColor: "text-red-500",
    },
    {
      description: "Experience the best of Phuket with our 3-day tour package. Explore the stunning Phi Phi Islands, enjoy a city tour, and visit the iconic James Bond Island. Perfect for a summer holiday filled with relaxation and adventure.",
      image:"/img/Homepage/Mfu.JPG",
      title: "Summer Fun",
      duration: 2,
      adult_price: 2000,
      child_price: 1000,
      guide_price: 1500,
      car_service_price: 900,
      attractions: [{
        name:"Phi Phi Islands",
        images:["/img/Homepage/hospital4.png","/img/Homepage/hospital3.png","/img/Homepage/hospital5.png"],
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
        images:["/img/Homepage/hospital3.png","/img/Homepage/hospital5.png","/img/Homepage/hospital3.png"],
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
      priceColor: "text-red-500",
    },
    {
      description: "Experience the best of Phuket with our 3-day tour package. Explore the stunning Phi Phi Islands, enjoy a city tour, and visit the iconic James Bond Island. Perfect for a summer holiday filled with relaxation and adventure.",
      image:"/img/Homepage/hospital4.png",
      title: "Phuket City",
      duration: 3,
      adult_price: 3000,
      child_price: 1500,
      guide_price: 2000,
      car_service_price: 1200,
      attractions: [{
        name:"Phi Phi Islands",
        images:["/img/Homepage/Test.jpg","/img/Homepage/hospital3.png","/img/Homepage/hospital5.png"],
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
        images:["/img/Homepage/hospital5.png","/img/Homepage/hospital4.png","/img/Homepage/hospital5.png"],
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
        images:["/img/Homepage/hospital4.png","/img/Homepage/hospital4.png","/img/Homepage/hospital5.png"],
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
      priceColor: "text-red-500",
    },
  ]
};
// ✅ Trip Detail Modal Component
const TripDetailModal: React.FC<TripDetailModalProps> = ({ trip, isOpen, onClose }) => {  
      if (!isOpen || !trip) return null;
  
  // Flatten all images from all attractions
  const allAttractionImages = trip.attractions.flatMap(attraction =>
    attraction.images.map(imgUrl => ({ url: imgUrl, alt: attraction.name }))
  );

  const [selectedImage, setSelectedImage] = useState(allAttractionImages[0] || null);
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

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

        {/* Overview Trip Image Gallery */}
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
  {allAttractionImages.map((img, i) => (
    <button
      key={i}
      onClick={() => setSelectedImage(img)}
      className={`flex-shrink-0 border-2 rounded-lg overflow-hidden ${
        selectedImage!.url === img.url ? "border-teal-500" : "border-transparent"
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

        {/* Description */}
        <div className="px-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Description <span className="text-orange-500 font-normal">({trip.duration})</span>
          </h3>
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            {tourism_service.description}
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
              {/* Attraction Images (updated) */}
              <div className="grid grid-cols-2 gap-2 w-64 flex-shrink-0">
                {attraction.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={attraction.name}
                    className="object-cover rounded-xl"
                  />
                ))}
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
const TripList: React.FC<TripListProps> = ({ onTripSelect }) => {
  const [selectedTrip, setSelectedTrip] = useState<any | null>(null);
  const [selectedTripIndex, setSelectedTripIndex] = useState(0); 
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSeeDetails = (trip: Trip) => {
    setSelectedTrip(trip);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTrip(null);
  };

  const handleSelectTrip = (trip: any, index:number) => {
    setSelectedTripIndex(index)
    setSelectedTrip(trip);
    if (onTripSelect) onTripSelect(trip); // ✅ send selected trip to parent
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Trip</h1>
      </div>

      <div className="space-y-4">
        {tourism_service.trips.map((trip: Trip, index: number) => (
          <div key={index}
          onClick={() => handleSelectTrip(trip, index)} // ✅ trigger selection
          className={`cursor-pointer bg-white rounded-2xl drop-shadow-lg border p-4 mb-4 transition-colors ${
    selectedTripIndex === index ? "border-teal-500 border-2" : "border-gray-300"
  }`}
        >
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <img src={trip.image} alt={trip.title} className="w-32 h-48 object-cover rounded-2xl" />
              </div>

              <div className="flex-1 py-2 flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {trip.title} <span className="text-orange-500 font-normal">({trip.duration} {trip.duration > 1 ? "days" : "day"})</span>
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
                    className="cursor-pointer text-teal-400 hover:text-teal-500 text-sm font-medium flex items-center gap-1"
                  >
                    See details
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                <div className="flex gap-2">
                  {trip.tags.map((tag: string, idx: number) => (
                    <span key={idx} className="px-3 py-1 bg-teal-100 text-teal-700 text-sm rounded-full font-medium">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-auto">
                  <div className="flex items-baseline gap-1">
                    <span className="text-gray-600 text-sm">Start from</span>
                    <span className="text-gray-400 text-sm">฿</span>
                    <span className={`text-2xl font-bold ${trip.priceColor}`}>
                      {(trip.guide_price + trip.car_service_price).toLocaleString()}
                    </span>
                  </div>
                  <button
  onClick={() => setSelectedTripIndex(index)}
  className={`cursor-pointer px-6 py-2 rounded-full font-medium transition-colors border-2 ${
    selectedTripIndex === index
      ? "border-teal-500 text-teal-500 bg-teal-50"
      : "border-teal-200 text-teal-400 hover:bg-teal-50"
  }`}
> Choose
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

export default TripList;