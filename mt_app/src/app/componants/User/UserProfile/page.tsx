'use client';
import SideBar from './UserProfile/SideBar';
import Profile from './UserProfile/Profile';

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
