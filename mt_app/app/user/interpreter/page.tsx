"use client";
import React, { useState } from 'react';
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

export default function InterpreterPage() {
    const [selectedInterpreter, setSelectedInterpreter] = useState<Interpreter | null>(null);
  
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
          {/* {selectedInterpreter && (
            <div className="flex justify-end mt-6">
              <button className="bg-black text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-800 transition duration-200">
                CONTINUE
              </button>
            </div>
          )} */}
        </div>
        <Footer />
      </div>
    );
  }
  
