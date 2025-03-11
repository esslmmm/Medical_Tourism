"use client";

import Image from "next/image";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "600", "700"] });

const educationData = [
  {
    year: "2016",
    degree: "Master of Business Administration (Executive),Sasin Graduate Institute of Business Administration",
    location: "Chulalongkorn University, Thailand",
  },
  {
    year: "2003",
    degree: "Internal Medicine",
    location: "Thai Medical Council, Thailand",
  },
  {
    year: "2002",
    degree: "Endocrinology and Metabolism",
    location: "University of California at San Diego (UCSD)",
  },
  {
    year: "1997",
    degree: "Internal Medicine",
    location: "Temple University Medical School’s at Abington Memorial, United States",
  },
  {
    year: "1989",
    degree: "Doctor of Medicine",
    location: "Cebu Doctors College of Medicine, Philippines",
  },
];

const EducationSection = () => {
  return (
    <div className="relative max-w-270 mx-auto my-10">
      {/* Background Image */}
      <div className="relative w-full h-[370px]">
        <Image
          src="/edu_background.png" // Replace with your image path
          alt="Education Background"
          layout="fill"
          objectFit="cover"
          className="rounded-xl"
        />
      </div>

      {/* Overlay Content */}
      <div className="absolute top-0 rounded-xl flex flex-col p-6 ">
        <h2 className={`text-3xl font-bold top-4 text-[#023F76] absolute left-3 ${poppins.className}`}>Education</h2>

        <div className={`${poppins.className} p-4 overflow-auto max-h-[300px] mt-15`}>
          {educationData.map((edu, index) => (
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

export default EducationSection;
