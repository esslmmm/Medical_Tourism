"use client";

import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useParams, useRouter } from "next/navigation";
import { AppointmentFormData } from "../../../app/user/Form/form";

type ValidationErrors = {
  file?: string;
  details?: string;
  contact: {
    firstname?: string;
    lastname?: string;
    email?: string;
    country?: string;
    dialCode?: string;
    phoneNumber?: string;
  };
  patient: {
    gender?: string;
    firstname?: string;
    lastname?: string;
    dob?: string;
    passportId?: string;
  }[];
};

type ContactField =
  | "firstname"
  | "lastname"
  | "email"
  | "country"
  | "dialCode"
  | "phoneNumber";



// Validation functions
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhoneNumber = (phone: string): boolean => {
  // Remove all non-digit characters and check if it's between 7-15 digits
  const digitsOnly = phone.replace(/\D/g, '');
  return digitsOnly.length >= 7 && digitsOnly.length <= 15;
};

const validateName = (name: string): boolean => {
  // Name should be at least 2 characters and contain only letters, spaces, hyphens, and apostrophes
  const nameRegex = /^[a-zA-Z\s\-']{2,50}$/;
  return nameRegex.test(name.trim());
};

const validatePassportId = (passportId: string): boolean => {
  // Passport ID should be 6-12 alphanumeric characters
  const passportRegex = /^[A-Za-z0-9]{6,12}$/;
  return passportRegex.test(passportId);
};

const validateFileSize = (file: File): boolean => {
  const maxSize = 10 * 1024 * 1024; // 10MB
  return file.size <= maxSize;
};

const validateFileType = (file: File): boolean => {
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
  return allowedTypes.includes(file.type);
};

const validateAge = (dob: string): boolean => {
  const birthDate = new Date(dob);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  const actualAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate()) 
    ? age - 1 : age;
  
  return actualAge >= 0 && actualAge <= 150; // Reasonable age range
};

