import Image from "next/image";
import { Poppins } from "next/font/google";


const poppins = Poppins({ subsets: ["latin"], weight: ["300", "600", "700"] });

interface Certificate {
  certificate_id: number;
  field_of_study: string;
  institution: string;
  year: number;
}

interface Doctor {
  doctor_id: number;
  name: string;
  doc_certificate: Certificate[];
}

interface DoctorProfileProps {
  doctor: Doctor | null;
}

const CertificateSection: React.FC<DoctorProfileProps> = ({doctor}) => {
  if (!doctor) return null;

  return (
    <div className="relative max-w-270 mx-auto my-10">
      {/* Background Image */}
      <div className="relative w-full h-40">
        <Image
          src="/img/DoctorProfile/Cer_background.png" // Replace with your image path
          alt="Certificate Background"
          layout="fill"
          objectFit="cover"
          className="rounded-xl"
        />
      </div>

      {/* Overlay Content */}
      <div className="absolute top-0 rounded-xl flex flex-col p-6">
        <h2 className={`text-3xl font-bold top-1 text-[#023F76] absolute left-1 ${poppins.className}`}>
          Certificate
        </h2>

        <div className={`${poppins.className} p-4 overflow-auto max-h-[300px] mt-8`}>
          {doctor.doc_certificate?.length > 0 ? (
            doctor.doc_certificate.map((cert, index) => (
              <div key={cert.certificate_id || index} className="grid grid-cols-12 gap-4 p-2">
                {/* Year */}
                <div className="col-span-2 font-semibold text-[#023F76]">{cert.year}</div>

                {/* Degree & Institution */}
                <div className="col-span-6">
                  <p className="font-bold text-[#083477]">{cert.field_of_study}</p>
                </div>

                {/* Institution */}
                <div className="col-span-4 font-light text-sm text-black">{cert.institution}</div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No certificates available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CertificateSection;
