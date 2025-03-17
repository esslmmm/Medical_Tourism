import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <div className="flex items-center bg-gray-200 p-3 rounded-md w-4/5 max-w-2xl mb-6">
      <FaSearch className="text-gray-500 mr-3" />
      <input type="text" className="w-full bg-transparent outline-none" placeholder="Search History" />
    </div>
  );
};

export default SearchBar;
