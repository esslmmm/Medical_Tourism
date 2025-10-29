import { 
  StarIcon, 
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/solid';
import { useState } from 'react';

// ✅ Mock Data
const tourism_service = {
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
      rating: 4,
      text: 'We had such a lovely experience where we really enjoyed and met the elephants during the whole day...'
    },
    {
      name: 'Wunna Kaungmyat',
      profile: '/img/Homepage/Test.jpg',
      country: 'Myanmar',
      flag: '🇲🇲',
      date: 'August 2025',
      rating: 3,
      text: 'We had such a lovely experience where we really enjoyed and met the elephants during the whole day...'
    }
  ],
};

const Reviews = () => {
  const reviews = tourism_service.reviews;
  const [filter, setFilter] = useState<number | null>(null);

  // ✅ Filter logic
  const filteredReviews = filter
    ? reviews.filter((review) => review.rating === filter)
    : reviews;

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

        {/* ⭐ Filter buttons */}
        <div className="flex gap-4 mb-6 text-sm flex-wrap">
          {/* ✅ "All" filter button */}
          <button
            onClick={() => setFilter(null)}
            className={`px-3 py-1 rounded-full border transition ${
              filter === null
                ? 'bg-teal-500 text-white border-teal-500'
                : 'text-teal-500 border border-teal-500 hover:bg-teal-50'
            }`}
          >
            All
          </button>

          {[5, 4, 3, 2, 1].map((star) => (
            <button
              key={star}
              onClick={() => setFilter(filter === star ? null : star)} // toggle filter
              className={`px-3 py-1 rounded-full border transition ${
                filter === star
                  ? 'bg-teal-500 text-white border-teal-500'
                  : 'text-teal-500 border border-teal-500 hover:bg-teal-50'
              }`}
            >
              {star} Star
            </button>
          ))}

          <div className="ml-auto border border-teal-500 rounded-full px-4 py-1">
            <span className="text-teal-500">Most relevant</span>
          </div>
        </div>
      </div>

      {/* Review list */}
      <div className="space-y-6">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review, index) => (
            <div key={index} className="border-b pb-6">
              <div className="flex items-start gap-4">
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
          ))
        ) : (
          <p className="text-gray-500 text-sm">No reviews with {filter}-star rating.</p>
        )}
      </div>

      {/* Pagination (still static) */}
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
