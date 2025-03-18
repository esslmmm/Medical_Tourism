const reviews = [
  {
    id: 1,
    title: "Friendly staff",
    content:
      "Stayed during a storm in Chiang Rai, power outage occurred unexpectedly. Staff didn't know what to do. However, they tried their best to provide service with their limited resources. Room had a decent water pressure. Breakfast had a variety of options but tasted average. Comfortable bed made it hard to get up. Spacious room with good air conditioning.",
    reviewer: "Ekkarat Singhala",
    date: "April 25, 2023",
    rating: 5,
  },
  {
    id: 2,
    title: "First trip to Chiang Rai.",
    content:
      "I took my family to Chiang Rai for the first time and we stayed in a great family room with two bedrooms. It was very clean and my partner and children loved it. The room was spacious and comfortable, but the downside was that the plugs were difficult to use. The breakfast was varied and included many international options. Additionally, they provided sour noodle soup and it was very delicious. We were impressed and would choose to stay here again if we have the opportunity. ❤️❤️",
    reviewer: "Ekkarat Singhala",
    date: "November 04, 2023",
    rating: 4.5,
  },
];

const ReviewSection = () => {
  return (
    <div className="bg-[#D2ECE4] py-10 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6">Review</h2>
      <div className="max-w-4xl w-full space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold">"{review.title}"</h3>
            <p className="mt-2 text-gray-700">{review.content}</p>
            <div className="mt-4 text-sm text-gray-500">
              Reviewed {review.date}
            </div>
            <div className="font-semibold mt-2">{review.reviewer}</div>
            <div className="flex items-center mt-2">
              {Array.from({ length: Math.floor(review.rating) }, (_, index) => (
                <span key={index} className="text-yellow-500">⭐</span>
              ))}
              {review.rating % 1 !== 0 && <span className="text-yellow-500">⭐️</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
