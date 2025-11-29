import Image from "next/image";

interface Doctor {
  doctor_id: number;
  name: string;
  specialization: string;
  description: string;
  image: string;
}

interface DoctorProfileProps {
  doctor: Doctor | null;
}

const DoctorProfile: React.FC<DoctorProfileProps> = ({ doctor }) => {
  if (!doctor) return null;

  return (
    <div className="w-full py-12 border-b-1 border-gray-300 shadow-md bg-gray-50 ">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center bg-opacity-80  rounded-3xl p-8 md:p-12 transition-transform transform hover:scale-105">
        
        {/* Doctor Image */}
        <div className="w-64 h-64 rounded-full overflow-hidden shadow-lg border-4 text-green-900 flex-shrink-0">
          <Image
            src={doctor.image}
            alt={doctor.name}
            width={256}
            height={256}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Doctor Information */}
        <div className="mt-6 md:mt-0 md:ml-10 text-center md:text-left flex-1">
          <h2 className="text-4xl md:text-5xl font-extrabold text-green-900">
            {doctor.name}
          </h2>
          <p className="text-xl md:text-2xl font-semibold text-[#47764C] mt-2">
            Specialist: {doctor.specialization}
          </p>
          <p className="text-md md:text-lg text-gray-700 mt-4 leading-relaxed">
            {doctor.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
