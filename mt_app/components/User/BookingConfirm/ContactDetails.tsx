import React, { useEffect, useState } from 'react'
import { AppointmentFormData } from '@/app/user/Form/form';
import { useParams, useRouter } from 'next/navigation';


const ContactDetails = () => {
    const router = useRouter();
    const params = useParams<{ id: string }>();
    const id = params?.id;;
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
      <div className=''>
        {/* Contact Detail */}
        {form ? (
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-4 sm:p-6 shadow-md space-y-6 w-full max-w-5xl mx-auto">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Detail</h2>
              <div className="grid grid-cols-2 gap-4 text-gray-600">
                  <div>
                      <p className="font-bold">First Name :</p>
                      <p>{form.contact.firstname}</p>
                  </div>
                  <div>
                      <p className="font-bold">Last Name :</p>
                      <p>{form.contact.lastname}</p>
                  </div>
                  <div>
                      <p className="font-bold">Country :</p>
                      <p>{form.contact.country}</p>
                  </div>
                  <div>
                      <p className="font-bold">Phone :</p>
                      <p>{form.contact.dialCode} {form.contact.phoneNumber}</p>
                  </div>
                  <div className="col-span-2">
                      <p className="font-bold">Email :</p>
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