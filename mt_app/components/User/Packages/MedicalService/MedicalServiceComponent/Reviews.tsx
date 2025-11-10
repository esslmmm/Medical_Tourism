import { 
  StarIcon, 
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/solid';
import { useState } from 'react';

//
// ✅ Types
//
interface Review {
  name: string;
  profile: string;
  country: string;
  flag: string;
  date: string;
  rating: number;
  text?: string;
}

interface MedicalService {
  reviews: Review[];
}

//
// ✅ Mock Data
//

const medical_service: MedicalService = {
  reviews: [
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
    },
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
    },
    {
      name: 'Ahmed Muhammad',
      profile: '/img/Homepage/Test.jpg',
      country: 'Saudi Arabia',
      flag: '🇸🇦',
      date: 'August 2025',
      rating: 3,
      text: 'We had such a lovely experience where we really enjoyed and met the elephants during the whole day...'
    },
    {
      name: 'Ahmed Muhammad',
      profile: '/img/Homepage/Test.jpg',
      country: 'Qatar',
      flag: '🇶🇦',
      date: 'August 2025',
      rating: 2,
      text: 'We had such a lovely experience where we really enjoyed and met the elephants during the whole day...'
    },
    {
      name: 'Wunna Kaungmyat',
      profile: '/img/Homepage/Test.jpg',
      country: 'Myanmar',
      flag: '🇲🇲',
      date: 'August 2025',
      rating: 1,
    },
    
  ]
};

//
// ✅ Component
//
const Reviews = () => {
  const reviews = medical_service.reviews;
  const [filter, setFilter] = useState<number | null>(null);
  const [page, setPage] = useState<number>(1);
  const [sortOrder, setSortOrder] = useState<'ascend' | 'descend' | null>(null);

  const REVIEWS_PER_PAGE = 4;

  // ✅ Filter logic
  let filteredReviews = filter
    ? reviews.filter((review: Review) => review.rating === filter)
    : [...reviews];

  // ✅ Sort logic
  if (sortOrder === 'ascend') {
    filteredReviews.sort((a, b) => a.rating - b.rating);
  } else if (sortOrder === 'descend') {
    filteredReviews.sort((a, b) => b.rating - a.rating);
  }

  // ✅ Pagination logic
  const nonEmptyReviews = filteredReviews.filter(r => r.text && r.text.trim() !== '');
const totalPages = Math.ceil(nonEmptyReviews.length / REVIEWS_PER_PAGE);
const startIndex = (page - 1) * REVIEWS_PER_PAGE;
const currentReviews = nonEmptyReviews.slice(startIndex, startIndex + REVIEWS_PER_PAGE);


  // ✅ Handlers
  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleFilterChange = (value: number | null) => {
    setFilter(value);
    setPage(1);
  };

  const toggleSort = () => {
    if (sortOrder === null) setSortOrder('ascend');
    else if (sortOrder === 'ascend') setSortOrder('descend');
    else setSortOrder(null);
    setPage(1);
  };

  // ✅ Overall rating calculations
const totalReviews = reviews.length;
const averageRating = (
  reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
).toFixed(1);

// Count of each star rating (5 → 1) with width
const ratingCounts: { stars: number; count: number; width: number }[] = [5, 4, 3, 2, 1].map(
  (star) => {
    const count = reviews.filter((r) => r.rating === star).length;
    return { stars: star, count, width: 0 }; // initialize width
  }
);

// Find max count for percentage calculation
const maxCount = Math.max(...ratingCounts.map((r) => r.count), 1);

// Add width for progress bar (as percentage)
ratingCounts.forEach((r) => {
  r.width = Math.round((r.count / maxCount) * 100);
});


  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-black">Review</h2>

      {/* Overall rating */}
      <div className="mb-6">
<div className="flex items-center gap-2 mb-4">
    <StarIcon className="w-4 h-4 text-yellow-400" />
    <span className="font-bold text-black">{averageRating}</span>
    <span className="text-sm text-gray-600">({totalReviews} reviews)</span>
  </div>

  {/* Rating breakdown */}
  <div className="space-y-2 mb-6">
    {ratingCounts.map((rating) => (
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

        {/* ⭐ Filter buttons & sort toggle */}
        <div className="flex gap-4 mb-6 text-sm flex-wrap items-center">
          <button
            onClick={() => handleFilterChange(null)}
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
              onClick={() => handleFilterChange(filter === star ? null : star)}
              className={`px-3 py-1 rounded-full border transition ${
                filter === star
                  ? 'bg-teal-500 text-white border-teal-500'
                  : 'text-teal-500 border border-teal-500 hover:bg-teal-50'
              }`}
            >
              {star} Star
            </button>
          ))}

          {/* Sorting toggle */}
          <button
            onClick={toggleSort}
            className="ml-auto border border-teal-500 rounded-full px-4 py-1 text-teal-500 hover:bg-teal-50 transition"
          >
            {sortOrder === 'ascend'
              ? 'Ascending ↑'
              : sortOrder === 'descend'
              ? 'Descending ↓'
              : 'No Sort'}
          </button>
        </div>
      </div>

      {/* Review list */}
      <div className="space-y-6">
        {currentReviews.filter(r => r.text && r.text.trim() !== '').length > 0 ? (
  currentReviews
    .filter(r => r.text && r.text.trim() !== '')
    .map((review: Review, index: number) => (
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

      {/* ✅ Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className={`p-1 rounded-full border ${
              page === 1 ? 'border-gray-300 text-gray-300' : 'border-teal-500 text-teal-500 hover:bg-teal-50'
            }`}
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>

          <span className="text-sm text-gray-700">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className={`p-1 rounded-full border ${
              page === totalPages
                ? 'border-gray-300 text-gray-300'
                : 'border-teal-500 text-teal-500 hover:bg-teal-50'
            }`}
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Reviews;

