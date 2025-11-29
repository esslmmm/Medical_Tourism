
import { MapPin } from "lucide-react";

const languageFlags: { [key: string]: string } = {
    English: "🇬🇧",
    Arabic: "🇸🇦",
    Myanmar: "🇲🇲",
    French: "🇫🇷",
    German: "🇩🇪",
    Hindi: "🇮🇳",
    Thai: "🇹🇭",
    // add more languages here
};


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
    hospitals: Hospital[];
}

interface Hospital {
    name: string;
    logo: string;
    location: string;
    city: string;
}


interface DoctorProfileProps {
    doctor: Doctor | null;
}

const DoctorProfile: React.FC<DoctorProfileProps> = ({ doctor }) => {
    if (!doctor) return null;

    return (
        <div className="space-y-12 p-8">
            {/* Language Section */}
            <div>
                
            <h2 className="text-2xl font-bold mb-4 text-black">Languages</h2>
            <div className="flex gap-4">
                {doctor.doc_language?.map((lang, index) => (
                    <div key={index} className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-300 text-xs">
                        <span className="text-2xl">{languageFlags[lang.languages] || "🏳️"}</span>
                        <span className="font-bold text-lg text-black">{lang.languages}</span>
                    </div>
                ))}
            </div>
            </div>

            {/* Hospital Section */}
            <div>
            <h2 className="text-2xl font-bold mb-4 text-black">Hospital</h2>
            <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between">
                <div className="flex items-start gap-6">
                    <img
                        src={doctor.hospitals.logo}
                        alt={doctor.hospitals.name}
                        className="w-24 h-24 rounded-lg object-contain border-gray-200 bg-white p-1"
                    />
                    <div className="flex-1">
                        <div className="flex items-start justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">{doctor.hospitals.name}</h1>
                            </div>
                        </div>

                        <div className="mt-4 space-y-2">
                            <div className="flex items-center gap-4 text-gray-600">
                                <MapPin className="w-6 h-6" />
                                <span className='text-md font-semibold'>{doctor.hospitals.location}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>

        </div>
    );
};

export default DoctorProfile;

