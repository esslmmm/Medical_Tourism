"use client";
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import Footer from '../../../../components/user_components/Main/Footer';
import Navbar from '../../../../components/user_components/Main/Navbar';
import InterpreterDetails from '../../../../components/user_components/Interpreter/InterpreterDetails';
import InterpreterList from '../../../../components/user_components/Interpreter/InterpreterList';
import { useStepNavigator } from '../../package_landing_page/goToNextStep';
import { submitInterBooking } from '../../../api/booking/interpreters/submitInterBooking';
import { updatePackageBooking } from '../../../api/booking/packages/updatePackageBooking';


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
    const goToNextStep = useStepNavigator();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleNext = async () => {
    setLoading(true);
    setError(null);

    if (!selectedInterpreter || Number(selectedInterpreter) <= 0) {
      setError('Some booking details are missing or invalid. Please check again.');
      setLoading(false);
      return;
    }

    const bookingData = {
      interpreter_id: Number(selectedInterpreter.interpreter_id),
      start: null,
      end: null,
      status: 'In_Progress',
    };

    try {
      const response = await submitInterBooking(bookingData);

      if (!response || response.error) {
        throw new Error(response?.error || 'Server error');
      }

      const inter_booking_id = response.booking_id;
      const package_booking_id = localStorage.getItem('package_booking_id');

      if (!package_booking_id || !inter_booking_id) {
          throw Error('Missing booking ID(s).');
        }

      await updatePackageBooking(package_booking_id, { inter_booking_id });

      goToNextStep();
    } catch (err) {
      console.error('Booking failed:', err);
      setError('Booking failed. Please try again.');
    } finally {
      setLoading(false);
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
            onClick={handleNext}
            disabled={loading}
            className={`w-35 bg-gradient-to-r from-gray-900 to-gray-700 text-white py-3 px-6 
              rounded-lg text-md font-semibold shadow-lg hover:shadow-xl 
              hover:from-gray-800 hover:to-gray-600 transition duration-300 ease-in-out 
              active:scale-95 flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              'CONTINUE'
            )}
          </button>

        </div>
      )}
        </div>
        <Footer />
      </div>
    );
  }

