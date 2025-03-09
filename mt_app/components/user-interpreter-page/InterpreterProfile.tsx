import React from "react";
import { Interpreter } from "@/components/user-interpreter-page/types";

interface InterpreterProfileProps {
  interpreter: Interpreter;
}

const InterpreterProfile: React.FC<InterpreterProfileProps> = ({ interpreter }) => {
  return (
    <div className="w-1/3 bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <img
        src={interpreter.image}
        alt={interpreter.name}
        className="w-24 h-24 rounded-full mx-auto border-4 border-secondary shadow-md"
      />
      <h3 className="text-center text-xl font-bold text-primary mt-3">
        {interpreter.name}
      </h3>
      <p className="text-center text-gray-600">{interpreter.role}</p>

      <div className="mt-4 space-y-2">
        <p>
          <strong>Age:</strong> <span className="text-gray-700">{interpreter.age}</span>
        </p>
        <p>
          <strong>Deals:</strong> <span className="text-gray-700">{interpreter.deals}</span>
        </p>
        <p>
          <strong>Experience:</strong> <span className="text-gray-700">{interpreter.experience}</span>
        </p>
        <p>
          <strong>Country:</strong> <span className="text-gray-700">{interpreter.country}</span>
        </p>
        <p>
          <strong>Email:</strong> <span className="text-blue-500">{interpreter.email}</span>
        </p>
      </div>
    </div>
  );
};

export default InterpreterProfile;
