'use client';
import SideBar from './Components/SideBar';
import Chat from './Components/Chat';
import NavbarUserChat from "./Components/NavbarUserChat";
import Footer from "./Components/Footer";

export default function UserChat() {

    return (
        <div className="flex flex-col h-screen">
            <NavbarUserChat />
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar (Fixed Width) */}
                <SideBar />
                {/* Chat Section (Must take full width and height) */}
                <div className="flex flex-1 h-full w-full">
                    <Chat />
                </div>
            </div>
            <Footer />
        </div>
    );
}
