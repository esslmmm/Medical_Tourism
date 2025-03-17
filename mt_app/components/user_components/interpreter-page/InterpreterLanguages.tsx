import React from "react";

interface Language {
  name: string;
  level: number;
}

interface InterpreterLanguagesProps {
  languages?: Language[];
}

const InterpreterLanguages: React.FC<InterpreterLanguagesProps> = ({ languages = [] }) => {
  return (
    <div className="mt-4">
      <h4 className="font-semibold text-gray-700">Languages</h4>
      {languages.map((lang, index) => (
        <div key={index} className="flex items-center gap-3 mt-1">
          <span className="w-16 text-right text-gray-600">{lang.name}</span>
          <div className="flex-1 bg-gray-300 h-2 rounded-md">
            <div className="bg-blue-500 h-2 rounded-md" style={{ width: `${lang.level}%` }}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InterpreterLanguages;
