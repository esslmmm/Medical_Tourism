'use client';

import ContactDetails from '@/components/user_components/BookingEdit/ContactDetails';
import PatientDetails from '@/components/user_components/BookingEdit/PatientDetails';
import MedicalService from '@/components/user_components/BookingEdit/MedicalService';
import PlaceToVisit from '@/components/user_components/BookingEdit/PlaceToVisit';
import Accommodation from '@/components/user_components/BookingEdit/Accommodation';
import Interpreter from '@/components/user_components/BookingEdit/Interpreter';
import CarService from '@/components/user_components/BookingEdit/CarService';


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
                    <Interpreter />
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
