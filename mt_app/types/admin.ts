export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    status: 'new' | 'active' | 'inactive';
    createdAt: string;
    lastLogin?: string;
    bookingCount: number;
  }
  
  export interface Hospital {
    id: string;
    name: string;
    location: string;
    description: string;
    specialties: string[];
    rating: number;
    imageUrl: string;
    contactInfo: {
      phone: string;
      email: string;
      address: string;
    };
    isActive: boolean;
    createdAt: string;
  }
  
  export interface Package {
    package_id: string;
    package_name: string;
    hospital_id: string;
    image: string;
    hospitals: {
      name: string;
    }
    category: string;
    duration: string;
    description: string;
    services: string[];
    reviewCount: number;
    status: 'Active' | 'Inactive';
    imageUrl: string;
    createdAt: string;
  }
  
  export interface Booking {
    id: string;
    userId: string;
    userName: string;
    packageId: string;
    packageTitle: string;
    hospitalName: string;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    bookingDate: string;
    travelDate: string;
    totalAmount: number;
    createdAt: string;
  }
  
  export interface Feedback {
    id: string;
    userId: string;
    userName: string;
    packageId: string;
    packageTitle: string;
    rating: number;
    comment: string;
    status: 'pending' | 'approved' | 'rejected';
    category: 'service' | 'facility' | 'staff' | 'overall';
    createdAt: string;
  }
  
  export interface SupportTicket {
    id: string;
    userId: string;
    userName: string;
    subject: string;
    description: string;
    status: 'open' | 'in-progress' | 'resolved' | 'closed';
    priority: 'low' | 'medium' | 'high';
    assignedTo?: string;
    createdAt: string;
    resolvedAt?: string;
  }


// --------------- Doctor Interface -------------------- 
export interface DocEducation {
    education_id: string;
    doctor_id: string;
    field_of_study: string;
    institution: string;
    year: string;
  }
  
  export interface DocCertificate {
    certificate_id: string;
    doctor_id: string;
    field_of_study: string;
    institution: string;
    year: string;
  }
  
  export interface DocLanguage {
    language_id: string;
    doctor_id: string;
    languages: string;
  }
  
  export interface Doctor {
    doctor_id: string;
    name: string;
    specialization: string;
    hospital_id: string;
    experience: string;
    description: string;
    image: string;
    create_at: string;
    // Relations
    hospital?: {
      name: string;
      hospital_code: string;
    };
    doc_education: DocEducation[];
    doc_certificate: DocCertificate[];
    doc_language: DocLanguage[];
  }