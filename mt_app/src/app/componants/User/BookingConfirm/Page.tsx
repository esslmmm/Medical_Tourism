'use client';

import React from 'react';
import ContactDetails from './Components/ContactDetails';
import PatientDetails from './Components/PatientDetails';
import MedicalService from './Components/MedicalService';
import ConfirmButton from './Components/ConfirmButton';
import PlaceToVisit from './Components/PlaceToVisit';
import Accommodation from './Components/Accommodation';
import Interpreter from './Components/Interpreter';
import CarService from './Components/CarService';
import NavbarBookingConfirm from "./Components/NavbarBookingConfirm";
import Footer from "./Components/Footer";

export default function ConfirmBody() {
    return (
        <div>
            <NavbarBookingConfirm />
            <div className="flex justify-center bg-gray-100 py-10 px-6">
                <div className="w-full max-w-6xl grid grid-cols-3 gap-8">
                    {/* Left Section: Contact & Patient Details */}
                    <div className="col-span-2">
                        <ContactDetails />
                        <PatientDetails />
                        <ConfirmButton />
                    </div>

                    {/* Right Section: Additional Services */}
                    <div className="w-full">
                        <MedicalService />
                        <PlaceToVisit />
                        <Accommodation />
                        <Interpreter />
                        <CarService />
                        <div className="mt-4 text-right">
                            <a href="#" className="text-blue-500 text-sm font-semibold hover:underline">Show all details</a>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}