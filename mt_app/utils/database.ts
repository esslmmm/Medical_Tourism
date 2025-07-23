import postgres from 'postgres';
import { User, CreateUserData } from '../types/user';

const sql = postgres(process.env.DATABASE_URL!);

export async function getConnection() {
  return sql;
}

// Initialize database tables
export async function initDatabase(): Promise<void> {

  try {
    // Create users table if it doesn't exist
    await sql`
  CREATE TABLE IF NOT EXISTS "user" (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    is_email_verified BOOLEAN DEFAULT FALSE,
    otp VARCHAR(10),
    otp_expiry TIMESTAMP,
    name VARCHAR(255),
    image TEXT,
    role VARCHAR(50) DEFAULT 'customer',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;
    console.log('Database tables initialized');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error; // Re-throw to handle in calling function
  }
}

// Find user by email
export async function findUserByEmail(email: string): Promise<User | null> {
  try {
    const rows = await sql<User[]>`
      SELECT * FROM "user" WHERE LOWER(email) = LOWER(${email})
    `;
    return rows[0] || null;
  } catch (error) {
    console.error('Error finding user by email:', error);
    throw error;
  }
}

// Create or Update user
export async function createOrUpdateUser(userData: CreateUserData): Promise<User | null> {
  try {
    const { email, name, image, otp, otpExpiry, isEmailVerified } = userData;
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      await sql`
        UPDATE "user" SET 
          name = COALESCE(${name ?? null}, name),
          image = COALESCE(${image ?? null}, image),
          otp = ${otp ?? null},
          otp_expiry = ${otpExpiry ?? null},
          is_email_verified = COALESCE(${isEmailVerified ?? null}, is_email_verified),
          "updatedAt" = CURRENT_TIMESTAMP
        WHERE email = ${email}
      `;
      return await findUserByEmail(email);
    } else {
      await sql`
        INSERT INTO "user" 
          (email, name, image, otp, otp_expiry, is_email_verified)
        VALUES 
          (${email}, ${name ?? null}, ${image ?? null}, ${otp ?? null}, ${otpExpiry ?? null}, ${isEmailVerified ?? false})
      `;
      return await findUserByEmail(email);
    }
  } catch (error) {
    console.error("Error creating or updating user:", error);
    throw error;
  }
}


// Update user verification
export async function updateUserVerification(email: string, isVerified: boolean = true): Promise<User | null> {
  try {
    await sql`
      UPDATE "user" SET 
        is_email_verified = ${isVerified},
        otp = NULL,
        otp_expiry = NULL,
        "updatedAt" = CURRENT_TIMESTAMP
      WHERE email = ${email}
    `;
    return await findUserByEmail(email);
  } catch (error) {
    console.error('Error updating user verification:', error);
    throw error;
  }
}

// Update user profile
export async function updateUserProfile({
  email,
  name,
  image,
}: {
  email: string;
  name?: string;
  image?: string;
}): Promise<void> {
  try {
    await sql`
      UPDATE "user" SET 
        name = COALESCE(${name ?? null}, name),
        image = COALESCE(${image ?? null}, image),
        "updatedAt" = CURRENT_TIMESTAMP
      WHERE email = ${email ?? null}
    `;
  } catch (err) {
    console.error("Failed to update user profile:", err);
  }
}
