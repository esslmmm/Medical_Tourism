'use client';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import Image from 'next/image';
import { Poppins } from "next/font/google";
import { Inter } from "next/font/google";
import "@/app/globals.css"

const inter = Inter({ subsets: ["latin"], weight: ["100","200","300","400","500","600", "700","800","900"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["100","200","300","400","500","600", "700","800","900"] });

interface Review {
  review_id: number;
  title_review: string;
  rating: number;
  comment: string;
  created_at: string;
}

interface Guide {
  guide_id: number;
  name: string;
  email: string;
  phone: string;
  nationality: string;
  image: string;
  birthofday: Date;
  profile_summary: string;
  reviews: number;
  language: string;
  experience: Date;
  review_guide: Review[];
  guide_education: Education[];
  languages: Languages[];
  guide_bookings: Bookings[]
}

interface Bookings {
  booking_id: number;
  guide_id: number;
  status: string;
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

interface GuideProfileProps {
  guide: Guide | null;
}



const calculate = (birthDate: string | Date) => {
  if (!birthDate) return 'N/A';
  
  const birth = new Date(birthDate);
  
  if (isNaN(birth.getTime())) return 'Invalid Date';
  
  const today = new Date();
  // Calculate the difference in years
  let age = today.getFullYear() - birth.getFullYear();
  // Adjust age if the birthday hasn't occurred yet this year
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

const GuideProfile: React.FC<GuideProfileProps> = ({ guide }) => {
  const approvedCount = guide?.guide_bookings.filter(booking => booking.status === "Approved").length;
  const calculateAverageRating = (reviews: Review[]) => {
    if (!reviews || reviews.length === 0) return 0;
  
    // Calculate total rating sum and divide by the number of reviews
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  };

  const averageRating = guide?.review_guide? calculateAverageRating(guide.review_guide) : 0;

  const formatDate = (timestamp: string | number | Date) => {
    if (!timestamp) return "Invalid Date";
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return "Invalid Date";
  
    return `Reviewed ${date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })}`;
  };
  
  

  if (!guide) {
    return (
      <div className="text-center text-gray-500 p-10">
        Select an guide to view details
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
              src={guide.image || '/default-avatar.png'}
              alt={guide.name || 'Unknown'}
              width={180}
              height={180}
              className="rounded-full border-2 border-gray-300"
            />
            <h2 className="text-xl font-bold mt-4">{guide.name ?? 'Unknown'}</h2>
            <p className="text-gray-600">{guide.language ?? 'No role available'} Guide</p>
            <div className="text-yellow-400 flex items-center gap-1 mt-2">
              {Array.from({ length: Math.floor(averageRating) }).map((_, i) => (
                <FaStar key={i} />
              ))}
              {averageRating % 1 !== 0 && <FaStarHalfAlt />}
              <span className="text-gray-700 ml-2">
                {averageRating.toFixed(1)} ({guide.review_guide.length} reviews)
              </span>
            </div>
          </div>

          {/* Additional Details */}
          <div className={`mt-6 mx-5 space-y-2 ${poppins.className}`}>
            <p className="flex justify-between">
            <strong>Age:</strong> <span>{calculate(guide.birthofday)}</span>
            </p>
            <p className="flex justify-between">
              <strong>Amount of Deals:</strong> <span>{approvedCount}</span>
            </p>
            <p className="flex justify-between">
              <strong>Experience:</strong> <span>{calculate(guide.experience)} Years</span>
            </p>
            <p className="flex justify-between">
              <strong>Country:</strong> <span>{guide.nationality ?? 'Unknown'}</span>
            </p>
            <p className="flex justify-between">
              <strong>Email:</strong> <span>{guide.email ?? 'Not provided'}</span>
            </p>
          </div>

          {/* Languages */}
          <div className='mt-10 space-y-2'>
            <h2 className={`text-xl font-bold ${poppins.className}`}>Languages</h2>
            <div className='mt-1 mx-5'>
              {guide.languages.length > 0 ? (
                guide.languages.map((lang: any) => (
                  <p key={lang.lang_id} className="text-black flex justify-between">
                    <strong>{lang.language_name}</strong> <span>{lang.proficiency}</span>
                  </p>
                ))
              ) : (
                <p className="text-gray-600">No languages available.</p>
              )}
            </div>
          </div>

          {/* Education */}
          <div className={`mt-10 space-y-2 ${poppins.className}`}>
            <h2 className={`text-xl font-bold`}>Education</h2>
            <div className='mx-2 mt-1'>
              {guide.guide_education.length > 0 ? (
                guide.guide_education.map((edu: any) => (
                  <div key={edu.education_id} className="mb-2">
                    <p className="text-black flex gap-x-2 font-semibold">• {edu.institution}</p>
                    <p className="text-black ml-5 font-light">{edu.degree} in {edu.field_of_study}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No education details available.</p>
              )}
            </div>
          </div>
        </div>

        <div className='lg:w-3/5'>
          {/* Right Content - About and Reviews */}
          <div className={`flex-1 bg-[#EDEDED] p-15 rounded-sm shadow-md ${inter.className}`}>
            <h1 className="text-3xl font-bold" style={{fontSize:"38px"}}>I’m {guide.name ?? 'Unknown'}</h1>
            <h1 className="text-3xl font-bold" style={{fontSize:"38px"}}>{guide.language ?? 'Unknown'} Guide</h1>
            <p className="text-[#767676] mt-2 font-light" style={{fontSize:"16px"}}>{guide.profile_summary ?? 'No bio available'}</p>
          </div>

            {/* Reviews */}
          <div className={`mt-6 ${poppins.className}`}>
            <h2 className="text-2xl font-semibold mt-10">Reviews</h2>

            {/* Scrollable Review Container */}
            <div className="max-h-[570px] overflow-y-auto space-y-4 p-2 scrollbar-hide">
              {guide.review_guide.length > 0 ? (
                guide.review_guide.map((review: Review) => (
                  <div key={review.review_id} className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                    <div className='space-y-2'>
                      <div className="text-yellow-400 flex items-center gap-1">
                      <h3 className="font-semibold text-black flex items-center text-lg mr-3">
                        "{review.title_review}" 
                      </h3>
                      {Array.from({ length: Math.floor(review.rating) }).map((_, i) => (
                          <FaStar key={i} />
                        ))}{review.rating % 1 !== 0 && <FaStarHalfAlt />}
                      </div>
                      <p className="text-gray-600 text-sm font-extralight">{review.comment}</p>
                      <p className="text-black font-thin text-sm">{formatDate(review.created_at)}</p>
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
    </div>
  );
};

export default GuideProfile;
