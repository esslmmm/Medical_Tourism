import React, { useState } from "react";
import { User, Calendar, MessageCircle, LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation"; // Import usePathname
import { signOut } from "next-auth/react";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('booking');
  const router = useRouter();

  const menuItems = [
    { id: 'profile', label: 'Profile', icon: User, path: '/staff/profile' },
    { id: 'booking', label: 'Booking', icon: Calendar, path: '/staff/booking' },
    { id: 'chat', label: 'Chat', icon: MessageCircle, path: '/staff/chat' },
  ];

  const handleItemClick = (item: any) => {
    // Navigate to the path
    router.push(item.path); // Uncomment when you add router
    setActiveItem(item.id);
  };


  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  return (
    <div className={`w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white transition-all duration-300 ease-in-out flex flex-col justify-between shadow-xl`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center ml-5 justify-centers mb-8">
            <div className="text-2xl font-bold bg-clip-text">
              Dashboard
            </div>
        </div>

        {/* Navigation */}
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeItem === item.id;
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleItemClick(item)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                      isActive 
                        ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg transform scale-105' 
                        : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <IconComponent 
                      size={20} 
                      className={`${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'} transition-colors duration-200`}
                    />
                      <span className={`font-medium ${isActive ? 'font-semibold' : ''}`}>
                        {item.label}
                      </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-slate-700">
        <button
          className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-xl transition-all duration-200 group"
        >
          <LogOut 
            size={20} 
            className="text-slate-400 group-hover:text-red-400 transition-colors duration-200"
          />
            <span onClick={handleLogout} className="font-medium group-hover:text-red-400 transition-colors duration-200">
              Log Out
            </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;