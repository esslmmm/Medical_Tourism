'use client';
import { useState } from 'react';
import ContactDetails from './BookingEdit/ContactDetails';
import PatientDetails from './BookingEdit/PatientDetails';
import MedicalService from './BookingEdit/MedicalService';
import PlaceToVisit from './BookingEdit/PlaceToVisit';
import Accommodation from './BookingEdit/Accommodation';
import Interpreter from './BookingEdit/Interpreter';
import CarService from './BookingEdit/CarService';
import NavbarBookingEdit from "./BookingEdit/NavbarBookingEdit";
import Footer from "./BookingEdit/Footer";

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
