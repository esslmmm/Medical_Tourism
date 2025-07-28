import postgres from 'postgres';
import { User, CreateUserData } from '../types/user';

// Optimize connection with proper pooling and configuration
const sql = postgres(process.env.DATABASE_URL!, {
  // Connection pooling settings
  max: 10,          // Maximum number of connections
  idle_timeout: 20, // Close idle connections after 20 seconds
  connect_timeout: 10, // Connection timeout in seconds
  
  // Performance optimizations
  prepare: false,   // Disable prepared statements for better performance in some cases
  transform: {
    undefined: null // Transform undefined to null automatically
  },
  
  // Error handling
  onnotice: () => {}, // Suppress notices for cleaner logs
});

// Connection management - reuse the same instance
export async function getConnection() {
  return sql;
}

// Add connection health check
export async function checkConnection(): Promise<boolean> {
  try {
    await sql`SELECT 1`;
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}


// Optimized user lookup with better error handling
export async function findUserByEmail(email: string): Promise<User | null> {
  if (!email?.trim()) {
    throw new Error('Email is required');
  }

  try {
    const rows = await sql<User[]>`
      SELECT * FROM "user" 
      WHERE LOWER(email) = LOWER(${email.trim()})
      LIMIT 1
    `;
    return rows[0] || null;
  } catch (error) {
    console.error('Error finding user by email:', error);
    throw error;
  }
}

// Optimized create or update - fallback to separate operations if UPSERT fails
export async function createOrUpdateUser(userData: CreateUserData): Promise<User | null> {
  if (!userData.email?.trim()) {
    throw new Error('Email is required');
  }

  try {
    const { email, name, image, otp, otpExpiry, isEmailVerified } = userData;
    const trimmedEmail = email.trim();

    // First, try to find existing user
    const existingUser = await findUserByEmail(trimmedEmail);

    if (existingUser) {
      // Update existing user
      const rows = await sql<User[]>`
        UPDATE "user" SET 
          name = COALESCE(${name || null}, name),
          image = COALESCE(${image || null}, image),
          otp = ${otp || null},
          otp_expiry = ${otpExpiry || null},
          is_email_verified = COALESCE(${isEmailVerified ?? null}, is_email_verified),
          "updatedAt" = CURRENT_TIMESTAMP
        WHERE LOWER(email) = LOWER(${trimmedEmail})
        RETURNING *
      `;
      return rows[0] || null;
    } else {
      // Create new user
      const rows = await sql<User[]>`
        INSERT INTO "user" 
          (email, name, image, otp, otp_expiry, is_email_verified, "updatedAt")
        VALUES 
          (${trimmedEmail}, ${name || null}, ${image || null}, ${otp || null}, 
           ${otpExpiry || null}, ${isEmailVerified || false}, CURRENT_TIMESTAMP)
        RETURNING *
      `;
      return rows[0] || null;
    }
  } catch (error) {
    console.error("Error creating or updating user:", error);
    throw error;
  }
}

// Optimized verification update
export async function updateUserVerification(email: string, isVerified: boolean = true): Promise<User | null> {
  if (!email?.trim()) {
    throw new Error('Email is required');
  }

  try {
    const rows = await sql<User[]>`
      UPDATE "user" SET 
        is_email_verified = ${isVerified},
        otp = NULL,
        otp_expiry = NULL,
        "updatedAt" = CURRENT_TIMESTAMP
      WHERE LOWER(email) = LOWER(${email.trim()})
      RETURNING *
    `;
    
    return rows[0] || null;
  } catch (error) {
    console.error('Error updating user verification:', error);
    throw error;
  }
}

// Optimized profile update with return value
export async function updateUserProfile({
  email,
  name,
  image,
}: {
  email: string;
  name?: string;
  image?: string;
}): Promise<User | null> {
  if (!email?.trim()) {
    throw new Error('Email is required');
  }

  try {
    const rows = await sql<User[]>`
      UPDATE "user" SET 
        name = COALESCE(${name || null}, name),
        image = COALESCE(${image || null}, image),
        "updatedAt" = CURRENT_TIMESTAMP
      WHERE LOWER(email) = LOWER(${email.trim()})
      RETURNING *
    `;
    
    return rows[0] || null;
  } catch (error) {
    console.error("Failed to update user profile:", error);
    throw error;
  }
}

// Add cleanup function for expired OTPs (call this periodically)
export async function cleanupExpiredOTPs(): Promise<number> {
  try {
    const result = await sql`
      UPDATE "user" 
      SET otp = NULL, otp_expiry = NULL, "updatedAt" = CURRENT_TIMESTAMP
      WHERE otp_expiry < CURRENT_TIMESTAMP 
        AND otp IS NOT NULL
    `;
    
    return result.count;
  } catch (error) {
    console.error('Error cleaning up expired OTPs:', error);
    throw error;
  }
}

// Graceful shutdown
export async function closeConnection(): Promise<void> {
  try {
    await sql.end();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error closing database connection:', error);
  }
}