'use client'
import Footer from "../../../components/user_components/Main/Footer";
import Navbarpro from "../../../components/user_components/Main/Navbarpro";
import Review from "../../../components/user_components/UserReviews/Review";
import SideBar from "../../../components/user_components/UserReviews/SideBar";


export default function UserReviews() {
    return (
        <div >
            <Navbarpro />
            <div className="flex">
            {/* Sidebar */}
            <SideBar />
            {/* Reviews Section */}
            <Review />
            </div>
            <Footer />
        </div>
    );
}
