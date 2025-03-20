'use client';
import PackageCard from '../../../components/user_components/ReviewPopUp/PackageCard';
import StarRating from '../../../components/user_components/ReviewPopUp/StarRating';
import ReviewInput from '../../../components/user_components/ReviewPopUp/ReviewInput';
import NavbarReviewPopUp from "../../../components/user_components/ReviewPopUp/NavbarReviewPopUp";
import Footer from "../../../components/user_components/ReviewPopUp/Footer";

const ReviewCard = () => {
    return (
        <div>
            <NavbarReviewPopUp />
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 text-black">

                    {/* Package Details Card */}
                    <PackageCard />

                    {/* Star Rating Section */}
                    <StarRating />

                    {/* Review Input Section */}
                    <ReviewInput />

                    {/* Submit Button */}
                    <button className="mt-6 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-gray-600">
                        SEND REVIEW
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ReviewCard;

