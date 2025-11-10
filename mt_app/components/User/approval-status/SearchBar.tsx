import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <div className="flex items-center bg-white border border-[#D9D9D9] p-3 rounded-full w-4/5 max-w-4xl mb-6 shadow-sm hover:ring-2 ring-gray-400 transition">
      <FaSearch className="text-gray-300 mx-3 w-5 h-5" />
      <input
        type="text"
        className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500"
        placeholder="Search History"
      />
    </div>
  );
};

export default SearchBar;
