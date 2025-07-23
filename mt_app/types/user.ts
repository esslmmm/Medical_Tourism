
export interface User {
  id: number;
  name?: string | null;
  image?: string | null;
  email: string;
  google_id?: string;
  is_email_verified: boolean;
  otp?: string;
  otp_expiry?: Date;
  role?: 'admin' | 'staff' | 'customer';
  created_at: Date;
  updated_at: Date;
}

export interface CreateUserData {
  email: string;
  name?: string | null;
  image?: string | null;
  otp?: string | null;
  otpExpiry?: Date | null;
  isEmailVerified?: boolean;
  role?: 'admin' | 'staff' | 'customer';
}


export interface ApiResponse {
  message: string;
  email?: string;
  user?: {
    id: number;
    email: string;
    isEmailVerified: boolean;
  };
  error?: string;
  valid?: boolean;
}