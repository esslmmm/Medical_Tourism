import { useState } from "react";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

interface User {
  user_id: number;
  name: string;
}

interface Review {
  user_id: number;
  title_review: string;
  rating: number;
  comment: string;
  user: User;
}

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const [showFull, setShowFull] = useState(false);
  const MAX_LENGTH = 100; // Limit characters before truncating

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<FaStar key={i} className="text-yellow-500" />);
      } else if (i === Math.floor(rating) + 1 && rating % 1 !== 0) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-400" />);
      }
    }
    return stars;
  };

  return (
    <div className="bg-white shadow-lg border border-gray-200 p-6 w-full max-w-sm rounded-2xl">
      <h3 className="items-start font-bold">{review.user.name || "Anonymous"}</h3>
      <p className="text-sm font-semibold">"{review.title_review}"</p>
      <div className="flex items-center mt-2">{renderStars(review.rating)}</div>

      {/* Truncate Comment */}
      <p className="text-gray-700 mt-2 text-sm">
        {showFull || review.comment.length <= MAX_LENGTH
          ? review.comment
          : `${review.comment.substring(0, MAX_LENGTH)}...`}
      </p>

      {/* Show More Button */}
      {review.comment.length > MAX_LENGTH && (
        <button
          onClick={() => setShowFull(!showFull)}
          className="text-blue-500 text-sm font-medium mt-1 hover:underline"
        >
          {showFull ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
};

export default ReviewCard;
