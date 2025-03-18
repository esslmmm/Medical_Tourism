"use client";
import React, { useState } from 'react';
import Footer from '../../../components/user_components/Main/Footer';
import Navbar from '../../../components/user_components/Main/Navbar';
import InterpreterDetails from '../../../components/user_components/Interpreter/InterpreterDetails';
import InterpreterList from '../../../components/user_components/Interpreter/InterpreterList';

interface Interpreter {
  id: number;
  name: string;
  role: string;
  image: string;
  rating: number;
  reviews: number;
  language: string;
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
  
          {/* Interpreter Details */}
          <InterpreterDetails interpreter={selectedInterpreter} />
  
          {/* Continue Button */}
          {selectedInterpreter && (
            <div className="flex justify-end mt-6">
              <button className="bg-black text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-800 transition duration-200">
                CONTINUE
              </button>
            </div>
          )}
        </div>
        <Footer />
      </div>
    );
  }
  
