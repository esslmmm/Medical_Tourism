import React from "react";
import { FaStar } from "react-icons/fa";

const InterpreterDetails = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-80 mx-auto">
      {/* Profile Picture */}
      <div className="relative flex flex-col items-center">
        <img
          src="/img/interpreter.png" 
          alt="Interpreter"
          className="w-28 h-28 rounded-full border-4 border-gray-200"
        />
        <span className="absolute bottom-1 right-2 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
      </div>

      {/* Name & Role */}
      <h2 className="text-xl font-semibold text-center mt-3">Duygu Muhurdar</h2>
      <p className="text-gray-500 text-center">English Interpreter</p>

      {/* Rating */}
      <div className="flex items-center justify-center mt-2">
        {[...Array(4)].map((_, i) => (
          <FaStar key={i} className="text-yellow-400 text-lg" />
        ))}
        <FaStar className="text-gray-300 text-lg" /> {/* Half star effect */}
        <span className="ml-2 text-gray-600 text-sm font-semibold">4.2</span>
      </div>

      {/* Personal Details */}
      <div className="mt-4 space-y-2 text-sm">
        <p>
          <span className="font-semibold">Age:</span> 24
        </p>
        <p>
          <span className="font-semibold">Amount Of Deal:</span> 125
        </p>
        <p>
          <span className="font-semibold">Experience:</span> 5 years
        </p>
        <p>
          <span className="font-semibold">Country:</span> UK
        </p>
        <p>
          <span className="font-semibold">Email:</span> Duygu.Mhd@gmail.com
        </p>
      </div>

      {/* Language Proficiency */}
      <div className="mt-4">
        <h3 className="text-md font-semibold">Languages</h3>
        <div className="mt-2">
          <p className="text-sm text-gray-700">English 100%</p>
          <div className="w-full bg-gray-200 h-1 rounded-md">
            <div className="bg-yellow-500 h-1 w-full rounded-md"></div>
          </div>
        </div>
        <div className="mt-2">
          <p className="text-sm text-gray-700">Thai 80%</p>
          <div className="w-full bg-gray-200 h-1 rounded-md">
            <div className="bg-yellow-500 h-1 w-4/5 rounded-md"></div>
          </div>
        </div>
        <div className="mt-2">
          <p className="text-sm text-gray-700">Spanish 80%</p>
          <div className="w-full bg-gray-200 h-1 rounded-md">
            <div className="bg-yellow-500 h-1 w-4/5 rounded-md"></div>
          </div>
        </div>
      </div>

      {/* Education */}
      <div className="mt-6">
        <h3 className="text-md font-semibold">Education</h3>
        <ul className="list-disc pl-4 text-sm text-gray-700 mt-2">
          <li>
            <span className="font-semibold">Istanbul Technical University</span> - M.M: Ethnomusicology, Coursework in Ethnomusicology & Music Business.
          </li>
          <li>
            <span className="font-semibold">Certificate Program: Jazz Studies</span> - Bahçeşehir University, Istanbul. Coursework in Jazz Vocals, Jazz History, and Jazz Theory.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default InterpreterDetails;
