import Image from "next/image";
import { Poppins } from "next/font/google";


const poppins = Poppins({ subsets: ["latin"], weight: ["300", "600", "700"] });

interface Education {
  education_id: number;
  field_of_study: string;
  institution: string;
  year: number;
}

interface Doctor {
  doctor_id: number;
  name: string;
  specialization: string;
  hospital_id: number;
  description: string;
  image: string;
  doc_education: Education[];
}

interface DoctorProfileProps {
  doctor: Doctor | null;
}

const EducationSection: React.FC<DoctorProfileProps> = ({doctor}) => {
  if (!doctor) return null;

  return (
    <div className="relative max-w-270 mx-auto my-10">
      {/* Background Image */}
      <div className="relative w-full h-[370px]">
        <Image
          src="/img/DoctorProfile/edu_background.png" // Replace with your image path
          alt="Education Background"
          layout="fill"
          objectFit="cover"
          className="rounded-xl"
        />
      </div>

      {/* Overlay Content */}
      <div className="absolute top-0 rounded-xl flex flex-col p-6">
        <h2 className={`text-3xl font-bold top-4 text-[#023F76] absolute left-3 ${poppins.className}`}>
          Education
        </h2>

        <div className={`${poppins.className} p-4 overflow-auto max-h-[300px] mt-15`}>
          {doctor.doc_education?.length > 0 ? (
            doctor.doc_education.map((edu, index) => (
              <div key={edu.education_id || index} className="grid grid-cols-12 gap-4 p-2">
                {/* Year */}
                <div className="col-span-2 font-semibold text-[#023F76]">{edu.year}</div>

                {/* Degree & Institution */}
                <div className="col-span-6">
                  <p className="font-bold text-[#083477]">{edu.field_of_study}</p>
                </div>

                {/* Institution */}
                <div className={`col-span-4 font-light text-sm text-black`}>{edu.institution}</div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No education data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EducationSection;
