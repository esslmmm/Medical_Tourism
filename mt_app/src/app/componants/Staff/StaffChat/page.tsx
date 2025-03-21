'use client';
import SideBar from './StaffChat/SideBar';
import Chat from './StaffChat/Chat';
import ShowPopUp from './StaffChat/ShowPopUp';



export default function UserDetail() {
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <SideBar />

            {/* Chat Section */}
            <Chat />

            {/* Popup Modal */}
            <ShowPopUp />
        </div>
    );
}
