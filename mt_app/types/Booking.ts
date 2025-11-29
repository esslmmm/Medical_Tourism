
export interface PackageBooking {
  booking_id: number;
  appointment_id: number;
  price: number;
  status: string;
  create_at: string;
  tourism_bookings: tourism_bookings;
  appointments: appointments;
  packages: packages;
  user: user;
  user_contact_detail: user_contact_detail;
  payment: Payment[];
}

export interface Payment {
  amount: number;
  status: string;
}

export interface user_contact_detail{
  country: string;
  phone: number;
  firstname: string;
  lastname: string;
  email: string;
}

export interface user {
  id: number;
  name: string;
}

export interface packages{
  package_id: number;
  image: string;
  package_name: string;
  hospitals: hospitals;
  description: description[];
}

export interface description {
  description_id: number;
  text: string;
}


export interface appointments {
  appointment_id: number;
  date: string;
  timeslot: string;
  adult: number;
  child: number;
  status: string;
  patient_details: patient_details[];
}

export interface patient_details {
   patient_id: number;
   firstname: string;
   lastname: string;
   gender: string;
   dateofbirth: string;
   nationality: string;
   passport_number: string;
   symptoms?: string;
   appointment_files?: AppointmentFile;
 }

export interface AppointmentFile {
   id: number;
   fileId: string;
   createdAt: string;
   files: File;
 }

export interface File {
   id: string;
   userId: number;
   originalName: string;
   fileName: string;
   fileType: string;
   fileSize: number;
   cloudinaryId: string;
   url: string;
   uploadedAt: string;
   category: string;
   description?: string | null;
 }

export interface tourism_bookings {
  tourism_id: number;
  start: string;
  end: string;
  adult: number;
  child: number;
  status: string;
  routes: routes;
  guide_bookings: guide_bookings;
}

export interface routes {
  route_id: number;
  title: string;
  adult_price: number;
  child_price: number;
  guide_price: number;
  car_service_price: number;
  duration: string;
  image: string;
  attractions: attractions[];
  tags: Tags[];
}

export interface Tags {
  tag_id: number;
  tag: string;
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