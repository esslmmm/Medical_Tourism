'use client';
import SideBar from '../../../components/user_components/UserProfile/SideBar';
import Profile from '../../../components/user_components/UserProfile/Profile';

export default function UserProfile() {
    return (
        <div className="flex flex-col md:flex-row h-screen bg-gray-100">
            <SideBar />
            <Profile />
        </div>
    );
}