'use client';
import { useState } from 'react';
import ContactDetails from './BookingDetails/ContactDetails';
import PatientDetails from './BookingDetails/PatientDetails';
import MedicalService from './BookingDetails/MedicalService';
import PlaceToVisit from './BookingDetails/PlaceToVisit';
import Accommodation from './BookingDetails/Accommodation';
import Interpreter from './BookingDetails/Interpreter';
import CarService from './BookingDetails/CarService';
import NavbarBookingDetails from "./BookingDetails/NavbarBookingDetails";
import Footer from "./BookingDetails/Footer";

export default function AppointmentForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        country: '',
        phoneCode: '',
        phoneNumber: '',
        gender: '',
        patientFirstName: '',
        patientLastName: '',
        birthDate: '',
        passportId: '',
    });

    return (
        <div>
            <NavbarBookingDetails />
            <div className="flex min-h-screen bg-gray-100 p-10">
                <div className="bg-white p-6 rounded-lg shadow-lg w-2/3">
                    <ContactDetails />
                    <PatientDetails />
                    <button className="bg-blue-600 text-white p-2 rounded-lg mt-4 w-full">Continue</button>
                </div>
                <div className="w-1/3 ml-6">
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
