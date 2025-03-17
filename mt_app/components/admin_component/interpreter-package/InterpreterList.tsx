import React, { useState } from "react";
import { BsFunnel } from "react-icons/bs";

const interpreters = [
  {
    name: "Duygu Muhurdar",
    language: "English Interpreter",
    rating: 4.8,
    reviews: 42,
    image: "/img/interpreter.png",
  },
  {
    name: "Vanessa Leiva",
    language: "Arabic Interpreter",
    rating: 4.2,
    reviews: 20,
    image: "/img/interpreter.png",
  },
  {
    name: "Sek Han Foo",
    language: "Chinese Interpreter",
    rating: 4.0,
    reviews: 30,
    image: "/img/interpreter.png",
  },
  {
    name: "Rayji De Guia",
    language: "Burmese Interpreter",
    rating: 3.8,
    reviews: 15,
    image: "/img/interpreter.png",
  },
];

const InterpreterList: React.FC = () => {
  const [selectedInterpreter, setSelectedInterpreter] = useState(0);

  return (
    <div>
      {/* Header with Filter Icon */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Select an Interpreter</h2>
        <BsFunnel className="text-gray-600 text-2xl cursor-pointer hover:text-blue-500 transition-all duration-300" />
      </div>

      {/* List of Interpreters */}
      <div className="flex space-x-6 overflow-x-auto p-4">
        {interpreters.map((interpreter, index) => (
          <div
            key={index}
            onClick={() => setSelectedInterpreter(index)}
            className={`bg-white rounded-xl shadow-md p-6 border cursor-pointer transition-all duration-300 ${
              selectedInterpreter === index
                ? "border-blue-500 shadow-lg scale-105"
                : "border-gray-200 hover:border-gray-400"
            }`}
          >
            <img
              src={interpreter.image}
              alt={interpreter.name}
              className="w-20 h-20 rounded-full mx-auto"
            />
            <h3 className="text-lg font-semibold text-center mt-3">
              {interpreter.language}
            </h3>
            <p className="text-gray-600 text-center">{interpreter.name}</p>
            <p className="text-yellow-500 text-center mt-2">
              {"⭐".repeat(Math.round(interpreter.rating))} ({interpreter.reviews})
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterpreterList;
