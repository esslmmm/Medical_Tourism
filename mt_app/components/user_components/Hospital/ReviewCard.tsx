import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

interface Review {
  name: string;
  title: string;
  rating: number;
  content: string;
}

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-500" />);
      } else if (i - 0.5 === rating) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-400" />);
      }
    }
    return stars;
  };

  return (
    <div className="bg-white shadow-lg border border-gray-200 p-6 w-100 rounded-2xl">
      <h3 className="items-start font-bold">{review.name}</h3>
      <p className="text-sm font-semibold">"{review.title}"</p>
      <div className="flex items-center mt-2">{renderStars(review.rating)}</div>
      <p className="text-gray-700 mt-2 text-sm">{review.content}</p>
    </div>
  );
};

export default ReviewCard;
