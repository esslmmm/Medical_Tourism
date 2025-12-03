'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { 
  Users, 
  Building, 
  Package, 
  Calendar, 
  MessageSquare, 
  BarChart3,
  LogOut,
  User,
  Stethoscope,
  MapPin,
  Route,
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const menuItems = [
    { name: 'Profile', href: '/admin/profile', icon: User },
    { name: 'Booking Management', href: '/admin/booking', icon: Calendar },
    { name: 'Payment Management', href: '/admin/payment', icon:  BarChart3 },
    { name: 'Hospital Management', href: '/admin/hospital', icon: Building },
    { name: 'Package Management', href: '/admin/packages', icon: Package },
    { name: 'Doctor Management', href: '/admin/doctors', icon: Stethoscope },
    { name: 'Place Management', href: '/admin/places', icon: MapPin },
    { name: 'Trip Management', href: '/admin/trips', icon: Route },
    { name: 'User Management', href: '/admin/user', icon: Users },
    { name: 'Customer Feedback', href: '/admin/contact-us', icon: MessageSquare },
  ];

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  return (
    <div className="bg-blue-900 text-white w-64 min-h-screen p-4 flex flex-col justify-between shadow-xl">
      <div>
        <div className="mb-8 flex justify-center items-center">
        <Link href="/admin">
          <img src="/img/Footer&Navbar/Medical Tourism.png" alt="Logo" className="w-30 h-auto" />
        </Link>
        </div>
        
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center p-3 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-blue-700 text-white' 
                        : 'text-blue-100 hover:bg-blue-800'
                    }`}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-700">
          <button
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-xl transition-all duration-200 group cursor-pointer"
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