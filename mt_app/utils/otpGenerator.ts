import crypto from 'crypto';

export function generateOTP(length: number = 6): string {
  const digits = '0123456789';
  let otp = '';
  
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  
  return otp;
}

export function generateOTPExpiry(): Date {
  const now = new Date();
  const expiry = new Date(now.getTime() + 10 * 60 * 1000); // 5 minutes from now
  
  return expiry;
}

export function formatForMySQL(date: Date): string {
  // Store in local timezone (Indochina) since server is configured correctly
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  const localString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  console.log('MySQL format (local):', localString);
  return localString;
}

// Utility to check if OTP is expired
export function isOTPExpired(otpExpiry: string): boolean {
  const now = new Date();
  const expiry = new Date(otpExpiry); // Treat DB time as local time
  
  return now > expiry;
}