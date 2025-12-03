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
      <div className="">
        {/* Patient Details */}
        {form && form.patient && form.patient.length > 0 ? (
          form.patient.map((patient, index) => (
            <div
              key={index}
              className="bg-white border-2 border-gray-200 rounded-2xl p-4 sm:p-6 shadow-md space-y-6 w-full max-w-5xl mb-2 mx-auto"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Patient Detail ({index + 1})
              </h2>

              <div className="grid grid-cols-2 gap-4 text-gray-600">
                <div>
                  <p className="font-bold">First Name :</p>
                  <p>{patient.firstname || '-'}</p>
                </div>
                <div>
                  <p className="font-bold">Last Name :</p>
                  <p>{patient.lastname || '-'}</p>
                </div>
                <div>
                  <p className="font-bold">Gender :</p>
                  <p>{patient.gender || '-'}</p>
                </div>
                <div>
                  <p className="font-bold">Date of Birth :</p>
                  <p>{patient.dob || '-'}</p>
                </div>
                <div>
                  <p className="font-bold">Passport ID :</p>
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