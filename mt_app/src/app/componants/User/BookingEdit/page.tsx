'use client';
import { useState } from 'react';
import ContactDetails from './Components/ContactDetails';
import PatientDetails from './Components/PatientDetails';
import MedicalService from './Components/MedicalService';
import PlaceToVisit from './Components/PlaceToVisit';
import Accommodation from './Components/Accommodation';
import Interpreter from './Components/Interpreter';
import CarService from './Components/CarService';
import NavbarBookingEdit from "./Components/NavbarBookingEdit";
import Footer from "./Components/Footer";

export default function AppointmentForm() {


    return (
        <div>
            <NavbarBookingEdit />
            <div className="flex min-h-screen bg-gray-100 p-10 flex-row gap-6">
                <div className="flex flex-col gap-6 w-2/3">
                    <ContactDetails />
                    <PatientDetails />
                </div>
                <div className="w-1/3">
                    <MedicalService />
                    <PlaceToVisit />
                    <Accommodation />
                    <Interpreter />
                    <CarService />
                    <div className="mt-4 text-right">
                        <a href="#" className="text-blue-500 text-sm font-semibold">Show all detail</a>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
