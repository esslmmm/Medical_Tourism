import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

const RatingReview = () => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");

    const handleRating = (rate: number) => {
        setRating(rate);
    };

    const handleSubmit = () => {
        console.log("Rating:", rating);
        console.log("Review:", review);
    };

    return (
        <div className="max-w-md mx-auto p-4 shadow-md rounded-lg bg-white">
            <div className="flex items-center space-x-3">
                <img
                    src="/package-image.jpg"
                    alt="Basic Check-Up Package"
                    className="w-16 h-16 rounded-md"
                />
                <div>
                    <h2 className="text-sm font-semibold">
                        Basic Check-Up And Travel Package - MFU Hospital
                    </h2>
                </div>
            </div>
            <div className="mt-4 text-center">
                <p className="text-lg font-semibold">What is your rate</p>
                <div className="flex justify-center mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            onClick={() => handleRating(star)}
                            className={`w-8 h-8 cursor-pointer ${star <= rating ? "text-yellow-500" : "text-gray-300"
                                }`}
                            fill={star <= rating ? "#FBBF24" : "none"}
                        />
                    ))}
                </div>
            </div>
            <div className="mt-4">
                <p className="text-center font-medium">Please share your opinion about the service</p>
                <Textarea
                    className="mt-2 w-full p-2 border rounded-md"
                    rows={4}
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Write your review here..."
                />
            </div>
            <Button className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white" onClick={handleSubmit}>
                SEND REVIEW
            </Button>
        </div>
    );
};

export default RatingReview;
