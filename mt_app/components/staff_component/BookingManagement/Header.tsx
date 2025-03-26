'use client';
import { Link } from 'lucide-react'
import React from 'react'

const Header = () => {
  return (
    <div className="flex justify-between items-center bg-white p-4 shadow-md">
      {/* Logo */}
      <Link href="/staff/booking-management">
        <img src="/img/Logo_staff.png" alt="Logo" className="w-28 h-auto" />
      </Link>

      {/* User Profile */}
      <div className="flex items-center space-x-4 bg-gray-100 p-3 rounded-lg shadow-sm">
        <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
        <div>
          <p className="text-black font-semibold">Ekkarat Singkhala</p>
          <p className="text-xs text-gray-500">Junior Staff</p>
        </div>
      </div>
    </div>
  )
}

export default Header
