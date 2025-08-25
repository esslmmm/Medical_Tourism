export type Contact = {
  firstname: string
  lastname: string
  email: string
  country: string
  dialCode: string
  phoneNumber: string
}

export type Patient = {
  gender: string
  firstname: string
  lastname: string
  dob: string
  passportId: string
}

export type AppointmentFormData = {
  selectedDate: Date | null
  selectedTime: string | null
  file?: File | null
  details: string
  contact: Contact
  patient: Patient
}