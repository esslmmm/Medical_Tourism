
export interface PackageBooking {
  booking_id: number;
  appointment_id: number;
  status: string;
  create_at: string;
  tourism_bookings: tourism_bookings;
  appointments: appointments;
  packages: packages;
  user: user;
  user_contact_detail: user_contact_detail;
}

export interface user_contact_detail{
  country: string;
  phone: number;
  firstname: string;
  lastname: string;
}

export interface user {
  id: number;
  name: string;
}

export interface packages{
  image: string;
  package_name: string;
  hospitals: hospitals;
}

export interface appointments {
  appointment_id: number;
  date: string;
  timeslot: string;
  description: string;
  adult: number;
  child: number;
  status: string;
  appointment_files?: AppointmentFile[];
}

export interface AppointmentFile {
  id: number;
  appointmentId: number;
  fileId: number;
  createdAt: string;
  files: File;
}

export interface File {
  id: number;
  userId: number;
  originalName: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  cloudinaryId: string;
  url: string;
  uploadedAt: string;
  category: string;
  description: string | null;
}

export interface tourism_bookings {
  tourism_id: number;
  status: string;
  routes: routes;
  guide_bookings: guide_bookings;
}

export interface routes {
  title: string;
  image: string;
  duration: number;
  attractions: attractions[];
}

export interface attractions {
  attraction_id: number;
  places: Places;
}

export interface Places {
  place_id: number;
  name: string;
  image: string;
  description: string;
  fee: number;
}

export interface guide_bookings {
  booking_id: number;
  start: string;
  end: string;
  language: string;
  status: string
}

export interface hospitals {
  hospital_id: number;
  name: string;
  hospital_code: string;
  contact_info: string;
  image: string;
}