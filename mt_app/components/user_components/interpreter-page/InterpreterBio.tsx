import React from "react";
import { Interpreter } from "./types";

interface InterpreterBioProps {
  interpreter: Interpreter;
}

const InterpreterBio: React.FC<InterpreterBioProps> = ({ interpreter }) => {
  return (
    <div className="border-2 rounded-lg p-6 bg-white shadow-md mb-6">
      <h1 className="text-2xl font-bold">I'm {interpreter.name}</h1>
      <h3 className="text-gray-600 text-lg">{interpreter.role}</h3>
      <p className="mt-4 text-gray-700">{interpreter.bio}</p>
    </div>
  );
};

export default InterpreterBio;
