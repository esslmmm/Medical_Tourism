// API Route - Just validate, don't clear OTP yet
import { NextApiRequest, NextApiResponse } from 'next';
import { findUserByEmail, initDatabase } from '../../../utils/database';
import { ApiResponse } from '../../../types/user';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await initDatabase();
    
    const { email, otp }: { email: string; otp: string } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.otp || !user.otp_expiry) {
      return res.status(400).json({ message: 'No OTP found. Please request a new one.' });
    }

    if (new Date() > new Date(user.otp_expiry)) {
      return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // OTP is valid - don't clear it yet, let NextAuth handle that
    res.status(200).json({ 
      message: 'OTP validated successfully',
      valid: true
    });

  } catch (error) {
    console.error('Error in verify-otp:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}