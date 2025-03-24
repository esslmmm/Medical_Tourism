'use client'
import Footer from "../../../../../components/user_components/Main/Footer";
import Navbarpro from "../../../../../components/user_components/Main/Navbarpro";
import Review from "../../../../../components/user_components/UserReviews/Review";
import SearchBar from "../../../../../components/user_components/approval-status/SearchBar";



export default function UserReviews() {
    return (
            <div className="flex-1 p-8 flex flex-col items-center">
            <SearchBar />
            {/* Reviews Section */}
            <Review />
            </div>
    );
}
