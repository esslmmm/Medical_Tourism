import React, { use, useEffect, useState } from 'react'
import { AppointmentFormData } from '@/app/user/Form/form';
import { useRouter, useParams } from 'next/navigation'
import { createContactDetails } from '@/app/api/booking/user_contact_details/createContact';
import { createAppointmentFile } from '@/app/api/files/createAppointmentFile';
import { useUserId } from '@/hooks/useUserId';
import { createPatient } from '@/app/api/booking/patients/createPatient';
import { updateAppointment } from '@/app/api/booking/appointments/updateAppointment';
import { createPackageBooking } from '@/app/api/booking/packages/createPackageBooking';

const ConfirmButton = () => {
	const params = useParams<{ id: string }>();
  	const id = params?.id;
	const [form, setForm] = useState<AppointmentFormData | null>(null);
	const [fileData, setFileData] = useState<any | null>(null);
	const [uploading, setUploading] = useState(false);
	const { userId } = useUserId();
	const router = useRouter();

    useEffect(() => {
      const savedForm = localStorage.getItem('appointmentFormData');
      if (savedForm) {
        setForm(JSON.parse(savedForm));
      } else {
        router.push(`/user/Form/medical_appointment/${id}`);
      }
	  const savedFile = localStorage.getItem('selectedFile');
      if (savedFile) {
        setFileData(JSON.parse(savedFile));
      }
    }, []);


    const base64ToFile = (base64String: string, fileName: string, mimeType: string): File => {
    const byteCharacters = atob(base64String.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new File([byteArray], fileName, { type: mimeType });
      };


      const uploadToCloudinary = async (file: File): Promise<any> => {
		const endpoint = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`;

		const formData = new FormData();
		formData.append('file', file);
		formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
		formData.append('folder', 'Medical_report/documents');

		const response = await fetch(endpoint, {
			method: 'POST',
			body: formData,
		});

		const data = await response.json();

		if (data.error) throw new Error(data.error.message);
		return data;
	};



	const handleConfirm = async () => {
		if (!form) {
		  alert("No form data found");
		  return;
		}
	  
		setUploading(true);
	  
		try {
		  let file_id: string | null = null;
	  
		  // ✅ Only handle file upload if user provided one
		  if (fileData) {
			// Convert base64 back to File object
			const file = base64ToFile(fileData.base64, fileData.name, fileData.type);
			console.log("File converted successfully:", file.name);
	  
			// Upload file to Cloudinary
			const cloudinaryResult = await uploadToCloudinary(file);
	  
			// Save metadata
			const metadataResponse = await fetch("/api/upload/save-metadata", {
			  method: "POST",
			  headers: {
				"Content-Type": "application/json",
			  },
			  body: JSON.stringify({
				userId: userId,
				fileName: cloudinaryResult.original_filename || cloudinaryResult.public_id,
				originalName: cloudinaryResult.original_filename || fileData.name,
				fileType: cloudinaryResult.format,
				fileSize: cloudinaryResult.bytes,
				category: "MEDICAL_REPORT",
				cloudinaryId: cloudinaryResult.public_id,
				url: cloudinaryResult.secure_url,
			  }),
			});
	  
			if (!metadataResponse.ok) {
			  const errorText = await metadataResponse.text();
			  console.error("Metadata save failed:", errorText);
			  throw new Error(
				`Failed to save file metadata: ${metadataResponse.status} - ${errorText}`
			  );
			}

		  const metadataData = await metadataResponse.json();
			file_id = metadataData.fileId;
		  }

			const appointment_id = localStorage.getItem("appointment_id");
		  console.log("Using appointment_id:", appointment_id);
		  if (!appointment_id) {
			throw new Error("Missing appointment_id in localStorage");
		  }
	  
		  // Create appointment
		  const patientsData = form.patient.map((patient) => ({
			appointment_id: appointment_id,
			firstname: patient.firstname,
			lastname: patient.lastname,
			gender: patient.gender,
			dateofbirth: new Date(patient.dob),
			nationality: form.contact.country,
			passport_number: patient.passportId,
		  }));
	  
		  const patientResponse = await createPatient(patientsData);
	  
		  if (!patientResponse || patientResponse.error) {
			throw new Error(
			  patientResponse?.error || "Failed to create patients"
			);
		  }

		  const updateAppResponse = await updateAppointment(String(appointment_id), {
			   description: form.details,
		  });

		  if (updateAppResponse && updateAppResponse.error) {
			throw new Error(`Failed to update appointment booking: ${updateAppResponse.error}`);
		  }

		  // ✅ If file uploaded, link it with appointment
		  if (file_id) {
			const appointmentFileResponse = await createAppointmentFile(
			  appointment_id,
			  file_id
			);
	  
			if (appointmentFileResponse && appointmentFileResponse.error) {
			  throw new Error(
				`Failed to create appointment file association: ${appointmentFileResponse.error}`
			  );
			}
		  }
	  
		  // Create contact details
		  const contactData = {
			firstname: form.contact.firstname,
			lastname: form.contact.lastname,
			email: form.contact.email,
			country: form.contact.country,
			phone: Number(form.contact.phoneNumber),
		  };
	  
		  const contactResponse = await createContactDetails(contactData);
	  
		  if (!contactResponse || contactResponse.error) {
			throw new Error(
			  contactResponse?.error || "Failed to create contact details"
			);
		  }
	  
		  // Extract IDs
		  const contact_id = contactResponse.id;
		  const tourism_id = localStorage.getItem("tourism_id");
		  const TotalPriceString = localStorage.getItem("TotalPrice");

		  if (!tourism_id) {
			throw new Error("Missing toursim id for create package booking");
		  }
		  if (!appointment_id) {
			throw new Error("Missing appointment id for create package booking");
		  }
		  if (!contact_id) {
			throw new Error("Missing contact id for create package booking");
		  }

		  const bookingData = {
			package_id: id,
			contact_id: contact_id,
			price: Number(TotalPriceString),
			appointment_id: appointment_id,
			tourism_booking_id: tourism_id,
			user_id: Number(userId),
			status: "Pending",
		  };
	  
		  // Create package booking
		  const packageResponse = await createPackageBooking(bookingData);
	  
		  if (!packageResponse || packageResponse.error || !packageResponse.booking_id) {
			throw new Error(packageResponse?.error || "Failed to create package booking");
		  }
	  
	  
		  // Clean up localStorage
		  localStorage.removeItem("appointmentFormData");
		  localStorage.removeItem("appointment_id");
		  localStorage.removeItem("tourism_id");
		  localStorage.removeItem("TotalPrice");
		  localStorage.removeItem("selectedFile");
	  
		  // Navigate to success page
		  router.push(`/user/profile/approval-status`);
		} catch (err) {
		  console.error("Failed to confirm booking:", err);
	  
		  if (err instanceof Error) {
			console.error("Error message:", err.message);
			console.error("Error stack:", err.stack);
			alert(`Error: ${err.message}`);
		  } else {
			console.error("Unknown error:", err);
			alert("An unknown error occurred. Please try again.");
		  }
		} finally {
		  setUploading(false);
		}
	  };
	  


  if (!form ) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center">
          <p className="text-gray-500">Loading confirmation data...</p>
        </div>
      </div>
    );
  }

  return (
      <div className=''>
        <button
        onClick={handleConfirm}
        disabled={uploading}
        className={`w-full py-3 px-4 rounded-xl font-bold ${
          uploading
            ? ' text-white bg-gray-400 cursor-not-allowed'
            : 'bg-teal-500 text-white cursor-pointer'
        }`}
      >
        {uploading ? 'Uploading File and Confirming...' : 'Confirm'}
      </button>
      </div>
  )
}

export default ConfirmButton