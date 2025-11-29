import Image from "next/image";

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
    <div >
        <div className="border border-gray-300 shadow p-8 rounded-4xl">
                <h2 className="text-2xl font-bold mb-4 text-black">Certificate</h2>

                <div className={` p-4 overflow-auto max-h-[300px] text-lg`}>
                    {doctor.doc_certificate?.length > 0 ? (
                        doctor.doc_certificate.map((edu, index) => (
                            <div key={edu.certificate_id || index} className="grid grid-cols-12 gap-4 p-2">
                                {/* Year */}
                                <div className="col-span-2 font-semibold text-[#023F76]">{edu.year}</div>

                                {/* Degree & Institution */}
                                <div className="col-span-6">
                                    <p className="font-bold text-[#083477]">{edu.field_of_study}</p>
                                </div>

                                {/* Institution */}
                                <div className={`col-span-4 text-black`}>{edu.institution}</div>
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

export default CertificateSection;
