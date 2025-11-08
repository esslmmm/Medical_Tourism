import Image from 'next/image';
import Link from 'next/link';
import { Hospital } from '@/types/Package';

interface HospitalProps {
  hospital: Hospital;
}

const HospitalComponent: React.FC<HospitalProps> = ({ hospital }) => {
// Note: centersAndClinics not in Hospital type, keeping hardcoded for now
const centersAndClinics = [
    "Oncology",
  "Cardiovascular",
"Neuroscience",
"Bone",
"Colorectal Diseases",
"Brain",
];
const displayedCenters = centersAndClinics.slice(0, 3);
const remainingCount = centersAndClinics.length - 3;
return (
<div>
<h2 className="text-2xl font-bold mb-4 text-black">Hospital</h2>
<div className="bg-white overflow-hidden">
<Image
src={hospital.image}
alt={hospital.name}
width={773}
                height={434}
                className="w-full object-cover rounded-lg"
              />
              <div className="pt-5">
                <h3 className="text-xl font-bold mb-4 text-black">{hospital.name}</h3>
                <div className="mb-4">
                  <h4 className="font-bold mb-2 text-black">📍 Location</h4>
                  <p className="text-black">{hospital.location}, {hospital.city}</p>
                </div>

                <div className="mb-4">
                <h4 className="font-bold mb-3 text-black">🩺 Centers & Clinics</h4>
                <div className="flex flex-wrap gap-2">
                {displayedCenters.map((center, index) => (
                <span key={index} className="border bg-teal-500 px-3 py-1 rounded text-sm font-bold text-white">
                {center}
                </span>
                ))}
                {remainingCount > 0 && (
                <span className="border bg-teal-500 px-3 py-1 rounded text-sm font-bold text-white">
                +{remainingCount} centers
                </span>
                )}
                </div>
                </div>

                <Link
                href={`/user/Hospital/${hospital.hospital_id}`}
                className="inline-flex items-center gap-2 border border-teal-500 text-teal-500 font-semibold px-5 py-2.5 rounded-full shadow-md hover:text-white hover:bg-teal-600 transition-all duration-200"
                >
                View More Details
                </Link>
              </div>
            </div>
          </div>
  )
}
export default HospitalComponent