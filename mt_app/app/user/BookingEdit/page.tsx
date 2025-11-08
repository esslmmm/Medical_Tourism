'use client';

import ContactDetails from '@/components/User/BookingEdit/ContactDetails';
import PatientDetails from '@/components/User/BookingEdit/PatientDetails';
import MedicalService from '@/components/User/BookingEdit/MedicalService';
import PlaceToVisit from '@/components/User/BookingEdit/PlaceToVisit';
import Accommodation from '@/components/User/BookingEdit/Accommodation';
import CarService from '@/components/User/BookingEdit/CarService';
import Guide from '@/components/User/BookingEdit/Guide';


export default function AppointmentForm() {


    return (
        <div>
            {/* <NavbarBookingEdit /> */}
            <div className="flex min-h-screen bg-gray-100 p-10 flex-row gap-6">
                <div className="flex flex-col gap-6 w-2/3">
                    <ContactDetails />
                    <PatientDetails />
                </div>
                <div className="w-1/3">
                    <MedicalService />
                    <PlaceToVisit />
                    <Accommodation />
                    <Guide />
                    <CarService />
                    <div className="mt-4 text-right">
                        <a href="#" className="text-blue-500 text-sm font-semibold">Show all detail</a>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    );
}
