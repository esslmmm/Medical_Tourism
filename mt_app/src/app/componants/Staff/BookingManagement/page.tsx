'use client';
import SideBar from './BookingManagement/SideBar';
import Header from './BookingManagement/Header';
import ContactDetails from './BookingManagement/ContactDetails';
import PatientDetails from './BookingManagement/PatientDetails';

export default function UserDetail() {
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <SideBar />

            {/* Main Content */}
            <main className="flex-1 bg-gray-50 p-8">
                {/* Header */}
                <Header />

                {/* User Details */}
                <section className="mt-6 space-y-4">
                    {/* Contact Detail */}
                    <ContactDetails />

                    {/* Patient Detail */}
                    <PatientDetails />
                </section>
            </main>
        </div>
    );
}
