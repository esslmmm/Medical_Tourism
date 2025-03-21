'use client';
import SideBar from '../../../components/staff_component/StaffChat/SideBar';
import Chat from '../../../components/staff_component/StaffChat/Chat';
import ShowPopUp from '../../../components/staff_component/StaffChat/ShowPopUp';



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
