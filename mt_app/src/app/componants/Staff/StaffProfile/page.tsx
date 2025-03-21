'use client';
import SideBar from './StaffProfile/SideBar';
import Profile from './StaffProfile/Profile';
import TopRightProfile from './StaffProfile/TopRightProfile';

export default function UserProfile() {
    

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <SideBar />

            {/* Main Content */}
            <main className="flex-1 bg-gray-50 flex flex-col p-6">
                {/* Top Right Profile */}
                <TopRightProfile />

                {/* Profile Section */}
                <Profile />
            </main>
        </div>
    );
}
