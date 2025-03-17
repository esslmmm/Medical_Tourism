"use client";

import Image from "next/image";
import { Poppins } from "next/font/google";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "500", "700"] });

// const doctorInfo = {
//   name: "Dr. Sithiphol Chinnapongse",
//   description:
//     "Dermatologist specializes in skin conditions and aesthetics, including skin allergies and inflammation",
//   specialization: "Dermatology",
//   spokenLanguage: "Thai & English",
//   image: "/img/DoctorList/doctor4.png", // Replace with actual doctor image
//   logo: "/img/DoctorProfile/Bangkoklogo.png", // Replace with actual hospital logo
// };

interface Language {
  language_id: number;
  languages: string;
}

interface Doctor {
  doctor_id: number;
  name: string;
  specialization: string;
  hospital_id: string;
  description: string;
  image: string;
  doc_language: Language[];
}

const DoctorProfile = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDoctor() {
      try {
        const response = await fetch(`/api/doctors/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch doctor details");
        }
        const data = await response.json();
        setDoctor(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchDoctor();
  }, [id]);

  if (loading) return <p className="text-center text-gray-500">Loading doctor details...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!doctor) return <p className="text-center text-gray-500">Doctor not found</p>;

  return (
    <div>
      <div className="flex items-center justify-center mx-auto w-270 h-60 shadow-lg shadow-[#792AA7]/15 rounded-2xl p-6 border border-[#DBCEF8] m-10 bg-[#F2F2F8]/70 ">
        {/* Doctor Image */}
        <div className="w-40 h-40 rounded-full overflow-hidden flex mr-6 ">
          <Image
            src={doctor.image}
            alt={doctor.name}
            width={150}
            height={150}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Doctor Information */}
        <div className="ml-4">
          <h2 className={`ml-2 text-xl font-bold text-[#023F76] ${poppins.className}`} style={{ fontSize: "36px" }}>
            {doctor.name}
          </h2>
          <div className="flex items-center mb-2">
            <hr className="w-65 border-t-3 border-[#293625]" />
            <hr className="w-65 border-t-3 border-[#30329F]" />
          </div>
          <p className={`ml-5 mr-10 text-[#000000] font-light mt-1 ${poppins.className}`} style={{ fontSize: "16px" }}>
            {doctor.description}
          </p>
          <p className={`ml-4 mt-5 text-[#47764C] font-bold mt-1 ${poppins.className}`} style={{ fontSize: "30px" }}>
            {doctor.specialization}
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-4 bg-gray-100 rounded-4xl flex items-center px-6 py-3 mx-auto w-270 h-15 shadow-lg shadow-[#792AA7]/15 bg-white">
        {/* First Part */}
        <p className={`flex-1 text-center font-bold text-[#382E2E] text-xl ${poppins.className}`}>
          {doctor.specialization}
        </p>

        {/* Vertical Line */}
        <div className="h-15 w-[2px] bg-gray-200"></div>

        {/* Second Part (Logo Centered) */}
        <div className="flex-1 flex justify-center">
          <Image src={doctor.hospital_id} alt="Hospital Logo" width={130} height={20} />
        </div>

        {/* Vertical Line */}
        <div className="h-15 w-[2px] bg-gray-200"></div>

        {/* Third Part */}
        <p className={`flex-1 text-center font-bold text-[#382E2E] text-xl ${poppins.className}`}>
          {doctor.doc_language.map((lang) => lang.languages).join(" & ")}
        </p>

      </div>
    </div>
  );
};

export default DoctorProfile;