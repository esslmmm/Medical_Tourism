// "use client"

// import PackageList from "../components/user_components/Homepage/PackageList";
// import DoctorList from "../components/user_components/Homepage/DoctorList";
// import Hospitaltap from "../components/user_components/Homepage/Hospitaltap";
// import Footer from "../components/user_components/Main/Footer";
// import Advertisement from "../components/user_components/Homepage/Advertisement";
// import AuthenticatedNavbar from "../components/user_components/Main/AuthenticatedNavbar";
// import MultiStepReviewModal from "./user/ReviewPopUp/[id]/page";
// import { useSearchParams } from 'next/navigation';
// import "./globals.css";
// import { useEffect, useState } from 'react';

// interface HomePageProps {
//   children: React.ReactNode;
// }

// const HomePage: React.FC<HomePageProps> = ({ children }) => {
//   // const [showModal, setShowModal] = useState(false);
//   const searchParams = useSearchParams();
//   const [emailFromQuery, setEmailFromQuery] = useState<string>('');
  
//   useEffect(() => {
//     const email = searchParams?.get('email');
//     if (email) {
//       setEmailFromQuery(email);
//     }
//   }, [searchParams]);

//   return (
//     <div>
//       <AuthenticatedNavbar initialEmail={emailFromQuery} />
//       <Advertisement />
//       <div className="text-center pt-10 pb-8">
//         <h1 className="font-semibold text-[#4D4D4D]" style={{ fontSize: 35 }}>
//           Select your package <br /> or customize your own package
//         </h1>
//         <b className="text-[#717171] font-regular" style={{ fontSize: 16 }}>
//           Choose the package that's right for you?
//         </b>
//       </div>
//       <PackageList />
//       <h2 className="font-Inter text-6xl font-semibold text-center py-8 my-8 text-white bg-[#2BB08A] opacity-60">
//         DOCTORS
//       </h2>
//       <DoctorList />
//       <Hospitaltap />
//       {/* Show Modal if `showModal` is true */}
//         {/* <div className="p-4">
//         <button
//           onClick={() => setShowModal(true)}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg"
//         >
//           Leave a Review
//         </button> */}

//         {/* Pass the ID to the ReviewCard */}
//         {/* <MultiStepReviewModal
//           isOpen={showModal}
//           onClose={() => setShowModal(false)}
//           id={1}
//         />
//         </div> */}
//       <Footer />
//       {children} {/* Renders the page content that is passed from the individual page component */}
//     </div>
//   );
// };

// export default HomePage;


"use client";

import PackageList from "../components/user_components/Homepage/PackageList";
import DoctorList from "../components/user_components/Homepage/DoctorList";
import Hospitaltap from "../components/user_components/Homepage/Hospitaltap";
import Footer from "../components/user_components/Main/Footer";
import Advertisement from "../components/user_components/Homepage/Advertisement";
import AuthenticatedNavbar from "../components/user_components/Main/AuthenticatedNavbar";
import MultiStepReviewModal from "./user/ReviewPopUp/[id]/page";
import { useSearchParams } from 'next/navigation';
import "./globals.css";
import { useEffect, useState } from 'react';
import MedicalList from "@/components/user_components/Homepage/MedicalList";

interface HomePageProps {
  children: React.ReactNode;
}

const HomePage: React.FC<HomePageProps> = ({ children }) => {
  const searchParams = useSearchParams();
  const [emailFromQuery, setEmailFromQuery] = useState<string>('');
  
  useEffect(() => {
    const email = searchParams?.get('email');
    if (email) {
      setEmailFromQuery(email);
    }
  }, [searchParams]);

  return (
    <div>
      <AuthenticatedNavbar initialEmail={emailFromQuery} />
      <Advertisement />
      <div id="packages-section" className="text-center pt-16 pb-12 bg-white from-white to-blue-50">
        {/* New Stylized Header Design */}
        <div className="relative inline-block mb-6">
          {/* Background decoration */}
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 rounded-2xl blur opacity-20 animate-pulse"></div>
          
          {/* Main title with gradient and shadow effects */}
          <h1 className="relative font-black text-4xl lg:text-5xl xl:text-6xl mb-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent drop-shadow-2xl leading-tight">
            Select your package <br /> 
            <span className="bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-600 bg-clip-text text-transparent">
              or customize your own package
            </span>
          </h1>
          
          {/* Decorative elements */}
          <div className="flex justify-center items-center space-x-6 mb-6">
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full"></div>
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse delay-75"></div>
              <div className="w-3 h-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-pulse delay-150"></div>
            </div>
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent rounded-full"></div>
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <p className="text-slate-600 font-medium text-lg lg:text-xl leading-relaxed">
            Choose the package that's right for you and embark on your personalized wellness journey
          </p>
          
          {/* Additional decorative elements */}
          <div className="mt-8 flex justify-center space-x-8">
            <div className="flex items-center space-x-2 bg-blue-50 rounded-full px-4 py-2 border border-blue-200">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-blue-700 font-semibold text-sm">Premium Care</span>
            </div>
            <div className="flex items-center space-x-2 bg-cyan-50 rounded-full px-4 py-2 border border-cyan-200">
              <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
              <span className="text-cyan-700 font-semibold text-sm">Customizable</span>
            </div>
            <div className="flex items-center space-x-2 bg-indigo-50 rounded-full px-4 py-2 border border-indigo-200">
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              <span className="text-indigo-700 font-semibold text-sm">World-Class</span>
            </div>
          </div>
        </div>
      </div>
      <MedicalList />
      <PackageList /> 
      <DoctorList />
      <Hospitaltap />
      <Footer />
      {children}
    </div>
  );
};

export default HomePage;