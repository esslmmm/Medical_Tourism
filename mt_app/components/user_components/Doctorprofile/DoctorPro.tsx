"use client";

import Image from "next/image";
import { Poppins } from "next/font/google";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DoctorCardSkeleton from "../skeleton-screen/DoctorProfile/DoctorCardSkeleton";
// import DoctorCardSkeleton from "../skeleton-screen/DoctorCardSkeleton"

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "500", "700"] });

interface Hospital {
  logo: string;
}

interface Language {
  language_id: number;
  languages: string;
}

interface Doctor {
  doctor_id: number;
  name: string;
  specialization: string;
  hospital_id: number;
  description: string;
  image: string;
  doc_language: Language[];
  hospital: Hospital[];
}

const DoctorProfile = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDoctor() {
      try {
        const response = await fetch(`/api/services/doctors/${id}`);
        if (!response.ok) throw new Error("Failed to fetch doctor details");

        const doctorData = await response.json();
        setDoctor(doctorData);

        // Fetch hospital details using doctor.hospital_id
        if (doctorData.hospital_id) {
          const hospitalResponse = await fetch(`/api/services/hospitals/${doctorData.hospital_id}`);
          if (!hospitalResponse.ok) throw new Error("Failed to fetch hospital details");

          const hospitalData = await hospitalResponse.json();
          setHospital(hospitalData);
        }
      } catch (error) {
        setError("Error fetching details.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchDoctor();
  }, [id]);

  if (loading || !doctor) {
    return <DoctorCardSkeleton />;
  }
  if (error) return <p className="text-center text-red-500">{error}</p>;

  
  return (
    <div>
      <div className="flex items-center justify-center mx-auto w-270 h-60 shadow-lg shadow-[#792AA7]/15 rounded-2xl p-6 border border-[#DBCEF8] m-10 bg-[#F2F2F8]/70">
        {/* Doctor Image */}
        <div className="w-40 h-40 rounded-full overflow-hidden flex mr-6">
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
          <p className={`ml-4 mt-5 text-[#47764C] font-bold ${poppins.className}`} style={{ fontSize: "30px" }}>
            {doctor.specialization}
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-4  rounded-4xl flex items-center px-6 py-3 mx-auto w-270 h-15 shadow-lg shadow-[#792AA7]/15 bg-white">
        {/* First Part */}
        <p className={`flex-1 text-center font-bold text-[#382E2E] text-xl ${poppins.className}`}>
          {doctor.specialization}
        </p>

        {/* Vertical Line */}
        <div className="h-15 w-[2px] bg-gray-200"></div>

        {/* Second Part (Logo Centered) */}
        <div className="flex-1 flex justify-center">
          {hospital ? (
            <Image src={hospital.logo} alt="Hospital Logo" width={130} height={20} />
          ) : (
            <p className="text-gray-400">No Logo Available</p>
          )}
        </div>

        {/* Vertical Line */}
        <div className="h-15 w-[2px] bg-gray-200"></div>

        {/* Third Part */}
        <p className={`flex-1 text-center font-bold text-[#382E2E] text-xl ${poppins.className}`}>
          {doctor.doc_language?.map((lang) => lang.languages).join(" & ") || "No Languages"}
        </p>
      </div>
    </div>
  );
};

export default DoctorProfile;

