import React from "react";

interface Education {
  institution: string;
  degree: string;
}

interface InterpreterEducationProps {
  education?: Education[];
}

const InterpreterEducation: React.FC<InterpreterEducationProps> = ({ education = [] }) => {
  return (
    <div className="mt-4">
      <h4 className="font-semibold text-gray-700">Education</h4>
      <ul className="list-disc list-inside text-gray-700 pl-4">
        {education.map((edu, index) => (
          <li key={index}>
            <strong>{edu.institution}</strong> - {edu.degree}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InterpreterEducation;
