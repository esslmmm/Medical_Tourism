'use client'

import Review from "@/components/User/UserReviews/Review";
import SearchBar from "@/components/User/approval-status/SearchBar";



export default function UserReviews() {
    return (
            <div className="flex-1 p-8 flex flex-col items-center">
            <SearchBar />
            {/* Reviews Section */}
            <Review />
            </div>
    );
}
