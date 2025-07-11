import mysql from 'mysql2/promise';
import { User, CreateUserData } from '../types/user';

export async function getConnection() {
  try {
    const connection = await mysql.createConnection(process.env.DATABASE_URL!);
    return connection;
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
}

// Initialize database tables
export async function initDatabase(): Promise<void> {
  const connection = await getConnection();
  
  //         google_id VARCHAR(255),

  try {
    // Create users table if it doesn't exist
    await connection.execute(`
  CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    is_email_verified BOOLEAN DEFAULT FALSE,
    otp VARCHAR(10),
    otp_expiry DATETIME,
    name VARCHAR(255),
    image TEXT,
    role ENUM('admin', 'staff', 'customer') DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )
`);
    
    console.log('Database tables initialized');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error; // Re-throw to handle in calling function
  } finally {
    await connection.end();
  }
}

// User model functions
export async function findUserByEmail(email: string): Promise<User | null> {
  const connection = await getConnection();
  
  try {
    const [rows] = await connection.execute(
      'SELECT * FROM user WHERE email = ?',
      [email]
    );
    const result = rows as User[];
    return result[0] || null;
  } catch (error) {
    console.error('Error finding user by email:', error);
    throw error;
  } finally {
    await connection.end();
  }
}

// Helper function to find user with existing connection
async function findUserByEmailWithConnection(connection: mysql.Connection, email: string): Promise<User | null> {
  try {
    const [rows] = await connection.execute(
      'SELECT * FROM user WHERE email = ?',
      [email]
    );
    const result = rows as User[];
    return result[0] || null;
  } catch (error) {
    console.error('Error finding user by email with connection:', error);
    throw error;
  }
}

export async function createOrUpdateUser(userData: CreateUserData): Promise<User | null> {
  const connection = await getConnection();

  try {
    const { email, name, image, otp, otpExpiry, isEmailVerified } = userData;

    const existingUser = await findUserByEmailWithConnection(connection, email);

    if (existingUser) {
      await connection.execute(
        `UPDATE user SET 
          name = COALESCE(?, name),
          image = COALESCE(?, image),
          otp = ?,
          otp_expiry = ?,
          is_email_verified = COALESCE(?, is_email_verified),
          updatedAt = CURRENT_TIMESTAMP
          WHERE email = ?`,
        [name ?? null, image ?? null, otp ?? null, otpExpiry ?? null, isEmailVerified ?? null, email ?? null]
      );
      return await findUserByEmailWithConnection(connection, email);
    } else {
      await connection.execute(
        `INSERT INTO user (email, name, image, otp, otp_expiry, is_email_verified)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [email ?? null, name ?? null, image ?? null, otp ?? null, otpExpiry ?? null, isEmailVerified ?? false]
      );
      return await findUserByEmailWithConnection(connection, email);
    }
  } catch (error) {
    console.error("Error creating or updating user:", error);
    throw error;
  } finally {
    await connection.end();
  }
}


export async function updateUserVerification(email: string, isVerified: boolean = true): Promise<User | null> {
  const connection = await getConnection();
  
  try {
    await connection.execute(
      `UPDATE user SET 
       is_email_verified = ?, 
       otp = NULL, 
       otp_expiry = NULL,
       updatedAt = CURRENT_TIMESTAMP 
       WHERE email = ?`,
      [isVerified, email]
    );
    
    return await findUserByEmailWithConnection(connection, email);
  } catch (error) {
    console.error('Error updating user verification:', error);
    throw error;
  } finally {
    await connection.end();
  }
}

export async function updateUserProfile({
  email,
  name,
  image,
}: {
  email: string;
  name?: string;
  image?: string;
}): Promise<void> {
  const connection = await getConnection();
  try {
    await connection.execute(
      `UPDATE user SET 
        name = COALESCE(?, name),
        image = COALESCE(?, image),
        updatedAt = CURRENT_TIMESTAMP
       WHERE email = ?`,
      [name, image, email]
    );
  } catch (err) {
    console.error("Failed to update user profile:", err);
  } finally {
    await connection.end();
  }
}
