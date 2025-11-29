export type Contact = {
  firstname: string
  lastname: string
  email: string
  country: string
  dialCode: string
  phoneNumber: string
}

export type Patient = {
   appointment_id?: string
   gender: string
   firstname: string
   lastname: string
   dob: string
   passportId: string
   symptoms?: string
   file?: File | null
 }

export type File = {
  name: string
  size: number
  type: string
  lastModified: number
  base64: string
}

export type AppointmentFormData = {
  selectedDate?: Date | null
  selectedTime?: string | null
  child?: number;
  adult?: number;
  contact: Contact
  patient: Patient[]
}