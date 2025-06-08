'use client';

import React from 'react';
import ContactDetails from '../../../../../components/user_components/BookingConfirm/ContactDetails';
import PatientDetails from '../../../../../components/user_components/BookingConfirm/PatientDetails';
import ConfirmButton from '../../../../../components/user_components/BookingConfirm/ConfirmButton';
import MedicalService from '../../../../../components/user_components/BookingDetails/MedicalService';
import PlaceToVisit from '../../../../../components/user_components/BookingDetails/PlaceToVisit';
import Accommodation from '../../../../../components/user_components/BookingDetails/Accommodation';
import Interpreter from '../../../../../components/user_components/BookingDetails/Interpreter';

export default function ConfirmBody() {
    return (
                    <div className="col-span-2 w-2/3">
                        <ContactDetails />
                        <PatientDetails />
                        <ConfirmButton />
                    </div>
    );
}