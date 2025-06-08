import React, { useEffect, useState } from 'react'
import { AppointmentFormData } from '../../../app/user/Form/form';
import { useRouter, usePathname, useParams } from 'next/navigation'
import { createAppointment } from '../../../app/api/booking/appointments/createAppointment';
import { createContactDetails } from '../../../app/api/booking/user_contact_details/createContact';
import { updatePackageBooking } from '../../../app/api/booking/packages/updatePackageBooking';

const ConfirmButton = () => {
  const router = useRouter();
  const { id } = useParams();
  const [form, setForm] = useState<AppointmentFormData | null>(null);

    useEffect(() => {
      const savedForm = localStorage.getItem('appointmentFormData');
      if (savedForm) {
        setForm(JSON.parse(savedForm));
      } else {
        router.push(`/user/Form/medical_appointment/${id}`);
      }
    }, []);

  const handleConfirm = async () => {
    const savedForm = localStorage.getItem('appointmentFormData');
    if (!savedForm) {
      alert('No form data found');
      return;
    }

    const form: AppointmentFormData = JSON.parse(savedForm);

    const appointmentData = {
      date: form.selectedDate,
      timeslot: form.selectedTime,
      description: form.details,
      file_name: form.file?.name ?? '',
      file_path: null,
      upload_date: new Date(),
      status: 'In_Progress',
      patient: {
        firstname: form.patient.firstname,
        lastname: form.patient.lastname,
        gender: form.patient.gender,
        dateofbirth: new Date(form.patient.dob),
        nationality: form.contact.country,
        passport_number: form.patient.passportId,
      }
    };

    const contactData = {
      firstname: form.contact.firstname,
      lastname: form.contact.lastname,
      email: form.contact.email,
      country: form.contact.country,
      phone: Number(form.contact.phoneNumber),
    };

    try {
      const appointmentResponse = await createAppointment(appointmentData);
      const contactResponse = await createContactDetails(contactData);

      if (!appointmentResponse || appointmentResponse.error) {
        throw new Error(appointmentResponse?.error || 'Server error');
      }

      if (!contactResponse || contactResponse.error) {
        throw new Error(contactResponse?.error || 'Server error');
      }

      const appointment_id = appointmentResponse.appointment_id;
      const patient_id = appointmentResponse.patient_id;
      const contact_id = contactResponse.id;
      const status = "Pending";
      const package_booking_id = localStorage.getItem('package_booking_id');

      if (!package_booking_id || !appointment_id || !contact_id || !patient_id) {
        throw new Error('Missing necessary booking ID(s).');
      }

      await updatePackageBooking(Number(package_booking_id), {
        appointment_id,
        contact_id,
        status
      });

      localStorage.removeItem('appointmentFormData');

      router.push('/user/profile/approval-status/1');
    } catch (err) {
      console.error('Failed to confirm booking:', err);
      console.log('Something went wrong. Please try again.');
    }
  };




  if (!form) return <p>Loading...</p>

  return (
      <div className='max-w-2xl mx-auto p-6 '>
        <button className="w-full bg-[#2196F3] text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-300" onClick={handleConfirm}>
          Confirm
      </button></div>
  )
}

export default ConfirmButton