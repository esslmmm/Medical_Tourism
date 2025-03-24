import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    role?: string; // Add role property
  }

  interface Session {
    user?: {
      id?: string;
      role?: string;
    } & DefaultSession["user"];
  }
}



import NextAuth from 'next-auth'
import { User, SessionStrategy } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { PrismaAdapter } from '@auth/prisma-adapter'
import GoogleProvider from "next-auth/providers/google";



const prisma = new PrismaClient()


export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'john@doe.com' },
        password: { label: 'Password', type: 'password' }, 
      },
      async authorize(credentials, req): Promise<User | null> {
        if (!credentials) return null;
      
        const user = await prisma.users.findUnique({
          where: { email: credentials.email },
        });
      
        // Ensure user exists and has a valid password before comparison
        if (!user || !user.password) {
          throw new Error('Invalid email or password');
        }
      
        const isValidPassword = await bcrypt.compare(credentials.password, user.password);
      
        if (isValidPassword) {
          return {
            id: user.user_id.toString(),
            name: user.name,
            email: user.email,
            role: user.role, 
          };
        } else {
          throw new Error('Invalid email or password');
        }
      }
      
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt' as SessionStrategy,
  },
  callbacks: {
    jwt: async ({ token, user }: { token: any; user?: User}) => {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    session: async ({ session, token }: { session: any; token: any }) => {
      if (session.user) {
        session.user.id = token.id
        session.user.role = token.role 
      }
      return session
    }
  },secret: process.env.NEXTAUTH_SECRET,
  debug: true,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }