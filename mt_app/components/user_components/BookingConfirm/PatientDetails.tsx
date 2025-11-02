import React, { useEffect, useState } from 'react'
import { AppointmentFormData } from '@/app/user/Form/form';
import { useParams, useRouter } from 'next/navigation';

const PatientDetails = () => {
    const router = useRouter();
    const params = useParams<{ id: string }>();
    const id = params?.id;
    const [form, setForm] = useState<AppointmentFormData | null>(null);
    
      useEffect(() => {
            const savedForm = localStorage.getItem('appointmentFormData');
            if (savedForm) {
              setForm(JSON.parse(savedForm));
            } else {
              router.push(`/user/Form/medical_appointment/${id}`); // fallback if user lands directly
            }
          }, []);

  return (
      <div className="max-w-2xl mx-auto p-6">
        {/* Patient Details */}
        {form && form.patient && form.patient.length > 0 ? (
          form.patient.map((patient, index) => (
            <div
              key={index}
              className="bg-white p-6 mb-6 rounded-lg shadow border border-[#C5D1E0]"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Patient {index + 1} Detail
              </h2>

              <div className="grid grid-cols-2 gap-4 text-gray-600">
                <div>
                  <p className="font-medium">First Name</p>
                  <p>{patient.firstname || '-'}</p>
                </div>
                <div>
                  <p className="font-medium">Last Name</p>
                  <p>{patient.lastname || '-'}</p>
                </div>
                <div>
                  <p className="font-medium">Gender</p>
                  <p>{patient.gender || '-'}</p>
                </div>
                <div>
                  <p className="font-medium">Nation</p>
                  <p>{form.contact.country || '-'}</p>
                </div>
                <div>
                  <p className="font-medium">Date of Birth</p>
                  <p>{patient.dob || '-'}</p>
                </div>
                <div>
                  <p className="font-medium">Passport ID</p>
                  <p>{patient.passportId || '-'}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>

  )
}

export default PatientDetails