'use client';

import React from 'react';
import ContactDetails from '@/components/User/BookingConfirm/ContactDetails';
import PatientDetails from '@/components/User/BookingConfirm/PatientDetails';
import ConfirmButton from '@/components/User/BookingConfirm/ConfirmButton';

export default function ConfirmBody() {
    return (
                    <div className="col-span-2 w-2/3">
                        <ContactDetails />
                        <PatientDetails />
                        <ConfirmButton />
                    </div>
    );
}