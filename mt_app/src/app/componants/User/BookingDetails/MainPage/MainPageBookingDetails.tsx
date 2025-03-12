'use client';
import { useState } from 'react';
import ContactDetails from '../Components/ContactDetails';
import PatientDetails from '../Components/PatientDetails';
import MedicalService from '../Components/MedicalService';
import PlaceToVisit from '../Components/PlaceToVisit';
import Accommodation from '../Components/Accommodation';
import Interpreter from '../Components/Interpreter';
import CarService from '../Components/CarService';

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
    );
}
