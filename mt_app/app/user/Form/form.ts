export type Contact = {
  firstname: string
  lastname: string
  email: string
  country: string
  dialCode: string
  phoneNumber: string
}

export type Patient = {
  appointment_id: string
  gender: string
  firstname: string
  lastname: string
  dob: string
  passportId: string
}

export type AppointmentFormData = {
  selectedDate?: Date | null
  selectedTime?: string | null
  file?: File[] | null
  child?: number;
  adult?: number;
  details: string
  contact: Contact
  patient: Patient[]
}