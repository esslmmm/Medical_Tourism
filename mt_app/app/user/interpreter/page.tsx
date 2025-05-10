"use client";
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import Footer from '../../../components/user_components/Main/Footer';
import Navbar from '../../../components/user_components/Main/Navbar';
import InterpreterDetails from '../../../components/user_components/Interpreter/InterpreterDetails';
import InterpreterList from '../../../components/user_components/Interpreter/InterpreterList';


// Define Type for an Interpreter
interface Review {
  review_id: number;
  title_review: string;
  rating: number;
  comment: string;
  created_at: string;
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
  experience: Date;
  review_inter: Review[];
  inter_education: Education[];
  languages: Languages[];
  inter_bookings: Bookings[]
}

interface Bookings {
  booking_id: number;
  interpreter_id: number;
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

export default function InterpreterPage() {
    const [selectedInterpreter, setSelectedInterpreter] = useState<Interpreter | null>(null);
    const router = useRouter();

    const handleContinue = () => {
      if (selectedInterpreter) {
        router.push(`/user/Form/medical_appointment`);
      }
    };


  
    return (
      <div>
        <Navbar />
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-bold ml-12">Interpreter</h1>
  
          {/* Scrollable Interpreter List */}
          <InterpreterList
            setSelectedInterpreter={setSelectedInterpreter}
            selectedInterpreter={selectedInterpreter}
          />
          <div className="flex justify-center">
            <hr className="w-8/9 border border-[#C5D1E0] my-10" />
          </div>

          {/* Interpreter Details */}
          <InterpreterDetails interpreter={selectedInterpreter} />

  
          {/* Continue Button */}
          {selectedInterpreter && (
        <div className="flex justify-end mt-6 mr-25">
          <button
            onClick={handleContinue}
            className="w-35 bg-gradient-to-r from-gray-900 to-gray-700 text-white py-3 px-6 
            rounded-lg text-md font-semibold shadow-lg hover:shadow-xl 
            hover:from-gray-800 hover:to-gray-600 transition duration-300 ease-in-out 
            active:scale-95"
          >
            CONTINUE
          </button>
        </div>
      )}
        </div>
        <Footer />
      </div>
    );
  }
  
