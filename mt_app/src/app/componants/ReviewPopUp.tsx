'use client';
import { useState } from "react";
import { Star } from "lucide-react";

const ReviewCard = () => {
    const [rating, setRating] = useState(4);
    const [review, setReview] = useState("");

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 text-black">

                {/* Package Details Card */}
                <div className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg shadow-md">
                    {/* <img
                        src="https://via.placeholder.com/60"
                        alt="Package"
                        className="w-16 h-16 rounded-md object-cover"
                    /> */}
                    <div className="w-16 h-16 bg-gray-300 rounded mr-4"></div>
                    <div>
                        <h3 className="text-lg font-semibold">Basic Check-Up And Travel Package</h3>
                        <p className="text-sm text-gray-600">MFU Hospital</p>
                    </div>
                </div>

                {/* Star Rating Section */}
                <div className="mt-6 text-center">
                    <h4 className="text-sm font-medium">What is your rate</h4>
                    <div className="flex justify-center space-x-1 mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                size={24}
                                className={`cursor-pointer ${star <= rating ? "text-yellow-500" : "text-gray-300"
                                    }`}
                                onClick={() => setRating(star)}
                            />
                        ))}
                    </div>
                </div>

                {/* Review Input Section */}
                <div className="mt-6 text-center">
                    <label className="text-sm font-medium block">
                        Please share your opinion about the service
                    </label>
                    <textarea
                        className="w-full mt-2 border rounded-md p-2 h-24 text-black"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                    />
                </div>

                {/* Submit Button */}
                <button className="mt-6 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-gray-600">
                    SEND REVIEW
                </button>
            </div>
        </div>
    );
};

export default ReviewCard;

