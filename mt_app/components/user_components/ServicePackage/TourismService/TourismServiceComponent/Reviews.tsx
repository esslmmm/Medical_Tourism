import { 
  StarIcon, 
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/solid';

// ✅ Mock Data
const tourism_service = {
  name: 'Phuket Trip',
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
  reviews:[
    {
      name: 'Ahmed Muhammad',
      profile: '/img/Homepage/Test.jpg',
      country: 'Saudi Arabia',
      flag: '🇸🇦',
      date: 'August 2025',
      rating: 5,
      text: 'We had such a lovely experience where we really enjoyed and met the elephants during the whole day...'
    },
    {
      name: 'Ahmed Muhammad',
      profile: '/img/Homepage/Test.jpg',
      country: 'Qatar',
      flag: '🇶🇦',
      date: 'August 2025',
      rating: 5,
      text: 'We had such a lovely experience where we really enjoyed and met the elephants during the whole day...'
    },
    {
      name: 'Wunna Kaungmyat',
      profile: '/img/Homepage/Test.jpg',
      country: 'Myanmar',
      flag: '🇲🇲',
      date: 'August 2025',
      rating: 4,
      text: 'We had such a lovely experience where we really enjoyed and met the elephants during the whole day...'
    }
  ],
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

const Reviews = () => {
  const reviews = tourism_service.reviews; // ✅ Use reviews from medical_service

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-black">Review</h2>

      {/* Overall rating */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <StarIcon className="w-4 h-4 text-yellow-400" />
          <span className="font-bold text-black">4.8</span>
          <span className="text-sm text-gray-600">(556 reviews) from 900+ booked</span>
        </div>
        
        {/* Rating breakdown */}
        <div className="space-y-2 mb-6">
          {[
            { stars: 5, count: 492, width: 88 },
            { stars: 4, count: 42, width: 8 },
            { stars: 3, count: 15, width: 4 },
            { stars: 2, count: 0, width: 1 },
            { stars: 1, count: 0, width: 1 }
          ].map((rating) => (
            <div key={rating.stars} className="flex items-center gap-3 text-xs">
              <span className="font-bold text-black">{rating.stars} Star</span>
              <div className="flex-1 bg-gray-200 rounded-full h-1">
                <div 
                  className="bg-teal-500 h-1 rounded-full" 
                  style={{ width: `${rating.width}%` }}
                ></div>
              </div>
              <span className="text-gray-600">{rating.count}</span>
            </div>
          ))}
        </div>

        {/* Filter buttons */}
        <div className="flex gap-4 mb-6 text-sm">
          <button className="text-teal-500">5 Star</button>
          <button className="text-teal-500">4 Star</button>
          <button className="text-teal-500">3 Star</button>
          <button className="text-teal-500">2 Star</button>
          <button className="text-teal-500">1 Star</button>
          <div className="ml-auto border border-teal-500 rounded-full px-4 py-1">
            <span className="text-teal-500">Most relevant</span>
          </div>
        </div>
      </div>

      {/* Review list */}
      <div className="space-y-6">
        {reviews.map((review, index) => (
          <div key={index} className="border-b pb-6">
            <div className="flex items-start gap-4">
            {/* User Profile*/}
              <img
  src={review.profile}
  alt={review.name}
  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
/>
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-1">
                  <h4 className="font-bold text-gray-600">{review.name}</h4>
                  <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-full border text-xs">
                    <span>{review.flag}</span>
                    <span className="font-bold text-black">{review.country}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mb-2">Reviewed on {review.date}</p>
                <p className="text-sm mb-3 text-black">{review.text}</p>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <StarIcon key={i} className="w-4 h-4 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-600">{review.rating} out of 5 rating</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <ChevronLeftIcon className="w-6 h-6 text-gray-400" />
        <div className="border border-teal-500 rounded w-6 h-6"></div>
        <span>...</span>
        <ChevronRightIcon className="w-6 h-6 text-gray-400" />
      </div>
    </div>
  );
};

export default Reviews;
