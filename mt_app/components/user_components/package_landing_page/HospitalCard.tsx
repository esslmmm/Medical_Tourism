"use client";
import Image from "next/image";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

const hospital = {
  name: "Mae Fah Luang Medical Center Hospital",
  address: "365 Nang Lae, Mueang Chiang Rai District, Chiang Rai 57100",
  image: "/img/hospital.png",
};





const HospitalCard = () => {
  const router = useRouter();
  const navigateToHospitalPage = () => {
    router.push(`/user/Hospital`);
  };
  return (
    <div>
      <div className="border border-t border-gray-200 mx-50 my-5"></div>
      <div className="flex justify-center items-center w-screen bg-white p-6">
      <div className="flex items-center p-4 bg-white rounded-xl shadow-md border border-gray-300 w-full max-w-2xl m-10">
        {/* Image Section */}
        <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
          <Image
            src={hospital.image}
            alt={hospital.name}
            width={96}
            height={96}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Hospital Details */}
        <div className="ml-4 flex-1">
          <h2 className="text-lg font-semibold">{hospital.name}</h2>
          <p className="flex items-center text-gray-600 text-sm mt-1">
            <FaMapMarkerAlt className="text-red-500 mr-1" />
            {hospital.address}
          </p>

          {/* Button */}
          <button className="mt-3 px-4 py-2 text-green-500 border border-green-300 rounded-full text-sm hover:bg-green-100 transition" onClick={navigateToHospitalPage}>
            See details
          </button>
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default HospitalCard;
