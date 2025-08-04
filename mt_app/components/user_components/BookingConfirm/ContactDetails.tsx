import React, { useEffect, useState } from 'react'
import { AppointmentFormData } from '@/app/user/Form/form';
import { useParams, useRouter } from 'next/navigation';


const ContactDetails = () => {
    const router = useRouter();
    const { id } = useParams();
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
      <div className='max-w-2xl mx-auto p-6'>
        {/* Contact Detail */}
        {form ? (
          <div className="bg-white p-6 rounded-lg shadow border border-[#C5D1E0]">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Detail</h2>
              <div className="grid grid-cols-2 gap-4 text-gray-600">
                  <div>
                      <p className="font-medium">First Name</p>
                      <p>{form.patient.firstname}</p>
                  </div>
                  <div>
                      <p className="font-medium">Last Name</p>
                      <p>{form.patient.lastname}</p>
                  </div>
                  <div>
                      <p className="font-medium">Country</p>
                      <p>{form.contact.country}</p>
                  </div>
                  <div>
                      <p className="font-medium">Phone</p>
                      <p>{form.contact.dialCode} {form.contact.phoneNumber}</p>
                  </div>
                  <div className="col-span-2">
                      <p className="font-medium">Email</p>
                      <p>{form.contact.email}</p>
                  </div>
              </div>
          </div>
          ) : (
        <p>Loading...</p>
        )}
        </div>
  )
}

export default ContactDetails