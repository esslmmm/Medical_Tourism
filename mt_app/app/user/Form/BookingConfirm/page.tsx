'use client';

import React from 'react';
import ContactDetails from '../../../../components/user_components/BookingConfirm/ContactDetails';
import PatientDetails from '../../../../components/user_components/BookingConfirm/PatientDetails';
import ConfirmButton from '../../../../components/user_components/BookingConfirm/ConfirmButton';
import MedicalService from '../../../../components/user_components/BookingDetails/MedicalService';
import PlaceToVisit from '../../../../components/user_components/BookingDetails/PlaceToVisit';
import Accommodation from '../../../../components/user_components/BookingDetails/Accommodation';
import Interpreter from '../../../../components/user_components/BookingDetails/Interpreter';

export default function ConfirmBody() {
    return (
            <div className="flex bg-green-100">
                    {/* Left Section: Contact & Patient Details */}
                    <div className="col-span-2 w-2/3">
                        <ContactDetails />
                        <PatientDetails />
                        <ConfirmButton />
                    </div>

                    {/* Right Section: Additional Services */}
                    <div className="w-1/3 bg-white border-l border-[#E0E0E0]">
                        <MedicalService />
                        <PlaceToVisit />
                        <Accommodation />
                        <Interpreter />
                        <div className="mt-4 text-right">
                        <a href="#" className="text-blue-500 text-sm font-semibold">Show all detail</a>
                        </div>
                    </div>
            </div>
    );
}