'use client';
import ContactDetails from '../../../components/staff_component/BookingManagement/ContactDetails';
import PatientDetails from '../../../components/staff_component/BookingManagement/PatientDetails';

export default function UserDetail() {
    return (
        <div className="flex h-screen">
                    {/* Contact Detail */}
                    <ContactDetails />
                    {/* Patient Detail */}
                    <PatientDetails />
        </div>
    );
}
