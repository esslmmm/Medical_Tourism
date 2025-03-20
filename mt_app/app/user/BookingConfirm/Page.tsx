'use client';

import React from 'react';
import ContactDetails from '../../../components/user_components/BookingConfirm/ContactDetails';
import PatientDetails from '../../../components/user_components/BookingConfirm/PatientDetails';
import MedicalService from '../../../components/user_components/BookingConfirm/MedicalService';
import ConfirmButton from '../../../components/user_components/BookingConfirm/ConfirmButton';
import PlaceToVisit from '../../../components/user_components/BookingConfirm/PlaceToVisit';
import Accommodation from '../../../components/user_components/BookingConfirm/Accommodation';
import Interpreter from '../../../components/user_components/BookingConfirm/Interpreter';
import CarService from '../../../components/user_components/BookingConfirm/CarService';
// import NavbarBookingConfirm from "../../../components/user_components/BookingConfirm/NavbarBookingConfirm";
// import Footer from "../../../components/user_components/BookingConfirm/Footer";

export default function ConfirmBody() {
    return (
        <div>
            {/* <NavbarBookingConfirm /> */}
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
            {/* <Footer /> */}
        </div>
    );
}