export default function MedicalAppointment() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const [fileDataUrl, setFileDataUrl] = useState<string | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({
    contact: {},
    patient: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const [form, setForm] = useState<AppointmentFormData>({
    file: null,
    details: '',
    contact: {
      firstname: '', lastname: '', email: '', country: '', dialCode: '', phoneNumber: ''
    },
    patient: [],
  });

  useEffect(() => {
    const savedForm = localStorage.getItem('appointmentFormData');
    if (savedForm) {
      const parsedForm = JSON.parse(savedForm);

      const adultCount = parseInt(parsedForm.adult) || 0;
      const childCount = parseInt(parsedForm.child) || 0;
      const total = adultCount + childCount;

      // Create empty patient slots
      const patientsArray = Array.from({ length: total }, () => ({
        gender: '',
        firstname: '',
        lastname: '',
        dob: '',
        passportId: '',
      }));

      setForm((prev) => ({
        ...prev,
        ...parsedForm,
        patient: patientsArray,
      }));
    }
  }, []);

  // Validation function
  const validateForm = (): boolean => {
  const newErrors: ValidationErrors = {
    contact: {},
    patient: []
  };

  // File validation
  if (form.file) {
    if (!validateFileType(form.file)) {
      newErrors.file = 'File must be PDF, JPEG, JPG, or PNG';
    } else if (!validateFileSize(form.file)) {
      newErrors.file = 'File size must be less than 10MB';
    }
  }

  // Details validation
  if (form.details && form.details.length > 1000) {
    newErrors.details = 'Details must be less than 1000 characters';
  }

  // -------------------------------
  // Contact validation
  // -------------------------------
  if (!form.contact.firstname.trim()) {
    newErrors.contact.firstname = 'First name is required';
  } else if (!validateName(form.contact.firstname)) {
    newErrors.contact.firstname = 'First name must be 2-50 characters and contain only letters';
  }

  if (!form.contact.lastname.trim()) {
    newErrors.contact.lastname = 'Last name is required';
  } else if (!validateName(form.contact.lastname)) {
    newErrors.contact.lastname = 'Last name must be 2-50 characters and contain only letters';
  }

  if (!form.contact.email.trim()) {
    newErrors.contact.email = 'Email is required';
  } else if (!validateEmail(form.contact.email)) {
    newErrors.contact.email = 'Please enter a valid email address';
  }

  if (!form.contact.country) {
    newErrors.contact.country = 'Please select a country';
  }

  if (!form.contact.dialCode) {
    newErrors.contact.dialCode = 'Please select a dial code';
  }

  if (!form.contact.phoneNumber.trim()) {
    newErrors.contact.phoneNumber = 'Phone number is required';
  } else if (!validatePhoneNumber(form.contact.phoneNumber)) {
    newErrors.contact.phoneNumber = 'Please enter a valid phone number (7–15 digits)';
  }

  // -------------------------------
  // Patients validation
  // -------------------------------
  newErrors.patient = form.patient.map((patient) => {
    const patientErrors: Record<string, string> = {};

    if (!patient.gender) {
      patientErrors.gender = 'Please select a gender';
    }

    if (!patient.firstname.trim()) {
      patientErrors.firstname = 'Patient first name is required';
    } else if (!validateName(patient.firstname)) {
      patientErrors.firstname = 'First name must be 2–50 characters and contain only letters';
    }

    if (!patient.lastname.trim()) {
      patientErrors.lastname = 'Patient last name is required';
    } else if (!validateName(patient.lastname)) {
      patientErrors.lastname = 'Last name must be 2–50 characters and contain only letters';
    }

    if (!patient.dob) {
      patientErrors.dob = 'Date of birth is required';
    } else if (!validateAge(patient.dob)) {
      patientErrors.dob = 'Please enter a valid date of birth';
    }

    if (!patient.passportId.trim()) {
      patientErrors.passportId = 'Passport ID is required';
    } else if (!validatePassportId(patient.passportId)) {
      patientErrors.passportId = 'Passport ID must be 6–12 alphanumeric characters';
    }

    return patientErrors;
  });

  // Save errors in state
  setErrors(newErrors);

  

  // -------------------------------
  // Check if any errors exist
  // -------------------------------
  const hasErrors =
    newErrors.file ||
    newErrors.details ||
    Object.values(newErrors.contact).some((e) => e) ||
    newErrors.patient.some((p) => Object.values(p).some((e) => e));

  return !hasErrors;
};


  const handleFormSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    if (!validateForm()) {
      setIsSubmitting(false);
      // Scroll to first invalid field
      setTimeout(() => {
        const firstError = document.querySelector('.border-red-500');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
      return;
    }
    
    try {
      if (!form || !id) throw new Error("Form or ID missing");
      
      // Save form data to localStorage
      const formDataForStorage = {
        ...form,
        file: null // Don't store file object directly
      };
      localStorage.setItem('appointmentFormData', JSON.stringify(formDataForStorage));
      
      // FIX: Add opening parenthesis here
      router.push(`/user/Form/BookingConfirm/${id}`);
    } catch (error) {
      console.error('Error saving form:', error);
      alert('Error saving form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };


  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      
      // Clear previous file error
      setErrors(prev => ({ ...prev, file: undefined }));
      
      // Validate file immediately
      if (!validateFileType(selectedFile)) {
        setErrors(prev => ({ ...prev, file: 'File must be PDF, JPEG, JPG, or PNG' }));
        return;
      }
      
      if (!validateFileSize(selectedFile)) {
        setErrors(prev => ({ ...prev, file: 'File size must be less than 10MB' }));
        return;
      }
      
      // Convert file to base64 for storage
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target?.result as string;
        setFileDataUrl(base64String);
        
        // Store file data in localStorage
        const fileData = {
          name: selectedFile.name,
          size: selectedFile.size,
          type: selectedFile.type,
          lastModified: selectedFile.lastModified,
          base64: base64String
        };
        
        localStorage.setItem('selectedFile', JSON.stringify(fileData));
      };
      reader.readAsDataURL(selectedFile);
      
      setForm(prev => ({
        ...prev,
        file: selectedFile
      }));
    }
  };

  // Clear specific error when user starts typing
  const clearError = (field: string, section?: 'contact' | 'patient') => {
    setErrors(prev => {
      if (section) {
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [field]: undefined
          }
        };
      }
      return {
        ...prev,
        [field]: undefined
      };
    });
  };

  const countries = [
    { name: "United States", dial_code: "+1" },
    { name: "United Kingdom", dial_code: "+44" },
    { name: "Thailand", dial_code: "+66" },
    { name: "India", dial_code: "+91" },
    { name: "Germany", dial_code: "+49" },
    { name: "Australia", dial_code: "+61" },
    { name: "Japan", dial_code: "+81" },
    { name: "France", dial_code: "+33" }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white border-2 border-gray-200 rounded-2xl p-4 shadow-md sm:p-6">
        {/* Contact Details */}
        <div className="mb-4">
        <p className="text-slate-500 text-xs">For all booking</p>
        <h2 className="text-lg font-semibold text-black">Contact Details</h2>
        <p className="text-red-500 text-xs mt-2">*Required field</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* First Name, Last Name, Email */}
          {[ 
            { label: "First name", value: form.contact.firstname, key: "firstname" },
            { label: "Last name", value: form.contact.lastname, key: "lastname" },
            { label: "Email", value: form.contact.email, key: "email" },
          ].map(({ label, value, key }) => (
            <label
              key={key}
              className={`flex flex-col gap-1 p-3 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 transition ${
                errors.contact[key as keyof typeof errors.contact] ? 'border-red-500' : ''
              }`}
            >
              <span className="font-medium text-sm text-black">{label}<span className="text-red-600">*</span></span>
              <input
                type="text"
                value={value}
                onChange={(e) => {
                  setForm((prev) => ({
                    ...prev,
                    contact: {
                      ...prev.contact,
                      [key]: e.target.value
                    }
                  }));
                  clearError(key, 'contact');
                }}
                className="bg-transparent outline-none text-black"
              />
              {errors.contact[key as keyof typeof errors.contact] && (
                <span className="text-red-500 text-xs">
                  {errors.contact[key as keyof typeof errors.contact]}
                </span>
              )}
            </label>
          ))}

          {/* Country Dropdown */}
          <label className={`flex flex-col gap-1 p-3 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 transition ${
            errors.contact.country ? 'border-red-500' : ''
          }`}>
            <span className="font-medium text-sm text-black">Country<span className="text-red-600">*</span></span>
            <select
              value={form.contact.country}
              onChange={(e) => {
                const selected = countries.find(c => c.name === e.target.value);
                setForm((prev) => ({
                  ...prev,
                  contact: {
                    ...prev.contact,
                    country: e.target.value,
                    dialCode: selected?.dial_code || ""
                  }
                }));
                clearError('country', 'contact');
              }}
              className="bg-transparent outline-none text-black"
            >
              <option value="">Select Country</option>
              {countries.map((c) => (
                <option key={c.name} value={c.name}>{c.name}</option>
              ))}
            </select>
            {errors.contact.country && (
              <span className="text-red-500 text-xs">{errors.contact.country}</span>
            )}
          </label>

          {/* Dial Code + Phone Number */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:col-span-2">
            <label className={`flex flex-col gap-1 p-3 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 transition sm:col-span-1 ${
              errors.contact.dialCode ? 'border-red-500' : ''
            }`}>
              <span className="font-medium text-sm text-black">Dial Code<span className="text-red-600">*</span></span>
              <select
                value={form.contact.dialCode}
                onChange={(e) => {
                  setForm((prev) => ({
                    ...prev,
                    contact: {
                      ...prev.contact,
                      dialCode: e.target.value
                    }
                  }));
                  clearError('dialCode', 'contact');
                }}
                className="bg-transparent outline-none text-black"
              >
                <option value="">Select Code</option>
                {countries.map((c) => (
                  <option key={c.dial_code} value={c.dial_code}>
                    {c.name} ({c.dial_code})
                  </option>
                ))}
              </select>
              {errors.contact.dialCode && (
                <span className="text-red-500 text-xs">{errors.contact.dialCode}</span>
              )}
            </label>

            <label className={`flex flex-col gap-1 p-3 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 transition sm:col-span-2 ${
              errors.contact.phoneNumber ? 'border-red-500' : ''
            }`}>
              <span className="font-medium text-sm text-black">Phone Number<span className="text-red-600">*</span></span>
              <input
                type="text"
                value={form.contact.phoneNumber}
                onChange={(e) => {
                  // Allow only numbers, spaces, hyphens, and parentheses
                  const cleaned = e.target.value.replace(/[^0-9\s\-\(\)]/g, '');
                  setForm((prev) => ({
                    ...prev,
                    contact: {
                      ...prev.contact,
                      phoneNumber: cleaned
                    }
                  }));
                  clearError('phoneNumber', 'contact');
                }}
                placeholder="123-456-7890"
                className="bg-transparent outline-none text-black"
              />
              {errors.contact.phoneNumber && (
                <span className="text-red-500 text-xs">{errors.contact.phoneNumber}</span>
              )}
            </label>
          </div>
        </div>
      </div>

        {/* Patient Details */}
      {form.patient.map((patient, index) => (
        <div
          key={index}
          className="bg-white border-2 border-gray-200 rounded-2xl p-4 sm:p-6 shadow-md space-y-6 w-full max-w-5xl mx-auto"
        >
          <h2 className="text-lg font-semibold text-black">
            Patient Details ({index + 1})
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "First name", key: "firstname" },
              { label: "Last name", key: "lastname" },
              { label: "Date of Birth", key: "dob", type: "date" },
              { label: "Passport ID", key: "passportId" },
            ].map(({ label, key, type = "text" }) => (
              <label
                key={key}
                className="col-span-2 flex flex-col gap-1 p-3 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
              >
                <span className="font-medium text-sm text-black">{label}<span className="text-red-600">*</span></span>
                <input
                  type={type}
                  value={patient[key as keyof typeof patient]}
                  max={type === "date" ? new Date().toISOString().split('T')[0] : undefined}
                  onChange={(e) => {
                    setForm((prev) => {
                      const updatedPatients = [...prev.patient];
                      updatedPatients[index][key as keyof typeof patient] = e.target.value;
                      return { ...prev, patient: updatedPatients };
                    });
                  }}
                  className="bg-transparent outline-none text-black"
                />
              </label>
            ))}
          </div>
          {/* Gender */}
            <div className="col-span-1 sm:col-span-2">
              <span className=" text-black required font-bold">Gender<span className="text-red-600">*</span></span>
              <div className="flex items-center gap-6 mt-2">
                {["Male", "Female"].map((g) => (
                  <label
                    key={g}
                    className="flex items-center gap-2 text-black cursor-pointer"
                  >
                    <input
                      type="radio"
                      name={`gender-${index}`}
                      value={g}
                      checked={patient.gender === g}
                      onChange={(e) => {
                        setForm((prev) => {
                          const updatedPatients = [...prev.patient];
                          updatedPatients[index].gender = e.target.value;
                          return { ...prev, patient: updatedPatients };
                        });
                      }}
                    />
                    {g}
                  </label>
                ))}
              </div>
            </div>
          {/* Symptoms Details Section */}
          <div>
        <h2 className="text-black required font-bold mb-3">Symptoms Details</h2>
        
        {/* File Upload */}
        <div className="mb-4 text-black">
          <label className="block font-medium mb-2">Medical Report</label>
          <input
            type="file"
            accept=".pdf,.jpeg,.jpg,.png"
            onChange={handleFileSelect}
            className={`block w-full text-sm text-gray-500 border border-gray-300 rounded-lg p-3 bg-gray-50
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100 ${
                        errors.file ? 'border-red-500' : ''
                      }`}
          />
          {errors.file && (
            <p className="text-red-500 text-sm mt-1">{errors.file}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Accepted formats: PDF, JPEG, JPG, PNG (Max size: 10MB)
          </p>
        </div>
        
        {/* Textarea for Symptoms Details */}
        <div className="mb-4 text-black">
          <label className="block font-medium mb-2">
            More details about symptoms 
            <span className="text-sm text-gray-500">({form.details.length}/1000)</span>
          </label>
          <textarea
            className={`w-full p-3 border bg-gray-50 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.details ? 'border-red-500' : ''
            }`}
            rows={4}
            placeholder="Fill details"
            value={form.details}
            maxLength={1000}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, details: e.target.value }));
              clearError('details');
            }}
          />
          {errors.details && (
            <p className="text-red-500 text-sm mt-1">{errors.details}</p>
          )}
        </div>
        </div>

        </div>
      ))}
      

      {/* Continue Button */}
      <button 
        className={`w-full py-3 text-white font-bold rounded-xl transition ${
          isSubmitting 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-teal-500 text-white'
        }`}
        onClick={handleFormSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Processing...' : 'Continue'}
      </button>
    </div>
  );
}