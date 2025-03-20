'use client';
import SideBar from '../../../components/user_components/UserProfile/SideBar';
import Profile from '../../../components/user_components/UserProfile/Profile';

export default function UserProfile() {

    return (
        <div className="flex full-screen">
            {/* Sidebar */}
            <SideBar />

            {/* Profile Section */}
            <Profile />
        </div>
    );
}
