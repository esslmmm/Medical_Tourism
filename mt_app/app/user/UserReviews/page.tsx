'use client'
import Review from "../../../components/user_components/UserReviews/Review";
import SideBar from "../../../components/user_components/UserReviews/SideBar";


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
