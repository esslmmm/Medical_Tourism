'use client';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import Image from 'next/image';

interface Review {
  title: string;
  rating: number;
  content: string;
  date: string;
}

interface Interpreter {
  id: number;
  name: string;
  role: string;
  image: string;
  rating: number;
  reviews: number;
  age?: number;
  experience?: string;
  country?: string;
  email?: string;
  bio?: string;
  reviewsData?: Review[];
}

interface InterpreterProfileProps {
  interpreter: Interpreter | null;
}

const InterpreterProfile: React.FC<InterpreterProfileProps> = ({ interpreter }) => {
  if (!interpreter) {
    return (
      <div className="text-center text-gray-500 p-10">
        Select an interpreter to view details
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-10 p-8 max-w-6xl mx-auto bg-gray-100 rounded-lg shadow-md">
      {/* Left Sidebar - Profile Details */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full lg:w-1/3">
        <div className="flex flex-col items-center text-center">
          <Image
            src={interpreter.image || '/default-avatar.png'}
            alt={interpreter.name || 'Unknown'}
            width={120}
            height={120}
            className="rounded-full border-2 border-gray-300"
          />
          <h2 className="text-xl font-bold mt-4">{interpreter.name ?? 'Unknown'}</h2>
          <p className="text-gray-600">{interpreter.role ?? 'No role available'}</p>
          <div className="text-yellow-400 flex items-center gap-1 mt-2">
            <FaStar /> {interpreter.rating ?? 'N/A'} ({interpreter.reviews ?? 0} reviews)
          </div>
        </div>

        {/* Additional Details */}
        <div className="mt-6">
          <p className="text-gray-600"><strong>Age:</strong> {interpreter.age ?? 'N/A'}</p>
          <p className="text-gray-600"><strong>Amount of Deals:</strong> {interpreter.reviews ?? 0}</p>
          <p className="text-gray-600"><strong>Experience:</strong> {interpreter.experience ?? 'N/A'}</p>
          <p className="text-gray-600"><strong>Country:</strong> {interpreter.country ?? 'Unknown'}</p>
          <p className="text-gray-600"><strong>Email:</strong> {interpreter.email ?? 'Not provided'}</p>
        </div>
      </div>

      {/* Right Content - About and Reviews */}
      <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold">I’m {interpreter.name ?? 'Unknown'}</h1>
        <p className="text-gray-600 mt-2">{interpreter.bio ?? 'No bio available'}</p>

        {/* Reviews */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Reviews</h2>
          {interpreter.reviewsData && interpreter.reviewsData.length > 0 ? (
            interpreter.reviewsData.map((review: Review, index: number) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg mt-4">
                <h3 className="font-semibold flex items-center gap-1">
                  "{review.title}" <FaStar className="text-yellow-400" /> {review.rating}
                </h3>
                <p className="text-gray-600 text-sm">{review.content}</p>
                <p className="text-gray-400 text-xs">Reviewed {review.date}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600 mt-2">No reviews available.</p>
          )}
        </div>

        {/* Continue Button */}
        <div className="flex justify-end mt-6">
          <button className="bg-black text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-800 transition duration-200">CONTINUE</button>
        </div>
      </div>
    </div>
  );
};

export default InterpreterProfile;