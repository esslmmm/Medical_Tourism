"use client";

import Image from "next/image";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "600", "700"] });

const CertificateData = [
  {
    year: "2019",
    degree: "Medical Education CSII & CGMS Training : Minimed 630g Insulin Pump System iPro2 Professional CGM",
    location: "Medtronic, Thailand",
  },
];

const CertificateSection = () => {
  return (
    <div className="relative max-w-270 mx-auto my-10">
      {/* Background Image */}
      <div className="relative w-full h-40">
        <Image
          src="/Cer_background.png" // Replace with your image path
          alt="Certificate Background"
          layout="fill"
          objectFit="cover"
          className="rounded-xl"
        />
      </div>

      {/* Overlay Content */}
      <div className="absolute top-0 rounded-xl flex flex-col p-6 ">
        <h2 className={`text-3xl font-bold top-1 text-[#023F76] absolute left-1 ${poppins.className}`}>Certificate</h2>

        <div className={`${poppins.className} p-4 overflow-auto max-h-[300px] mt-8`}>
          {CertificateData.map((edu, index) => (
            <div key={index} className="grid grid-cols-12 gap-4 p-2">
              {/* Year */}
              <div className="col-span-2 font-semibold  text-[#023F76]">{edu.year}</div>

              {/* Degree & Institution */}
              <div className="col-span-6">
                <p className="font-bold text-[#083477]">{edu.degree}</p>
              </div>

              {/* Location */}
              <div className={`col-span-4 font-light text-sm text-black`}>{edu.location}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CertificateSection;
