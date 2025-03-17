import React from "react";
import { FaEdit } from "react-icons/fa";

const InterpreterIntro: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 relative">
      {/* Edit Button */}
      <FaEdit className="absolute top-4 right-4 text-gray-500 cursor-pointer hover:text-blue-500 transition-all duration-300" />

      {/* Self Introduction Content */}
      <h2 className="text-xl font-semibold mb-2">I'm Duygu Muhurdar</h2>
      <h3 className="text-gray-600 mb-4">English Interpreter</h3>
      <p className="text-gray-700 leading-relaxed">
        I am Duygu, a music programmer, booking agent, and an ethnomusicologist.
        I’ve been working in the music industry with an experience close to a decade
        now as a booker, live event producer, singer, and music writer. My strengths
        are in bookings, research, communications, content, and project development.
        I am backed by my training in international relations and music.
      </p>
    </div>
  );
};

export default InterpreterIntro;
