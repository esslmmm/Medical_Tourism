'use client';
import SideBar from '../../../components/user_components/UserChat/SideBar';
import Chat from '../../../components/user_components/UserChat/Chat';
// import NavbarUserChat from "../../../components/user_components/UserChat/NavbarUserChat";
// import Footer from "../../../components/user_components/UserChat/Footer";

export default function UserChat() {

    return (
        <div className="flex flex-col h-screen">
            {/* <NavbarUserChat /> */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar (Fixed Width) */}
                <SideBar />
                {/* Chat Section (Must take full width and height) */}
                <div className="flex flex-1 h-full w-full">
                    <Chat />
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    );
}
