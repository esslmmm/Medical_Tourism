import React from "react";

interface CertificateCardProps {
  year: string;
  field: string;
  institution: string;
}

const CertificateCard: React.FC<CertificateCardProps> = ({ year, field, institution }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center mt-4">
      <p className="text-blue-500 font-semibold">{year}</p>
      <p className="font-semibold">{field}</p>
      <p className="text-gray-500">{institution}</p>
    </div>
  );
};

export default CertificateCard;
