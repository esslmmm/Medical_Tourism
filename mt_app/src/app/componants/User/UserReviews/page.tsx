'use client'
import Review from "./UserReviews/Review";
import SideBar from "./UserReviews/SideBar";


export default function UserReviews() {
    

    return (
        <div className="flex full-screen">
            {/* Sidebar */}
            <SideBar />
            {/* Reviews Section */}
            <Review />
        </div>
    );
}
