import { NextApiRequest, NextApiResponse } from 'next';
import { formatForMySQL, generateOTP, generateOTPExpiry } from '../../../utils/otpGenerator';
import { sendOTPEmail } from '../../../utils/emailService';
import { createOrUpdateUser, initDatabase } from '../../../utils/database';
import { ApiResponse } from '../../../types/user';

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Rate limiting map (in production, use Redis or database)
const otpRequestTracker = new Map<string, { count: number; lastRequest: number }>();
const MAX_OTP_REQUESTS = 5; // Maximum requests per hour
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Initialize database if needed
    await initDatabase();
    
    const { email }: { email: string } = req.body;

    // Validate email presence
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Sanitize and validate email format
    const sanitizedEmail = email.trim().toLowerCase();
    if (!EMAIL_REGEX.test(sanitizedEmail)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Rate limiting check
    const now = Date.now();
    const userRequests = otpRequestTracker.get(sanitizedEmail);
    
    if (userRequests) {
      // Reset counter if window has passed
      if (now - userRequests.lastRequest > RATE_LIMIT_WINDOW) {
        otpRequestTracker.set(sanitizedEmail, { count: 1, lastRequest: now });
      } else if (userRequests.count >= MAX_OTP_REQUESTS) {
        return res.status(429).json({ 
          message: 'Too many OTP requests. Please try again later.' 
        });
      } else {
        // Increment counter
        otpRequestTracker.set(sanitizedEmail, { 
          count: userRequests.count + 1, 
          lastRequest: now 
        });
      }
    } else {
      // First request for this email
      otpRequestTracker.set(sanitizedEmail, { count: 1, lastRequest: now });
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = generateOTPExpiry();

    // Format expiry for MySQL datetime
    const mysqlExpiry = formatForMySQL(otpExpiry);

    // Save OTP to user record
    const user = await createOrUpdateUser({
      email: sanitizedEmail,
      otp,
      otpExpiry: mysqlExpiry,
      isEmailVerified: false
    });

    console.log(`OTP generated for user: ${sanitizedEmail}`);

    // Send OTP email
    const emailResult = await sendOTPEmail(sanitizedEmail, otp);

    if (emailResult.success) {
      console.log(`OTP sent successfully to: ${sanitizedEmail}`);
      res.status(200).json({ 
        message: 'OTP sent successfully',
        email: sanitizedEmail 
      });
    } else {
      console.error(`Failed to send OTP to ${sanitizedEmail}:`, emailResult.error);
      res.status(500).json({ 
        message: 'Failed to send OTP',
        error: emailResult.error 
      });
    }

  } catch (error) {
    console.error('Error in send-otp:', error);
    
    // More specific error handling
    if (error instanceof Error) {
      // Check if it's a database connection error
      if (error.message.includes('database') || error.message.includes('connection')) {
        return res.status(503).json({ message: 'Database service temporarily unavailable' });
      }
      
      // Check if it's a validation error
      if (error.message.includes('validation')) {
        return res.status(400).json({ message: 'Invalid input data' });
      }
    }
    
    res.status(500).json({ message: 'Internal server error' });
  }
}