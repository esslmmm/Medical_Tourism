'use client';
import SideBar from '../../../components/staff_component/StaffProfile/SideBar';
import Profile from '../../../components/staff_component/StaffProfile/Profile';
import TopRightProfile from '../../../components/staff_component/StaffProfile/TopRightProfile';

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
