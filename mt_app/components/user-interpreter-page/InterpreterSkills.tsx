import React from "react";

interface InterpreterSkillsProps {
  skills?: string[];
}

const InterpreterSkills: React.FC<InterpreterSkillsProps> = ({ skills = [] }) => {
  return (
    <div className="mt-4">
      <h4 className="font-semibold text-gray-700">Skills</h4>
      <ul className="list-disc list-inside text-gray-700 pl-4">
        {skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </div>
  );
};

export default InterpreterSkills;
