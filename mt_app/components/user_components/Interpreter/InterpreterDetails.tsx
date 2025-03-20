'use client';
import { FaStar } from 'react-icons/fa';
import Image from 'next/image';
import { Poppins } from "next/font/google";
import { Inter } from "next/font/google";
import "../../../app/globals.css"

const inter = Inter({ subsets: ["latin"], weight: ["100","200","300","400","500","600", "700","800","900"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["100","200","300","400","500","600", "700","800","900"] });

interface Review {
  review_id: number;
  title_review: string;
  rating: number;
  comment: string;
  create_at: string;
}

interface Interpreter {
  interpreter_id: number;
  name: string;
  email: string;
  phone: string;
  rating: number;
  nationality: string;
  image: string;
  birthofday: Date;
  profile_summary: string;
  reviews: number;
  language: string;
  experience?: string;
  review_inter: Review[];
  inter_education: Education[];
  languages: Languages[];
}

interface Languages {
  lang_id: number;
  language_name: string;
  proficiency: string;
}

interface Education {
  education_id: number;
  degree: string;
  field_of_study: string;
  institution: string;
}

interface InterpreterProfileProps {
  interpreter: Interpreter | null;
}

const calculateAge = (birthDate: Date) => {
  if (!birthDate) return 'N/A';
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

const InterpreterProfile: React.FC<InterpreterProfileProps> = ({ interpreter }) => {
  if (!interpreter) {
    return (
      <div className="text-center text-gray-500 p-10">
        Select an interpreter to view details
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-15 p-5 w-full">
        {/* Left Sidebar - Profile Details */}
        <div className="bg-[#EDEDED] p-6 py-15 rounded-sm shadow-md w-full lg:w-1/4 ml-15 text-[#2B2B2B]">
          <div className="flex flex-col items-center text-center">
            <Image
              src={interpreter.image || '/default-avatar.png'}
              alt={interpreter.name || 'Unknown'}
              width={180}
              height={180}
              className="rounded-full border-2 border-gray-300"
            />
            <h2 className="text-xl font-bold mt-4">{interpreter.name ?? 'Unknown'}</h2>
            <p className="text-gray-600">{interpreter.language ?? 'No role available'} Interpreter</p>
            <div className="text-yellow-400 flex items-center gap-1 mt-2">
              <FaStar /> {interpreter.rating ?? 'N/A'} ({interpreter.reviews ?? 0} reviews)
            </div>
          </div>

          {/* Additional Details */}
          <div className={`mt-6 mx-5 space-y-2 ${poppins.className}`}>
            <p className="flex justify-between ">
              <p className='font-semibold'>Age:</p> <span>{calculateAge(interpreter.birthofday)}</span>
            </p>
            <p className="flex justify-between">
            <p className='font-semibold'>Amount of Deals</p> <span>{interpreter.reviews ?? 0}</span>
            </p>
            <p className="flex justify-between">
            <p className='font-semibold'>Experience:</p> <span>{interpreter.experience ?? 'N/A'}</span>
            </p>
            <p className="flex justify-between">
            <p className='font-semibold'>Country:</p><span>{interpreter.nationality ?? 'Unknown'}</span>
            </p>
            <p className="flex justify-between">
            <p className='font-semibold'>Email:</p> <span>{interpreter.email ?? 'Not provided'}</span>
            </p>
          </div>

          {/* Languages */}
          <div className='mt-10 space-y-2'>
            <h2 className={`text-xl font-bold ${poppins.className}`}>Language</h2>
            <div className='mt-1 mx-5 '>
              <p className="text-black flex justify-between">
                {interpreter.languages.language_name ?? 'N/A'}<p>{interpreter.languages.proficiency ?? 'N/A'}</p>
              </p>
            </div>
          </div>

          {/* Education */}
          <div className={`mt-10 space-y-2 ${poppins.className}`}>
            <h2 className={`text-xl  font-bold`}>Education</h2>
            <div className='mx-5 mt-1'>
              <p className="text-black flex gap-x-2 font-semibold">
                •  Istanbul Technical University
              </p>
              <p className="text-black ml-5 font-light">
                M.M.: Ethnomusicology Coursework in Ethnomusicology and Music Business
              </p>
            </div>
          </div>
        </div>

        <div className='lg:w-3/5'>

          {/* Right Content - About and Reviews */}
          <div className={`flex-1 bg-[#EDEDED] p-15 rounded-sm shadow-md ${inter.className}`}>
            <h1 className="text-3xl font-bold" style={{fontSize:"38px"}}>I’m {interpreter.name ?? 'Unknown'}</h1>
            <h1 className="text-3xl font-bold" style={{fontSize:"38px"}}>{interpreter.language ?? 'Unknown'} Interpreter</h1>
            <p className="text-[#767676] mt-2 font-light" style={{fontSize:"16px"}}>{interpreter.profile_summary ?? 'No bio available'}</p>
          </div>

          {/* Reviews */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold mt-10">Reviews</h2>
            {interpreter.review_inter.length > 0 ? (
              interpreter.review_inter.map((review: Review) => (
                <div key={review.review_id} className="bg-[#E5ECEC]/40 p-4 rounded-xl shadow-md mt-4">
                  <div className='lg:w-3/5 p-2 space-y-2'>
                    <h3 className={`font-semibold flex items-center text-lg ${inter.className}`}>
                      "{review.title_review}" <FaStar className="text-yellow-400 ml-5" />
                    </h3>
                    <p className={`text-gray-600 text-sm font-extralight ${poppins.className}`}>{review.comment}</p>
                    <p className="text-gray-400 font-thin text-sm">Reviewed {review.create_at}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600 mt-2">No reviews available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterpreterProfile;
