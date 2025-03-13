import React from "react";
import { FaStar } from "react-icons/fa";
import { Interpreter } from "./types";

interface InterpreterListProps {
  interpreters: Interpreter[];
  selectedInterpreter: Interpreter;
  setSelectedInterpreter: (interpreter: Interpreter) => void;
  setReviews: (reviews: any[]) => void;
  generateReviews: () => any[];
}

const InterpreterList: React.FC<InterpreterListProps> = ({
  interpreters,
  selectedInterpreter,
  setSelectedInterpreter,
  setReviews,
  generateReviews
}) => {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 bg-background p-4 rounded-lg shadow-md">
      {interpreters.map((item) => (
        <div
          key={item.id}
          className={`border-2 rounded-lg p-6 w-56 text-center cursor-pointer transition-all duration-300 ${
            selectedInterpreter.id === item.id
              ? "border-primary shadow-lg bg-white scale-105"
              : "border-gray-200 bg-white"
          } hover:shadow-md hover:scale-105`}
          onClick={() => {
            setSelectedInterpreter(item);
            setReviews(generateReviews());
          }}
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-24 h-24 rounded-full mx-auto border-2 border-primary shadow-sm"
          />
          <h4 className="mt-2 font-bold text-primary">{item.role}</h4>
          <p className="text-gray-600">{item.name}</p>
          <div className="flex items-center justify-center gap-1 text-yellow-500 mt-2">
            <FaStar /> {item.rating} ({item.reviews})
          </div>
        </div>
      ))}
    </div>
  );
};

export default InterpreterList;
