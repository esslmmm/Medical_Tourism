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
    id: string;
    title: string;
    hospitalId: string;
    hospitalName: string;
    category: string;
    price: number;
    duration: number;
    description: string;
    services: string[];
    rating: number;
    reviewCount: number;
    status: 'active' | 'inactive';
    isPopular: boolean;
    isTrending: boolean;
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